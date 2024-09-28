from flask import Blueprint, jsonify, request

# Create a blueprint for the API
api = Blueprint('api', __name__)

# In-memory storage for groups and roadmaps
groups = []

# Endpoint to get all groups
@api.route('/groups', methods=['GET'])
def get_groups():
    return jsonify(groups)

# Endpoint to create a new group
@api.route('/groups', methods=['POST'])
def create_group():
    data = request.json
    group_name = data.get('name')
    
    # Check if the group name is provided and does not already exist
    if group_name and not any(g['name'] == group_name for g in groups):
        new_group = {'name': group_name, 'roadmaps': []}
        groups.append(new_group)
        return jsonify(new_group), 201
    
    return jsonify({'error': 'Group name already exists or is invalid!'}), 400

# Endpoint to add a roadmap to a specific group
@api.route('/groups/<string:group_name>/roadmaps', methods=['POST'])
def add_roadmap(group_name):
    data = request.json
    roadmap = {
        'title': data.get('title'),
        'author_name': data.get('author_name'),
        'author_desc': data.get('author_desc'),
        'article_desc': data.get('article_desc'),
        'content': data.get('content')
    }

    # Find the group by name
    group = next((g for g in groups if g['name'] == group_name), None)
    
    if group:
        # Add the roadmap to the group's roadmaps
        group['roadmaps'].append(roadmap)
        return jsonify(roadmap), 201

    return jsonify({'error': 'Group not found!'}), 404
