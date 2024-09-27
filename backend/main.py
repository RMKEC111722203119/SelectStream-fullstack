from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS to handle CORS issues
from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import HuggingFaceHub
from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.tools import Tool
from Data.py import predefined_roadmaps
# Initialize Flask app
app = Flask(__name__)

# Enable CORS and handle preflight (OPTIONS) requests
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

API_KEY = "AIzaSyASpU0qAf8xcDgZ6Wqdw-Ts8WJftF0cDFU"
GROQ_API_KEY = "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"
HUGGINGFACEHUB_API_TOKEN = "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"

# YouTube search function
def ytsearch(search_query):
    youtube = build('youtube', 'v3', developerKey=API_KEY)
    try:
        search_response = youtube.search().list(
            q=search_query,
            part='id,snippet',
            maxResults=2,
            type='video'
        ).execute()

        video_details = [{
            'videoId': item['id']['videoId'],
            'title': item['snippet']['title'],
            'channelTitle': item['snippet']['channelTitle']
        } for item in search_response['items']]

        transcriptions = []
        for video in video_details:
            try:
                transcript = YouTubeTranscriptApi.get_transcript(video['videoId'])
                transcriptions.append({
                    'title': video['title'],
                    'channelTitle': video['channelTitle'],
                    'transcript': transcript
                })
            except Exception as e:
                transcriptions.append({
                    'title': video['title'],
                    'channelTitle': video['channelTitle'],
                    'transcript': None
                })

        video1_transcript = ""
        video2_transcript = ""

        if transcriptions[0]['transcript'] is not None:
            video1_transcript = " ".join([line['text'] for line in transcriptions[0]['transcript']])

        if len(transcriptions) > 1 and transcriptions[1]['transcript'] is not None:
            video2_transcript = " ".join([line['text'] for line in transcriptions[1]['transcript']])

        return video1_transcript, video2_transcript, video_details

    except HttpError as e:
        print(f"An HTTP error occurred: {e}")
        return None, None, []

# Process transcript and query
def process_transcript_and_query(transcript, query):
    model_name = "BAAI/bge-base-en-v1.5"
    docs = [{'page_content': transcript}]
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=256, chunk_overlap=20)
    chunks = text_splitter.split_documents(docs)

    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key=HUGGINGFACEHUB_API_TOKEN, model_name=model_name
    )

    vectorstore = Chroma.from_documents(chunks, embeddings)
    retriever = vectorstore.as_retriever(search_type="mmr", search_kwargs={'k': 2})

    llm = HuggingFaceHub(
        repo_id="huggingfaceh4/zephyr-7b-alpha",
        model_kwargs={"temperature": 0.5, "max_length": 64, "max_new_tokens": 512},
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN
    )

    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="refine", retriever=retriever)
    response = qa.run(query)
    return response

# Helper function to process YouTube query
def process(search_query):
    video_transcript1, video_transcript2, video_details = ytsearch(search_query)

    if not video_details:
        return None

    query = f"provide 10 questions on {search_query}"

    process_tool1 = Tool(
        name='Process Video 1 Transcript',
        func=lambda q: process_transcript_and_query(video_transcript1, q),
        description="Useful for processing transcript and answering queries."
    )

    process_tool2 = Tool(
        name='Process Video 2 Transcript',
        func=lambda q: process_transcript_and_query(video_transcript2, q),
        description="Useful for processing transcript and answering queries."
    )

    tools = [process_tool1, process_tool2]

    llm = ChatGroq(model="llama3-8b-8192", groq_api_key=GROQ_API_KEY)
    chat = ChatGroq(model="mixtral-8x7b-32768", groq_api_key=GROQ_API_KEY)

    chain = ChatPromptTemplate.from_messages([("system", "You are a helpful assistant."), ("human", "{text}")]) | chat
    questions = chain.invoke({"text": query}).content

    llm_with_tools = llm.bind_tools(tools)
    answers = llm_with_tools.invoke(f"Use the provided tools to answer 10 questions about {search_query}. {questions}").content

    final_query = f"give one-word answer which is better: query1 or query2 {answers}"
    final_answer = chat.invoke(final_query).content.strip()

    result = video_details[0] if final_answer == "query1" else video_details[1]
    video_url = f"https://www.youtube.com/watch?v={result['videoId']}"
    return video_url 

# Flask API Endpoint
@app.route('/quick', methods=['POST'])
def quick():
    data = request.json
    querys = data.get('query')
    if not querys:
        return jsonify({"error": "Missing transcript or query"}), 400

    response = process(querys)
    return jsonify({"response": response})


@app.route('/get_data', methods=['GET'])
def get_data():
    return jsonify(predefined_roadmaps)

# Endpoint to add/update details in the dictionary
@app.route('/add_data', methods=['POST'])
def add_data():
    new_data = request.get_json()  # Get the JSON payload from the frontend
    # Update the dictionary dynamically
    data.update(new_data)
    return jsonify({"message": "Data added successfully!", "updated_data": data}), 200

if __name__ == '__main__':
    app.run(debug=True)
