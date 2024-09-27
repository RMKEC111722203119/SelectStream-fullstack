# -- coding: utf-8 --
"""
Created on Fri Apr 19 21:26:02 2024

@author: User
"""

import streamlit as st
import google.generativeai as genai
import os
import PyPDF2 as pdf
from dotenv import load_dotenv
import json

#load_dotenv("D:\LLM\ATS\.env.txt") ## load all our environment variables

genai.configure(api_key="AIzaSyCKMxKgj_qyloFUjpb1GKGPmjNrzhFe21Q")

def get_gemini_repsonse(input):
    model=genai.GenerativeModel('gemini-1.5-flash')
    response=model.generate_content(input)
    return response.text

def input_pdf_text(uploaded_file):
    reader=pdf.PdfReader(uploaded_file)
    text=""
    for page in range(len(reader.pages)):
        page=reader.pages[page]
        text+=str(page.extract_text())
    return text

#Prompt Template

input_prompt="""
analyse the resume based on the market competitiveness.Please provide the best assistance for improving the resume and answer questions

Resume: {text}

Are you more interested in solving logical problems?

Do you enjoy working with numbers?

Do you prefer creative activities?

What are your career aspirations?

What are your passions and interests?

List your skills (comma-separated):

Describe your work experience:

Educational background (degrees, certifications):
"""

## streamlit app
st.title("Smart ATS")
st.text("Improve Your Resume ATS")
jd=st.text_area("Paste the Job Description")
uploaded_file=st.file_uploader("Upload Your Resume",type="pdf",help="Please uplaod the pdf")

submit = st.button("Submit")

if submit:
    if uploaded_file is not None:
        text=input_pdf_text(uploaded_file)
        response=get_gemini_repsonse(input_prompt)
        st.subheader(response)