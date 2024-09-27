import streamlit as st

# Initialize session state
if 'groups' not in st.session_state:
    st.session_state['groups'] = []  # List to store groups with their roadmaps

if 'group_likes' not in st.session_state:
    st.session_state['group_likes'] = []  # List to store likes for groups

if 'roadmap_likes' not in st.session_state:
    st.session_state['roadmap_likes'] = []  # List to store likes for roadmaps

if 'group_comments' not in st.session_state:
    st.session_state['group_comments'] = []  # List to store comments for groups

if 'roadmap_comments' not in st.session_state:
    st.session_state['roadmap_comments'] = []  # List to store comments for roadmaps

# Function to create a new group
def create_group():
    st.subheader("Create a New Group")

    group_name = st.text_input("Group Name")
    
    if st.button("Create Group"):
        if group_name and group_name not in [g['name'] for g in st.session_state['groups']]:
            st.session_state['groups'].append({
                'name': group_name,
                'roadmaps': []  # List to store roadmaps in the group
            })
            st.session_state['group_likes'].append(0)  # Initialize likes for the new group
            st.session_state['group_comments'].append([])  # Initialize comments for the new group
            st.success(f"Group '{group_name}' created!")
        elif group_name in [g['name'] for g in st.session_state['groups']]:
            st.error("Group name already exists!")
        else:
            st.error("Please enter a group name.")

# Function to display groups as cards
def display_groups():
    st.title("Groups")
    
    if st.session_state['groups']:
        for idx, group in enumerate(st.session_state['groups']):
            with st.container():  # Create a container for each group
                st.markdown(f"### {group['name']}")
                st.markdown(f"Group '{group['name']}' - Click to view roadmaps.")
                
                # Like button
                if st.button(f"👍 Like ({st.session_state['group_likes'][idx]})", key=f"like_group_{idx}"):
                    st.session_state['group_likes'][idx] += 1

                # Comment section
                with st.expander(f"💬 Comments ({len(st.session_state['group_comments'][idx])})"):
                    for comment in st.session_state['group_comments'][idx]:
                        st.markdown(f"- {comment}")
                    new_comment = st.text_input(f"Add a comment for {group['name']}", key=f"comment_input_group_{idx}")
                    if st.button(f"Submit Comment for {group['name']}", key=f"submit_comment_group_{idx}"):
                        if new_comment:
                            st.session_state['group_comments'][idx].append(new_comment)
                            st.success(f"Comment added to {group['name']}!")
                
                if st.button(f"View Roadmaps in {group['name']}", key=f"view_{group['name']}"):
                    st.session_state['current_group'] = group
                    st.session_state['current_group_idx'] = idx
                    st.session_state['page'] = 'GroupDetail'
    else:
        st.warning("No groups available. Please create a new group.")

# Function to add a new roadmap to a group
def add_roadmap_to_group(group):
    st.subheader(f"Add Roadmap to {group['name']}")

    title = st.text_input("Roadmap Title")
    author_name = st.text_input("Author Name")
    author_desc = st.text_area("Author Description")
    article_desc = st.text_area("Roadmap Description")
    content = st.text_area("Complete Roadmap Content (Markdown Supported)")

    if st.button("Submit Roadmap"):
        if title and author_name and author_desc and article_desc and content:
            roadmap = {
                'title': title,
                'author_name': author_name,
                'author_desc': author_desc,
                'article_desc': article_desc,
                'content': content
            }
            group['roadmaps'].append(roadmap)
            st.session_state['roadmap_likes'].append(0)  # Initialize likes for the new roadmap
            st.session_state['roadmap_comments'].append([])  # Initialize comments for the new roadmap
            st.success(f"Roadmap '{title}' added to {group['name']}!")
        else:
            st.error("Please fill in all the fields.")

# Function to display roadmaps in a group
def display_group_details(group):
    st.title(f"Roadmaps in {group['name']}")

    if group['roadmaps']:
        for idx, roadmap in enumerate(group['roadmaps']):  # Enumerate roadmaps in the group
            with st.container():
                st.markdown(f"### {roadmap['title']}")
                st.markdown(f"**Author**: {roadmap['author_name']}")
                st.markdown(f"**About the Author**: {roadmap['author_desc']}")
                st.markdown(f"**Description**: {roadmap['article_desc']}")
                
                # Like button for roadmap
                roadmap_idx = st.session_state['current_group_idx'] * 1000 + idx
                if st.button(f"👍 Like ({st.session_state['roadmap_likes'][roadmap_idx]})", key=f"like_roadmap_{roadmap_idx}"):
                    st.session_state['roadmap_likes'][roadmap_idx] += 1

                # Comment section for roadmap
                with st.expander(f"💬 Comments ({len(st.session_state['roadmap_comments'][roadmap_idx])})"):
                    for comment in st.session_state['roadmap_comments'][roadmap_idx]:
                        st.markdown(f"- {comment}")
                    new_comment = st.text_input(f"Add a comment for {roadmap['title']}", key=f"comment_input_roadmap_{roadmap_idx}")
                    if st.button(f"Submit Comment for {roadmap['title']}", key=f"submit_comment_roadmap_{roadmap_idx}"):
                        if new_comment:
                            st.session_state['roadmap_comments'][roadmap_idx].append(new_comment)
                            st.success(f"Comment added to {roadmap['title']}!")

                if st.button(f"Read Roadmap '{roadmap['title']}'", key=f"read_{idx}"):
                    st.session_state['current_roadmap'] = roadmap
                    st.session_state['current_roadmap_idx'] = roadmap_idx
                    st.session_state['page'] = 'RoadmapDetail'
    else:
        st.warning("No roadmaps available in this group.")
    
    if st.button("Back to Groups"):
        st.session_state['page'] = 'Groups'

# Function to display the full roadmap (rendering Markdown content)
def display_full_roadmap(roadmap):
    st.markdown(f"## {roadmap['title']}")
    st.markdown(roadmap['content'], unsafe_allow_html=True)  # Allow Markdown & HTML rendering

    # Button to return to Group Details
    if st.button("Back to Group Details"):
        st.session_state['page'] = 'GroupDetail'

# Main page logic
if 'page' not in st.session_state:
    st.session_state['page'] = 'Groups'
    st.session_state['current_group'] = None
    st.session_state['current_roadmap'] = None

if st.session_state['page'] == 'Groups':
    
    create_group()
    display_groups()

elif st.session_state['page'] == 'GroupDetail':
    if st.session_state['current_group']:
        add_roadmap_to_group(st.session_state['current_group'])
        display_group_details(st.session_state['current_group'])

elif st.session_state['page'] == 'RoadmapDetail':
    if st.session_state['current_roadmap']:
        display_full_roadmap(st.session_state['current_roadmap'])
