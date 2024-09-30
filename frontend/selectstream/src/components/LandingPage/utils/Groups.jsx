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
import "./Group.css"; // Make sure to update your CSS file with the new styles

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

  const handleCreateRoadmap = async () => {
    if (selectedGroup && roadmap.title.trim()) {
      try {
        const groupDocRef = doc(db, "groups", selectedGroup.id);
        await updateDoc(groupDocRef, {
          roadmaps: arrayUnion(roadmap),
        });

        setRoadmap({ title: "", author: "", description: "", content: "" });
        fetchRoadmaps(selectedGroup);
        setShowRoadmapForm(false);
      } catch (error) {
        console.error("Error adding roadmap: ", error);
      }
    }
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    fetchRoadmaps(group);
    setShowRoadmapForm(true);
  };

  const fetchRoadmaps = (group) => {
    const groupDocRef = doc(db, "groups", group.id);
    onSnapshot(groupDocRef, (doc) => {
      if (doc.exists()) {
        setRoadmaps(doc.data().roadmaps || []);
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ padding: "20px 0" }}>
      <Typography
        variant="h4"
        className="text-white"
        sx={{ color: "#f5f5f5", marginBottom: "25px", textAlign: "center" }}
      >
        Manage Your Groups
      </Typography>

      <Box sx={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          variant="outlined"
          placeholder="Enter Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover fieldset": { borderColor: "#80deea" },
              "&.Mui-focused fieldset": { borderColor: "#4fc3f7" },
            },
            "& .MuiOutlinedInput-input": { color: "white" },
          }}
        />
        <Button
          variant="contained"
          onClick={handleCreateGroup}
          sx={{
            borderRadius: "12px",
            backgroundColor: "#ff2000",
            padding: "10px 20px",
            transition: "transform 0.3s ease",
            "&:hover": {
              backgroundColor: "#ff2000",
              transform: "scale(1.05)",
            },
          }}
        >
          Create Group
        </Button>
      </Box>

      <Typography
        variant="h5"
        className="text-white"
        sx={{ color: "#f5f5f5", marginTop: "20px" }}
      >
        Existing Groups
      </Typography>

      {groups.length > 0 ? (
        groups.map((group) => (
          <Card
            key={group.id}
            onClick={() => handleSelectGroup(group)}
            className="group-card"
            sx={{
              margin: "10px 0",
              padding: "15px",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Typography variant="h6" sx={{ color: "#212121" }}>
              {group.name}
            </Typography>
          </Card>
        ))
      ) : (
        <Typography variant="body1" sx={{ color: "#b0bec5" }}>
          No groups created yet.
        </Typography>
      )}

      {showRoadmapForm && selectedGroup && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            sx={{ color: "#f5f5f5", marginBottom: "10px" }}
          >
            Create Roadmap for {selectedGroup.name}
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Title"
            value={roadmap.title}
            onChange={(e) => setRoadmap({ ...roadmap, title: e.target.value })}
            required
            error={!roadmap.title.trim()}
            helperText={!roadmap.title.trim() ? "Title is required." : ""}
            sx={{
              width: "100%",
              marginBottom: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover fieldset": { borderColor: "#80deea" },
                "&.Mui-focused fieldset": { borderColor: "#4fc3f7" },
              },
              "& .MuiOutlinedInput-input": { color: "white" },
            }}
          />

          <TextField
            variant="outlined"
            placeholder="Author"
            value={roadmap.author}
            onChange={(e) => setRoadmap({ ...roadmap, author: e.target.value })}
            sx={{
              width: "100%",
              marginBottom: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover fieldset": { borderColor: "#80deea" },
                "&.Mui-focused fieldset": { borderColor: "#4fc3f7" },
              },
              "& .MuiOutlinedInput-input": { color: "white" },
            }}
          />

          <TextField
            variant="outlined"
            placeholder="Description"
            value={roadmap.description}
            onChange={(e) =>
              setRoadmap({ ...roadmap, description: e.target.value })
            }
            sx={{
              width: "100%",
              marginBottom: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover fieldset": { borderColor: "#80deea" },
                "&.Mui-focused fieldset": { borderColor: "#4fc3f7" },
              },
              "& .MuiOutlinedInput-input": { color: "white" },
            }}
          />

          <TextField
            variant="outlined"
            placeholder="Content"
            value={roadmap.content}
            onChange={(e) =>
              setRoadmap({ ...roadmap, content: e.target.value })
            }
            sx={{
              width: "100%",
              marginBottom: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover fieldset": { borderColor: "#80deea" },
                "&.Mui-focused fieldset": { borderColor: "#4fc3f7" },
              },
              "& .MuiOutlinedInput-input": { color: "white" },
            }}
          />

          <Button
            variant="contained"
            onClick={handleCreateRoadmap}
            sx={{
              borderRadius: "12px",
              backgroundColor: "#ff2000",
              padding: "10px 20px",
              transition: "transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#ff2000",
                transform: "scale(1.05)",
              },
            }}
          >
            Create Roadmap
          </Button>
        </Box>
      )}

      {roadmaps.length > 0 && (
        <Box sx={{ marginTop: "20px" }}>
          <Typography
            variant="h5"
            sx={{ color: "#f5f5f5", marginBottom: "10px" }}
          >
            Roadmaps for {selectedGroup.name}
          </Typography>
          {roadmaps.map((roadmap, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: "10px",
                padding: "15px",
                borderRadius: "12px",
                backgroundColor: "#37474f",
                color: "white",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Typography variant="h6">{roadmap.title}</Typography>
              <Typography variant="subtitle2">
                Author: {roadmap.author}
              </Typography>
              <Typography variant="body2">{roadmap.description}</Typography>
              <Typography variant="body2">{roadmap.content}</Typography>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Groups;
