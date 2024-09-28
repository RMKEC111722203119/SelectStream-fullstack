import streamlit as st
import requests
import nest_asyncio
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from langchain_groq import ChatGroq
from streamlit_lottie import st_lottie
from pyfiles.Quicklearn import process
from pyfiles.geminifunc import get_gemini_repsonse, input_pdf_text
from feed import display_popular_feed_item, display_uploaded_roadmap
from grp import create_group, display_groups, add_roadmap_to_group, display_group_details, display_full_roadmap

from homefeeds import run_feed, init_state, predefined_roadmaps

# APIs and tokens (use environment variables for security)
API_KEY = "AIzaSyASpU0qAf8xcDgZ6Wqdw-Ts8WJftF0cDFU"
GROQ_API_KEY = "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"
HUGGINGFACEHUB_API_TOKEN = "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"

nest_asyncio.apply()

st.set_page_config(page_title="AI Career Guidance", page_icon="🚀", layout="wide")

# Lottie Animation Function
def load_lottieurl(url: str):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()

# Placeholder for predictive analytics (mock)
def predict_future_career(user_data):
    return ["Data Scientist", "Software Engineer", "AI Researcher"]

# Function to open the PDF link directly with HTML button style
def show_roadmap_boxes():
    st.subheader("Explore Roadmaps for Various Streams")
    col1, col2, col3, col4 = st.columns(4)
    
    # Define the PDF URL paths for different career streams
    roadmap_links = {
        "Data Scientist": "https://drive.google.com/uc?export=download&id=1iVWgnCcKHbQiqXDWfWoahHFbNoi5r-Ib",
        "Software Engineer": "https://drive.google.com/file/d/1x6m7ppS1R-ROhWGHxhrCHMozTDxtIb_m/view?usp=sharing",
        "ML Engineer": "https://drive.google.com/file/d/1tcyytifff8MwJQu0HDpdo5xRRTF18Yfg/view?usp=sharing",
        "Product Manager": "https://drive.google.com/file/d/1YCCyaqVrG-0c_VeHYIehYEKyAF--u48n/view?usp=sharing"
    }
    
    button_style = """
    <style>
        .button {
            display: inline-block;
            padding: 0.5em 1.5em;
            font-size: 1em;
            color: white;
            background-color: #14171f;
            border: none;
            border-radius: 5px;
            text-align: center;
            text-decoration: none;
            text-color: white;
        }
        .button:hover {
            background-color: #c2302e;
        }
    </style>
    """
    
    # Display buttons for different roadmaps
    with col1:
        st.markdown(button_style, unsafe_allow_html=True)
        st.markdown(f'<a class="button" href="{roadmap_links["Data Scientist"]}" target="_blank">Data Scientist</a>', unsafe_allow_html=True)
        
    with col2:
        st.markdown(f'<a class="button" href="{roadmap_links["Software Engineer"]}" target="_blank">Software Engineer</a>', unsafe_allow_html=True)
        
    with col3:
        st.markdown(f'<a class="button" href="{roadmap_links["ML Engineer"]}" target="_blank">ML Engineer</a>', unsafe_allow_html=True)
        
    with col4:
        st.markdown(f'<a class="button" href="{roadmap_links["Product Manager"]}" target="_blank">Product Manager</a>', unsafe_allow_html=True)



def display_feed_item(title, author_name, author_desc, article_desc, article_id):
    st.markdown(f"### {title}")
    st.markdown(f"**Author**: {author_name}")
    st.markdown(f"**About the Author**: {author_desc}")
    st.markdown(f"**Description**: {article_desc}")
    
# Define aptitude assessment (mock test)
def aptitude_assessment():
    st.subheader("Aptitude Assessment")
    st.write("Complete this simple cognitive test to evaluate your strengths:")
    
    q1 = st.radio("Are you more interested in solving logical problems?", ("Yes", "No"))
    q2 = st.radio("Do you enjoy working with numbers?", ("Yes", "No"))
    q3 = st.radio("Do you prefer creative activities?", ("Yes", "No"))
    
    
    return f"""
Are you more interested in solving logical problems?:{q1}
Do you enjoy working with numbers?:{q2}
Do you prefer creative activities?:{q3}
"""

# Collect user aspirations and interests
import streamlit as st

def capture_aspirations():
    st.subheader("Aspirations and Interests")
    aspiration = st.text_input("What are your career aspirations?")
    interests = st.text_area("What are your passions and interests?")
    
    if st.button("Submit Aspirations and Interests"):
        return (
            f"What are your career aspirations? {aspiration}",
            f"What are your passions and interests? {interests}"
        )
    
    return "", ""

# Collect user's abilities and experience
def collect_experience():
    st.subheader("Your Abilities and Experience")
    skills = st.text_area("List your skills (comma-separated)")
    experience = st.text_area("Describe your work experience")
    education = st.text_area("Educational background (degrees, certifications)")
    
    if st.button("Submit Skills and Experience"):
        return (
            f"Skills: {skills}",
            f"Experience: {experience}",
            f"Education: {education}"
        )
    
    return "", "", ""

def iq_assessment():
    st.title("IQ Assessment")
    st.subheader("Test Your Cognitive Abilities")
    
    st.write("Answer the following questions to assess your IQ:")
    
    # Sample IQ questions
    q1 = st.radio("What comes next in the series: 2, 4, 8, 16?", ("32", "64", "128", "256"))
    q2 = st.radio("Which number is the odd one out: 3, 5, 11, 14, 17, 23?", ("5", "11", "14", "17"))
    q3 = st.radio("Solve: 15 - 6 ÷ 3 + 2 * 2 = ?", ("7", "12", "13", "15"))
    
    if st.button("Submit IQ Test"):
        score = 0
        if q1 == "32":
            score += 1
        if q2 == "14":
            score += 1
        if q3 == "13":
            score += 1
        
        st.write(f"Your IQ score is: {score}/3")

# Sidebar

# Removed language selection
# language = st.sidebar.selectbox("Choose your language", list(languages.keys()))

# Navigation
page = st.sidebar.selectbox("Navigate", [
    "Home",
    "Quick Learn",
    "Career Assessment",
    "Group",
    "Know Your IQ",
    "Future Progression",
    
    "Expert Videos",
    
    "About"
])

# Feedback section in sidebar
st.sidebar.subheader("Leave Your Feedback 💬")
comment = st.sidebar.text_area("Your Comment:")


if st.sidebar.button("Submit Comment"):
        st.success("Thank you for your feedback!")
        st.sidebar.write(comment)

# Load Lottie animations
def load_lottieurl(url: str):
    r = requests.get(url)
    if r.status_code != 200:
        return None
    return r.json()

# Home Page
if page == "Home":
    st.title("Select-Stream 🎓")
   
    init_state()
    run_feed()
   
    
# Career Assessment Page
elif page == "Career Assessment":
    st.title("Career Assessment")
    st.write("Let's assess your aptitude, interests, abilities, and experiences to recommend the best career paths.")
    uploaded_file = None
    uploaded_file = st.file_uploader("Upload Your Resume", type="pdf", help="Please upload the PDF")
    if uploaded_file is None:
        aptitude = aptitude_assessment()
        st.subheader("Aspirations and Interests")
        aspirations = st.text_input("What are your career aspirations?")
        interests = st.text_area("What are your passions and interests?")
        st.subheader("Your Abilities and Experience")
        skills = st.text_area("List your skills (comma-separated)")
        experience = st.text_area("Describe your work experience")
        education = st.text_area("Educational background (degrees, certifications)")
    if st.button("Get Career Recommendations"):
        if uploaded_file is not None:
            text = input_pdf_text(uploaded_file)
            aptitude ="" 
            aspirations, interests = "", ""
            skills, experience, education ="", "", ""
        else:
            text = "I have not uploaded a resume or my work doesnt require a resume"
        input_prompt = f"""
Analyze the provided resume based on current market trends and competitiveness. Offer detailed feedback and actionable suggestions for improvement. Additionally, answer any questions the user may have.

If a resume is not provided, assume the user is a beginner and offer personalized career guidance based on their inputs regarding aspirations, interests, skills, experience, and education.

User Input:

Resume (if available): {text}
If no resume is provided, use the following details for career guidance:
Career aspirations: {aspirations}
Passions and interests: {interests}
Key skills: {skills}
Work experience: {experience}
Educational background: {education}
Aptitude for logical problem-solving: {aptitude}
Based on these inputs, suggest the most suitable professional stream, offer career guidance, and answer following questions

Are you more interested in solving logical problems?

Do you enjoy working with numbers?

Do you prefer creative activities?

What are your career aspirations?

What are your passions and interests?

List your skills (comma-separated):

Describe your work experience:

Educational background (degrees, certifications):

What could be the best possible professional stream he/she could opt for :
"""
        response = get_gemini_repsonse(input_prompt)
        st.subheader(response)
        st.markdown("")
        # st.write("best free roadmaps to reach the peak")
        # cols = st.columns(2)
        # with cols[0]:
        #     display_popular_feed_item(images['author_pic1'], "Author Name 1", "500 ", images['post_pic1'])
        # with cols[0]:
        #     display_popular_feed_item(images['author_pic2'], "Author Name 2", "300 ", images['post_pic2'])
        selectstm = get_gemini_repsonse(f"""
   You have been given the following analysis based on the resume and the inputs provided: {response}.

Can you suggest the best free roadmaps to help reach the peak in the chosen career path?

Please select a roadmap from the available predefined roadmaps: {predefined_roadmaps}. Only choose roadmaps that are included in the predefined roadmaps list. You can choose multiple roadmaps.You can  not chose or provide any other roadmaps other than the predefined roadmaps.

Provide the selected roadmaps in markup format, similar to the format provided in the predefined roadmaps. The expected output is only markup; no other things are expected.
provide no roadmap if you do not want to choose any roadmap.Strictly select from the predefined roadmaps only.
Example output:
### title: Title of the roadmap

**author_name**: Author Name

**author_desc**: Author Description

**article_desc**: Article Description
""")
        st.header("Personalized Roadmaps by Select-Stream AI")
        st.markdown("""
<style>
.custom-line {
    border-top: 2px solid #4CAF50; /* Green color */
    margin: 20px 0; /* Space above and below */
}
</style>
""", unsafe_allow_html=True)
        st.markdown('<div class="custom-line"></div>', unsafe_allow_html=True)
        st.markdown(selectstm)

        show_roadmap_boxes()

elif page == "Group":
    st.title("Roadmaps Group")
    
    # Initialize page state if not present
    if 'page' not in st.session_state:
        st.session_state['page'] = 'Groups'

    # Main page logic
    if st.session_state['page'] == 'Groups':
        create_group()  # Section to create a new group
        display_groups()  # Display groups in a card-like format

    elif st.session_state['page'] == 'GroupDetail':
        group = st.session_state.get('current_group', {})
        if group:
            add_roadmap_to_group(group)  # Form to add a new roadmap to the group
            display_group_details(group)  # Display roadmaps in the selected group
        else:
            st.warning("No group selected. Please go back to Groups.")

    elif st.session_state['page'] == 'RoadmapDetail':
        roadmap = st.session_state.get('current_roadmap', {})
        if roadmap:
            display_full_roadmap(roadmap)  # Display the full roadmap content
        else:
            st.warning("No roadmap selected. Please go back to Group Details.")

    

# Future Progression Page
elif page == "Future Progression":
    st.title("Future Progression")
    st.write("Here are some possible career paths and future progressions based on your assessment.")
    st.write("The app will recommend career paths based on the aptitude and experience data provided.")
    skills = st.text_area("List the key skills you're interested in learning or improving")
    if st.button("Predict Future Career Opportunities"):
        # Mock predictive analytics function
        future_careers = predict_future_career({"skills": skills})
        llm = ChatGroq(model="llama3-8b-8192", groq_api_key=GROQ_API_KEY)
        response = llm.invoke(f"You are the expert in knowing the future trends and skill gaps in the industry. Can you tell me what are the future career opportunities based on the {skills} I'm interested in learning or improving?")
        st.write(response.content)
# Quick Learn Page
elif page == "Quick Learn":
    st.title("Quick Learn")
    st.write("Explore quick learning modules and resources to enhance your skills.")
    st.write("Links to courses and tutorials will be provided.")
    query = st.text_input("What Do You Want to Learn Today? 🤔")
    
    if st.button(("Find Best Video")):
        if query:
            st.write(("Processing your query..."))
            process(query)
            st.write(("Best video details will be displayed here."))
        else:
            st.error(("Please enter a search query."))
# Expert Videos Page
elif page == "Expert Videos":
    
    st.write(
        """
        ### Curated Expert Videos

        This section features expert-curated videos designed to enhance your learning experience. Stay tuned as we add more valuable content here!

        """
    )

    st.subheader("Featured Videos")

    col1, col2 = st.columns([2, 1])
    with col1:
        st.write("#### Video 1: Placeholder for Future Videos")
        st.video("https://youtu.be/G5GB6zhKm7s?si=fkPc4eDaudNyU--M")
    with col2:
        st.markdown("""
        **Open-Source Links:**
        - coming soon...
        - coming soon...
        - coming soon...
        """)

    col3, col4 = st.columns([2, 1])
    with col3:
        st.write("#### Video 2: Placeholder for Future Videos")
        st.video("https://youtu.be/G5GB6zhKm7s?si=fkPc4eDaudNyU--M")
    with col4:
        st.markdown("""
        **Open-Source Links:**
         - coming soon...
         - coming soon...
         - coming soon...
        """)

    col5, col6 = st.columns([2, 1])
    with col5:
        st.write("#### Video 3: Placeholder for Future Videos")
        st.video("https://youtu.be/G5GB6zhKm7s?si=fkPc4eDaudNyU--M")
    with col6:
        st.markdown("""
          **Open-Source Links:**
         - coming soon...
         - coming soon...
         - coming soon...
        """)  # Display videos using the function

# Know Your IQ Page
elif page == "Know Your IQ":
    iq_assessment()

# About Page
elif page == "About":
    st.title("About")
    st.write("Learn more about the AI Career Guidance System and its features.")
    st.write("This application is designed to help individuals find their ideal career paths using AI technologies.")

