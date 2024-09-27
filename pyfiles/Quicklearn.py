# Quicklearn.py
from flask import Flask, jsonify, request

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from youtube_transcript_api import YouTubeTranscriptApi
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import HuggingFaceHub

from langchain.chains import RetrievalQA
from langchain.prompts import ChatPromptTemplate
from langchain.tools import Tool
from langchain_groq import ChatGroq


app = Flask(__name__)

# Helper function to search YouTube and retrieve transcripts
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
                print(f"An error occurred while retrieving the transcript for video {video['videoId']}: {e}")
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

# Helper function to process transcripts and queries
def process_transcript_and_query(transcript, query):
    model_name = "BAAI/bge-base-en-v1.5"

    docs = [{'page_content': transcript}]
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=256, chunk_overlap=20)
    chunks = text_splitter.split_documents(docs)

    embeddings = HuggingFaceInferenceAPIEmbeddings(
        api_key=HUGGINGFACEHUB_API_TOKEN, model_name=model_name
    )

    vectorstore = Chroma.from_documents(chunks, embeddings)
    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={'k': 2}
    )

    llm = HuggingFaceHub(
        repo_id="huggingfaceh4/zephyr-7b-alpha",
        model_kwargs={"temperature": 0.5, "max_length": 64, "max_new_tokens": 512},
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN
    )

    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="refine", retriever=retriever)
    response = qa.run(query)
    return response

### Flask API Endpoints ###

# Endpoint to process search query and return the best video based on the content
@app.route('/quicklearn', methods=['POST'])
def process_search_query():
    data = request.json
    search_query = data.get("search_query")

    if not search_query:
        return jsonify({"error": "Please provide a search query"}), 400

    # Search YouTube and get video transcripts
    video_transcript1, video_transcript2, video_details = ytsearch(search_query)

    if not video_details:
        return jsonify({"error": "No videos found for the given query"}), 404

    query = f"provide 10 questions on {search_query}"

    # Create tools to process transcripts
    process_tool1 = Tool(
        name='Process Video 1 Transcript',
        func=lambda q: process_transcript_and_query(video_transcript1, q),
        description="Processes the first video's transcript."
    )

    process_tool2 = Tool(
        name='Process Video 2 Transcript',
        func=lambda q: process_transcript_and_query(video_transcript2, q),
        description="Processes the second video's transcript."
    )

    tools = [process_tool1, process_tool2]

    # Using Groq to determine the best response
    llm = ChatGroq(model="llama3-8b-8192", groq_api_key=GROQ_API_KEY)
    chat = ChatGroq(model="mixtral-8x7b-32768", groq_api_key=GROQ_API_KEY)

    system_message = "You are a helpful assistant."
    human_message = "{text}"
    prompt = ChatPromptTemplate.from_messages([("system", system_message), ("human", human_message)])

    # Generate 10 questions based on the search query
    chain = prompt | chat
    questions = chain.invoke({"text": query}).content

    tool_query = f"""
    Use the provided tools to answer the following ten questions about {search_query}. For each question, identify and specify the best tool to use. Provide the response in this format:

    The best tool for [Question] is [Tool Name].
    
    {questions}
    """

    llm_with_tools = llm.bind_tools(tools)
    answers = llm_with_tools.invoke(tool_query).content

    # Final query to decide which video is better
    final_query = f"give one word answer which is better: query1 or query2. {answers}"
    final_answer = chat.invoke(final_query).content.strip()

    # Return the better video
    if final_answer == "query1":
        result = video_details[0]
    else:
        result = video_details[1]

    # Return the URL of the best video
    video_url = f"https://www.youtube.com/watch?v={result['videoId']}"
    return jsonify({"best_video_url": video_url}), 200

if __name__ == '__main__':
    app.run(debug=True)
