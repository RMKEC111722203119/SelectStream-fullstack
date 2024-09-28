from flask import Flask, request, jsonify
from Data import predefined_roadmaps
from geminifunc import get_gemini_repsonse
app = Flask(__name__)


# Career assessment function
def career_assessment(aspirations, creativeActivities, education, enjoyNumbers, logicalProblems, passions, skills, workExperience):

     
    input_prompt = f"""
    Analyze the provided details based on current market trends and competitiveness. Offer detailed feedback and actionable suggestions for improvement. Additionally, answer any questions the user may have.

    The user is a beginner and is requesting personalized career guidance based on their inputs regarding aspirations, interests, skills, experience, and education.

    User Input:
    If no resume is provided, use the following details for career guidance:
    Career aspirations: {aspirations}
    Creative Activeness: {creativeActivities}
    Key skills: {skills}
    Work experience: {workExperience}
    Educational background: {education}
    Aptitude for logical problem-solving: {logicalProblems}
    Passion: {passions}
    Enjoy working with numbers?: {enjoyNumbers}

    Based on these inputs, suggest the most suitable professional stream, offer career guidance, and answer the following questions:
    - Are you more interested in solving logical problems?
    - Do you enjoy working with numbers?
    - Do you prefer creative activities?
    - What are your career aspirations?
    - What are your passions and interests?
    - List your skills (comma-separated):
    - Describe your work experience:
    - Educational background (degrees, certifications):
    - What could be the best possible professional stream they could opt for:
    """

    # Get the response from Gemini
    response = get_gemini_repsonse(input_prompt)

    # Suggest roadmaps
    selectstm = get_gemini_repsonse(f"""
    You have been given the following analysis based on the resume and the inputs provided: {response}.

    Can you suggest the best free roadmaps to help the user reach the peak in the chosen career path?

    Please select a roadmap from the available predefined roadmaps: {predefined_roadmaps}. Only choose roadmaps that are included in the predefined roadmaps list. You can choose multiple roadmaps. You cannot choose or provide any other roadmaps other than the predefined roadmaps.

    Provide the selected roadmaps in markup format, similar to the format provided in the predefined roadmaps. The expected output is only markup; no other things are expected.
    Provide no roadmap if you do not want to choose any roadmap. Strictly select from the predefined roadmaps only.
    Example output:
    ### title: Title of the roadmap
    **author_name**: Author Name
    **author_desc**: Author Description
    **article_desc**: Article Description
    """)

    return {
        "content" :response+"\n" +"\n"+"personalised Roadmaps"+"\n"+selectstm
    }


@app.route('/career-assessment', methods=['POST'])
def career_assessment_route():
    # Get the JSON data from the POST request
    data = request.json
    
    # Extract input parameters
    aspirations = data.get('aspirations', '')
    creativeActivities = data.get('creativeActivities', '')
    education = data.get('education', '')
    enjoyNumbers = data.get('enjoyNumbers', '')
    logicalProblems = data.get('logicalProblems', '')
    passions = data.get('passions', '')
    skills = data.get('skills', '')
    workExperience = data.get('workExperience', '')
    
    # Call the career_assessment function with the provided inputs
    result = career_assessment(
        aspirations, 
        creativeActivities, 
        education, 
        enjoyNumbers, 
        logicalProblems, 
        passions, 
        skills, 
        workExperience
    )
    
    # Return the result as JSON
    return jsonify(result)

# Main block to run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
