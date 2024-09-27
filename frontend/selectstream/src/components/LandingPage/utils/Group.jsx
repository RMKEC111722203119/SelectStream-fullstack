// Groups.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Card, Typography } from "@mui/material";
import "./Group.css"; // Create a CSS file for styling

const Groups = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [roadmap, setRoadmap] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
  });
  const [showRoadmapForm, setShowRoadmapForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleCreateGroup = () => {
    if (groupName) {
      setGroups([...groups, { name: groupName, roadmaps: [] }]);
      setGroupName("");
    }
  };

  const handleCreateRoadmap = () => {
    if (selectedGroup) {
      const updatedGroups = groups.map((group) => {
        if (group.name === selectedGroup) {
          return {
            ...group,
            roadmaps: [...group.roadmaps, roadmap],
          };
        }
        return group;
      });
      setGroups(updatedGroups);
      setShowRoadmapForm(false);
      setRoadmap({ title: "", author: "", description: "", content: "" });
    }
  };

  return (
    <Container>
      <Typography variant="h5" className="text-white mt-3">
        Create Group
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Enter Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="group-input"
      />
      <Button
        variant="contained"
        onClick={handleCreateGroup}
        className="create-group-button"
      >
        Create Group
      </Button>

      <Typography variant="h6" className="text-white mt-4">
        Existing Groups
      </Typography>
      {groups.map((group) => (
        <Card key={group.name} className="group-card" onClick={() => {
          setSelectedGroup(group.name);
          setShowRoadmapForm(true);
        }}>
          <Typography variant="body1" className="group-name">
            {group.name}
          </Typography>
        </Card>
      ))}

      {showRoadmapForm && (
        <div className="roadmap-form">
          <Typography variant="h6" className="text-white mt-4">
            Create Roadmap for {selectedGroup}
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Title"
            value={roadmap.title}
            onChange={(e) => setRoadmap({ ...roadmap, title: e.target.value })}
            className="roadmap-input"
          />
          <TextField
            variant="outlined"
            placeholder="Author"
            value={roadmap.author}
            onChange={(e) => setRoadmap({ ...roadmap, author: e.target.value })}
            className="roadmap-input"
          />
          <TextField
            variant="outlined"
            placeholder="Description"
            value={roadmap.description}
            onChange={(e) => setRoadmap({ ...roadmap, description: e.target.value })}
            className="roadmap-input"
          />
          <TextField
            variant="outlined"
            placeholder="Content"
            value={roadmap.content}
            onChange={(e) => setRoadmap({ ...roadmap, content: e.target.value })}
            className="roadmap-input"
          />
          <Button
            variant="contained"
            onClick={handleCreateRoadmap}
            className="submit-roadmap-button"
          >
            Submit Roadmap
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Groups;
