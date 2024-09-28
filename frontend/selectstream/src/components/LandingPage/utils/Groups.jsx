// Groups.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Card, Typography } from "@mui/material";
import "./Group.css"; // Ensure styles are defined in this file

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
    if (groupName.trim()) {
      setGroups([...groups, { name: groupName, roadmaps: [] }]);
      setGroupName("");
    }
  };

  const handleCreateRoadmap = () => {
    if (selectedGroup && roadmap.title.trim()) {
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

  const handleSelectGroup = (group) => {
    setSelectedGroup(group.name);
    setShowRoadmapForm(true);
  };

  return (
    <Container>
      <Typography variant="h5" className="text-white mt-2 mb-2">
        Create Group  
      </Typography>
      <TextField
  variant="outlined"
  placeholder="Enter Group Name"
  value={groupName}
  onChange={(e) => setGroupName(e.target.value)}
  className="group-input"
  InputProps={{
    style: { color: 'white', borderRadius: '8px' }, // Change text color to white and add rounded corners
  }}
  InputLabelProps={{
    style: { color: 'white' }, // Change label color to white if using a label
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px', // Set rounded corners
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Modern look with subtle transparency
      '&:hover fieldset': {
        borderColor: '#80deea', // Border color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4fc3f7', // Border color when focused
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white', // Text color inside input
    },
    '& .MuiInputLabel-root': {
      color: '#b0bec5', // Placeholder color
    },
  }}
/>

      <Button
        variant="contained"
        onClick={handleCreateGroup}
        className="create-group-button mt-2"
      >
        Create Group
      </Button>

      <Typography variant="h6" className="text-white mt-4">
        Existing Groups
      </Typography>
      {groups.length > 0 ? (
        groups.map((group) => (
          <Card key={group.name} className="group-card" onClick={() => handleSelectGroup(group)}>
            <Typography variant="body1" className="group-name">
              {group.name}
            </Typography>
          </Card>
        ))
      ) : (
        <Typography variant="body1" className="text-white">
          No groups created yet.
        </Typography>
      )}


{showRoadmapForm && selectedGroup && (
  <div className="roadmap-form">
    <Typography variant="h6" className="text-white mt-4">
      Create Roadmap for {selectedGroup}
    </Typography>
    
    <TextField
  variant="outlined"
  placeholder="Title"
  value={roadmap.title}
  onChange={(e) => setRoadmap({ ...roadmap, title: e.target.value })}
  className="roadmap-input mb-3"
  InputProps={{
    style: { color: 'white' },
  }}
  InputLabelProps={{
    style: { color: 'white' },
  }}
  required
  error={!roadmap.title.trim()}
  helperText={!roadmap.title.trim() ? "Title is required." : ""}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '&:hover fieldset': {
        borderColor: '#80deea',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4fc3f7',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: '#b0bec5',
    },
  }}
/>

<TextField
  variant="outlined"
  placeholder="Author"
  value={roadmap.author}
  onChange={(e) => setRoadmap({ ...roadmap, author: e.target.value })}
  className="roadmap-input mb-3"
  InputProps={{
    style: { color: 'white' },
  }}
  InputLabelProps={{
    style: { color: 'white' },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '&:hover fieldset': {
        borderColor: '#80deea',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4fc3f7',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: '#b0bec5',
    },
  }}
/>

<TextField
  variant="outlined"
  placeholder="Description"
  value={roadmap.description}
  onChange={(e) => setRoadmap({ ...roadmap, description: e.target.value })}
  className="roadmap-input mb-3"
  InputProps={{
    style: { color: 'white' },
  }}
  InputLabelProps={{
    style: { color: 'white' },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '&:hover fieldset': {
        borderColor: '#80deea',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4fc3f7',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: '#b0bec5',
    },
  }}
/>

<TextField
  variant="outlined"
  placeholder="Content"
  value={roadmap.content}
  onChange={(e) => setRoadmap({ ...roadmap, content: e.target.value })}
  className="roadmap-input"
  InputProps={{
    style: { color: 'white' },
  }}
  InputLabelProps={{
    style: { color: 'white' },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '&:hover fieldset': {
        borderColor: '#80deea',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4fc3f7',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: '#b0bec5',
    },
  }}
/>

    <Button
      variant="contained"
      onClick={handleCreateRoadmap}
      className="submit-roadmap-button mt-3"
      disabled={!roadmap.title.trim()}
    >
      Submit Roadmap
    </Button>
  </div>
)}


      {selectedGroup && (
        <div className="roadmaps-list mt-4">
          <Typography variant="h6" className="text-white">
            Roadmaps Of {selectedGroup}
          </Typography>
          {groups
            .find((group) => group.name === selectedGroup)
            ?.roadmaps.map((roadmap, index) => (
              <Card key={index} className="roadmap-card">
                <Typography variant="body1" className="roadmap-title">
                  {roadmap.title}
                </Typography>
                <Typography variant="body2" className="roadmap-author">
                  Author: {roadmap.author}
                </Typography>
                <Typography variant="body2" className="roadmap-description">
                  {roadmap.description}
                </Typography>
                <Typography variant="body2" className="roadmap-content">
                  {roadmap.content}
                </Typography>
              </Card>
            ))}
          {groups.find((group) => group.name === selectedGroup)?.roadmaps.length === 0 && (
            <Typography variant="body1" className="text-white">
              No roadmaps created yet for this group.
            </Typography>
          )}
        </div>
      )}
    </Container>
  );
};

export default Groups;



/*
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  Typography,
} from "@mui/material";
import "./Group.css"; // Create a CSS file for styling
import RoadmapFlowchart from "./RoadmapFlowchart"; // Import the Flowchart Component

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
        InputProps={{
          style: { color: "white" }, // Change text color to white
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "&:hover fieldset": {
              borderColor: "#80deea",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4fc3f7",
            },
          },
        }}
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
        <Card
          key={group.name}
          className="group-card"
          onClick={() => {
            setSelectedGroup(group.name);
            setShowRoadmapForm(true);
          }}
        >
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
            onChange={(e) =>
              setRoadmap({ ...roadmap, title: e.target.value })
            }
            className="roadmap-input"
            InputProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover fieldset": {
                  borderColor: "#80deea",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4fc3f7",
                },
              },
            }}
            required
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

      {selectedGroup && (
        <div className="roadmap-visualization mt-4">
          <Typography variant="h6" className="text-white">
            Roadmap Flowchart for {selectedGroup}
          </Typography>
          <RoadmapFlowchart
            roadmaps={
              groups.find((group) => group.name === selectedGroup).roadmaps
            }
          />
        </div>
      )}
    </Container>
  );
};

export default Groups;
*/