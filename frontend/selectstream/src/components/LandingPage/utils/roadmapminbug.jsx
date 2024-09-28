/*import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Roadmap.css";

const Roadmap = () => {
  const [techStack, setTechStack] = useState("");
  const [roadmaps, setRoadmaps] = useState({
    roadmap: [],
    userRoadmaps: [],
    newRoadmap: {
      title: "",
      author_name: "",
      author_desc: "",
      article_desc: "",
      content: "",
    },
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to fetch user roadmaps
  const fetchUserRoadmaps = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/get_data");
      if (Array.isArray(response.data)) {
        setRoadmaps((prev) => ({ ...prev, userRoadmaps: response.data }));
      } else {
        console.error("Fetched data is not an array:", response.data);
        setRoadmaps((prev) => ({ ...prev, userRoadmaps: [] }));
      }
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      setRoadmaps((prev) => ({ ...prev, userRoadmaps: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoadmaps();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRoadmap = roadmaps.userRoadmaps.find(
      (r) => r.title.toLowerCase() === techStack.toLowerCase()
    );

    if (selectedRoadmap) {
      setRoadmaps((prev) => ({ ...prev, roadmap: [selectedRoadmap] }));
    } else {
      setRoadmaps((prev) => ({ ...prev, roadmap: [] }));
    }
  };

  const handleInputChange = (e) => {
    setRoadmaps((prev) => ({
      ...prev,
      newRoadmap: { ...prev.newRoadmap, [e.target.name]: e.target.value },
    }));
  };

  const handleAddRoadmap = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/add_data",
        roadmaps.newRoadmap
      );
      if (response.data) {
        // Optionally you can also add the new roadmap directly to the userRoadmaps
        // const newRoadmap = response.data; // This depends on your backend response structure
        // setRoadmaps((prev) => ({
        //   ...prev,
        //   userRoadmaps: [...prev.userRoadmaps, newRoadmap],
        // }));

        // Clear new roadmap input
        setRoadmaps((prev) => ({
          ...prev,
          newRoadmap: {
            title: "",
            author_name: "",
            author_desc: "",
            article_desc: "",
            content: "",
          },
        }));
        setShowForm(false); // Optionally hide the form after adding

        // Refetch user roadmaps to ensure the display is updated
        await fetchUserRoadmaps();
      }
    } catch (error) {
      console.error("Error adding roadmap:", error);
    }
  };

  return (
    <>
      <p className="display-6 text-white mt-2" style={{ fontWeight: "bold" }}>
        Get your <span style={{ textDecoration: "underline" }}>Personalized RoadMaps</span> 📌
      </p>
      <Container className="mt-5 p-3">
        <Card
          className="text-white"
          style={{ background: "#1a1a1a", borderRadius: "10px" }}
        >
          <CardContent>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <TextField
                label="Enter a technology stack"
                variant="outlined"
                fullWidth
                className="form-control"
                InputLabelProps={{ style: { color: "#b0b0b0" } }}
                inputProps={{ style: { color: "#000" } }}
                InputProps={{ style: { backgroundColor: "#fff" } }}
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

            {roadmaps.roadmap.length > 0 ? (
              <Box className="mt-4 p-3 border rounded bg-dark">
                <Typography variant="h6" className="mb-3 text-white">
                  Roadmap for {techStack}:
                </Typography>
                <ul className="list-group">
                  {roadmaps.roadmap.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item bg-dark text-white"
                    >
                      {item.content}
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

            <Typography variant="h5" className="mt-4 text-white">
              User-Added Roadmaps:
            </Typography>
            <Grid container spacing={3} className="mt-3">
              {roadmaps.userRoadmaps.map((roadmap, index) => (
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
                        <strong>{roadmap.author_name}</strong> - {roadmap.author_desc}
                      </Typography>
                      <Typography variant="body2">
                        {roadmap.article_desc}
                      </Typography>
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

            <Button
              variant="outlined"
              onClick={() => setShowForm(!showForm)}
              className="mt-4"
              style={{
                color: "#ff5722",
                borderColor: "#ff5722",
                borderRadius: "20px",
              }}
            >
              {showForm ? "Cancel" : "Add New Roadmap"}
            </Button>
            {showForm && (
              <form onSubmit={handleAddRoadmap} className="mt-4">
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  name="title"
                  value={roadmaps.newRoadmap.title}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Author Name"
                  variant="outlined"
                  fullWidth
                  name="author_name"
                  value={roadmaps.newRoadmap.author_name}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Author Description"
                  variant="outlined"
                  fullWidth
                  name="author_desc"
                  value={roadmaps.newRoadmap.author_desc}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Article Description"
                  variant="outlined"
                  fullWidth
                  name="article_desc"
                  value={roadmaps.newRoadmap.article_desc}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Content"
                  variant="outlined"
                  fullWidth
                  name="content"
                  value={roadmaps.newRoadmap.content}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <Button
                  type="submit"
                  className="mt-3"
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
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Roadmap;
