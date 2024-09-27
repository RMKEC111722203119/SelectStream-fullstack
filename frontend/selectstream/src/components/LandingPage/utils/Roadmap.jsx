// utils/Roadmap.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
} from "@mui/material";
import { searchableRoadmaps, predefinedRoadmaps } from "./roadmaps"; // Import roadmaps
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Roadmap.css"; // Include additional CSS for custom styles

const Roadmap = () => {
  const [techStack, setTechStack] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [userRoadmaps, setUserRoadmaps] = useState([]); // State to store user-added roadmaps
  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    author_name: "",
    author_desc: "",
    article_desc: "",
    content: "",
    progress: 0, // Added progress property for visualization
  });
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  // Load roadmaps from localStorage when the component mounts
  useEffect(() => {
    const savedRoadmaps =
      JSON.parse(localStorage.getItem("userRoadmaps")) || [];
    setUserRoadmaps(savedRoadmaps);
  }, []);

  // Save roadmaps to localStorage whenever the userRoadmaps state changes
  useEffect(() => {
    localStorage.setItem("userRoadmaps", JSON.stringify(userRoadmaps));
  }, [userRoadmaps]);

  // Handle roadmap search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRoadmap = searchableRoadmaps[techStack];

    if (selectedRoadmap) {
      setRoadmap(selectedRoadmap);
    } else {
      setRoadmap([]);
    }
  };

  // Handle form changes for adding a new roadmap
  const handleInputChange = (e) => {
    setNewRoadmap({ ...newRoadmap, [e.target.name]: e.target.value });
  };

  // Handle submission of the new roadmap
  const handleAddRoadmap = (e) => {
    e.preventDefault();
    setUserRoadmaps([...userRoadmaps, newRoadmap]); // Add new roadmap to the state
    setNewRoadmap({
      title: "",
      author_name: "",
      author_desc: "",
      article_desc: "",
      content: "",
      progress: 0,
    }); // Reset form fields
    setShowForm(false); // Hide the form after submission
  };

  return (
    <Container className="mt-5 p-3">
      <Card
        className="text-white"
        style={{ background: "#1a1a1a", borderRadius: "10px" }}
      >
        <CardContent>
          {/* Form to search for roadmaps */}
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <TextField
              label="Enter a technology stack"
              variant="outlined"
              fullWidth
              className="form-control bg-dark text-white border"
              InputLabelProps={{
                style: { color: "#b0b0b0" },
              }}
              inputProps={{
                style: { color: "#fff", borderColor: "#fff" },
              }}
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="btn w-25 align-self-end"
              style={{
                marginTop: "10px",
                backgroundColor: "#ff5722",
                color: "#fff",
                borderRadius: "20px",
              }}
            >
              Get Roadmap
            </Button>
          </form>

          {/* Display the searched roadmap */}
          {roadmap.length > 0 ? (
            <Box className="mt-4 p-3 border rounded bg-dark">
              <Typography variant="h6" className="mb-3 text-white">
                Roadmap for {techStack}:
              </Typography>
              <ul className="list-group">
                {roadmap.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item bg-dark text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Box>
          ) : (
            techStack && (
              <Typography
                variant="body1"
                color="error"
                className="text-center mt-3"
              >
                No roadmap found for "{techStack}".
              </Typography>
            )
          )}

          <Divider className="my-4" />

          {/* Predefined Roadmaps */}
          <Typography variant="h5" className="mt-4 text-white">
            Predefined Roadmaps:
          </Typography>
          <Grid container spacing={3} className="mt-3">
            {predefinedRoadmaps.map((roadmap, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className="bg-dark text-light shadow-sm"
                  style={{
                    borderRadius: "10px",
                    height: "300px", // Set a fixed height for uniformity
                  }}
                >
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Ensure equal space around content
                    }}
                  >
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      {roadmap.title}
                    </Typography>
                    <Typography variant="body2" className="mb-2">
                      <strong>{roadmap.author_name}</strong> -{" "}
                      {roadmap.author_desc}
                    </Typography>
                    <Typography variant="body2">
                      {roadmap.article_desc}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={roadmap.progress}
                      style={{ marginTop: "10px", borderRadius: "5px" }}
                    />
                    <Button
                      variant="contained"
                      className="mt-2"
                      onClick={() => alert(roadmap.content)}
                      style={{
                        backgroundColor: "#ff5722",
                        color: "#fff",
                        borderRadius: "15px",
                        marginTop: "auto", // Align button to the bottom
                      }}
                    >
                      View Roadmap
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Display the user-added roadmaps */}
          {userRoadmaps.length > 0 && (
            <>
              <Typography variant="h5" className="mt-5 text-white">
                User-Added Roadmaps:
              </Typography>
              <Grid container spacing={3} className="mt-3">
                {userRoadmaps.map((roadmap, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      className="mt-3 bg-dark text-light shadow-sm"
                      style={{ borderRadius: "10px", height: "300px" }}
                    >
                      <CardContent
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">{roadmap.title}</Typography>
                        <Typography variant="body2" className="mb-2">
                          <strong>{roadmap.author_name}</strong> -{" "}
                          {roadmap.author_desc}
                        </Typography>
                        <Typography variant="body2">
                          {roadmap.article_desc}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={roadmap.progress}
                          style={{ marginTop: "10px", borderRadius: "5px" }}
                        />
                        <Button
                          variant="contained"
                          className="mt-5"
                          onClick={() => alert(roadmap.content)}
                          style={{
                            backgroundColor: "#ff5722",
                            color: "#fff",
                            borderRadius: "15px",
                            marginTop: "auto",
                          }}
                        >
                          View Roadmap
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
      <div className="container d-flex justify-content-end">
        <Button
          onClick={() => setShowForm(!showForm)}
          className="btn my-3"
          style={{
            backgroundColor: "#ff5722",
            color: "#fff",
            borderRadius: "20px",
          }}
        >
          {showForm ? "Hide Form" : "Add Roadmap"}
        </Button>
      </div>
      {showForm && (
        <form
          onSubmit={handleAddRoadmap}
          className="d-flex flex-column gap-3 p-3 border rounded bg-dark shadow-sm"
          style={{ backgroundColor: "#2e2e2e", borderRadius: "10px" }}
        >
          <TextField
            label="Title"
            name="title"
            value={newRoadmap.title}
            onChange={handleInputChange}
            required
            variant="outlined"
            fullWidth
            className="mb-3 bg-dark text-white"
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            inputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Author Name"
            name="author_name"
            value={newRoadmap.author_name}
            onChange={handleInputChange}
            required
            variant="outlined"
            fullWidth
            className="mb-3 bg-dark text-white"
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            inputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Author Description"
            name="author_desc"
            value={newRoadmap.author_desc}
            onChange={handleInputChange}
            required
            variant="outlined"
            fullWidth
            className="mb-3 bg-dark text-white"
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            inputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Article Description"
            name="article_desc"
            value={newRoadmap.article_desc}
            onChange={handleInputChange}
            required
            variant="outlined"
            fullWidth
            className="mb-3 bg-dark text-white"
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            inputProps={{ style: { color: "#fff" } }}
          />
          <TextField
            label="Content"
            name="content"
            value={newRoadmap.content}
            onChange={handleInputChange}
            required
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            className="bg-dark text-white"
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            inputProps={{ style: { color: "#fff" } }}
          />
          <Button
            type="submit"
            className="btn align-self-end mt-2"
            style={{
              backgroundColor: "#ff5722",
              color: "#fff",
              borderRadius: "20px",
            }}
          >
            Add Roadmap
          </Button>
        </form>
      )}
    </Container>
  );
};

export default Roadmap;
