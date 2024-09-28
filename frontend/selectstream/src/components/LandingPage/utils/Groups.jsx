import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Card,
  Typography,
  Box,
} from "@mui/material";
import { db } from "../../../firebase.js"; // Ensure this path matches your setup
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import "./Group.css";

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
  const [roadmaps, setRoadmaps] = useState([]);

  // Fetch groups from Firestore on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      const querySnapshot = await getDocs(collection(db, "groups"));
      const groupData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupData);
    };

    fetchGroups();
  }, []);

  // Handle creating a new group
  const handleCreateGroup = async () => {
    if (groupName.trim()) {
      try {
        const docRef = await addDoc(collection(db, "groups"), {
          name: groupName,
          roadmaps: [],
        });
        setGroups([
          ...groups,
          { id: docRef.id, name: groupName, roadmaps: [] },
        ]);
        setGroupName("");
      } catch (error) {
        console.error("Error creating group: ", error);
      }
    }
  };

  // Handle creating a new roadmap for a selected group
  const handleCreateRoadmap = async () => {
    if (selectedGroup && roadmap.title.trim()) {
      try {
        const groupDocRef = doc(db, "groups", selectedGroup.id);
        await updateDoc(groupDocRef, {
          roadmaps: arrayUnion(roadmap),
        });

        setRoadmap({ title: "", author: "", description: "", content: "" });
        fetchRoadmaps(selectedGroup); // Refetch roadmaps to update the list
        setShowRoadmapForm(false);
      } catch (error) {
        console.error("Error adding roadmap: ", error);
      }
    }
  };

  // Handle selecting a group to add a roadmap
  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    fetchRoadmaps(group); // Fetch roadmaps when a group is selected
    setShowRoadmapForm(true);
  };

  // Fetch roadmaps of the selected group from Firestore
  const fetchRoadmaps = (group) => {
    const groupDocRef = doc(db, "groups", group.id);
    onSnapshot(groupDocRef, (doc) => {
      if (doc.exists()) {
        setRoadmaps(doc.data().roadmaps || []);
      }
    });
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
          style: { color: "white", borderRadius: "8px" },
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
          "& .MuiOutlinedInput-input": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "#b0bec5",
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
          <Card
            key={group.id}
            className="group-card"
            onClick={() => handleSelectGroup(group)}
            sx={{
              margin: "10px 0",
              padding: "10px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#f0f4f8" },
            }}
          >
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
        <Box className="roadmap-form" sx={{ marginTop: "20px" }}>
          <Typography variant="h6" className="text-white mt-4">
            Create Roadmap for {selectedGroup.name}
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Title"
            value={roadmap.title}
            onChange={(e) => setRoadmap({ ...roadmap, title: e.target.value })}
            className="roadmap-input mb-3"
            required
            error={!roadmap.title.trim()}
            helperText={!roadmap.title.trim() ? "Title is required." : ""}
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
              "& .MuiOutlinedInput-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "#b0bec5",
              },
            }}
          />

          <TextField
            variant="outlined"
            placeholder="Author"
            value={roadmap.author}
            onChange={(e) => setRoadmap({ ...roadmap, author: e.target.value })}
            className="roadmap-input mb-3"
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
              "& .MuiOutlinedInput-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "#b0bec5",
              },
            }}
          />

          <TextField
            variant="outlined"
            placeholder="Description"
            value={roadmap.description}
            onChange={(e) =>
              setRoadmap({ ...roadmap, description: e.target.value })
            }
            className="roadmap-input mb-3"
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
              "& .MuiOutlinedInput-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "#b0bec5",
              },
            }}
          />

          <TextField
            variant="outlined"
            placeholder="Content"
            value={roadmap.content}
            onChange={(e) =>
              setRoadmap({ ...roadmap, content: e.target.value })
            }
            className="roadmap-input"
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
              "& .MuiOutlinedInput-input": {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "#b0bec5",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleCreateRoadmap}
            className="create-roadmap-button mt-2"
          >
            Create Roadmap
          </Button>
        </Box>
      )}

      {roadmaps.length > 0 && (
        <Box className="roadmaps-list mt-4">
          <Typography variant="h6" className="text-white">
            Roadmaps for {selectedGroup?.name}
          </Typography>

          {roadmaps.map((roadmap, index) => (
            <Card
              key={index}
              className="roadmap-card mt-2"
              sx={{
                padding: "20px",
                margin: "10px 0",
                borderRadius: "12px",
                backgroundColor: "#263238",
                color: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography variant="h6">{roadmap.title}</Typography>
              <Typography variant="subtitle1">
                Author: {roadmap.author}
              </Typography>
              <Typography variant="body2" className="mt-2">
                {roadmap.description}
              </Typography>
              <Typography variant="body2" className="mt-1">
                Content: {roadmap.content}
              </Typography>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Groups;
