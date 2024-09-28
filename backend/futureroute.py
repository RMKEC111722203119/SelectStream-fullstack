
def futureroute(skills: str) -> str:
    llm = ChatGroq(model="llama3-8b-8192", groq_api_key=GROQ_API_KEY)
    return llm.invoke(f"You are the expert in knowing the future trends and skill gaps in the industry. Can you tell me what are the future career opportunities based on the {skills} I'm interested in learning or improving?")

@app.route('/scope', methods=['POST'])
def scope():
    data = request.json
    skills = data.get('skills', '')
    result = futureroute(skills)
    return jsonify(result)