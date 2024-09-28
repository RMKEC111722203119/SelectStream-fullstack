// utils/Roadmap.jsx
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
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { searchableRoadmaps, predefinedRoadmaps } from "./roadmaps";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Roadmap.css";

const Roadmap = () => {
  const [techStack, setTechStack] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [userRoadmaps, setUserRoadmaps] = useState([]);
  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    author_name: "",
    author_desc: "",
    article_desc: "",
    content: "",
    
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoadmaps = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/get_data");
        if (Array.isArray(response.data)) {
          setUserRoadmaps(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
          setUserRoadmaps([]);
        }
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
        setUserRoadmaps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoadmaps();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRoadmap = searchableRoadmaps[techStack];

    if (selectedRoadmap) {
      setRoadmap(selectedRoadmap);
    } else {
      setRoadmap([]);
    }
  };

  const handleInputChange = (e) => {
    setNewRoadmap({ ...newRoadmap, [e.target.name]: e.target.value });
  };

  const handleAddRoadmap = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/add_data", newRoadmap);
      if (response.data) {
        setUserRoadmaps([...userRoadmaps, response.data]);
      }
      setNewRoadmap({
        title: "",
        author_name: "",
        author_desc: "",
        article_desc: "",
        content: "",
        progress: 0,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding roadmap:", error);
    }
  };

  return (
    <>
      <p className="display-6 text-white mt-2" style={{ fontWeight: "bold" }}>
        Get your <span style={{ textDecoration: "underline" }}>Personalized RoadMaps</span>{" "}
        <span style={{ textDecoration: "underline" }}></span> 📌
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
                InputLabelProps={{
                  style: { color: "#b0b0b0" },
                }}
                inputProps={{
                  style: { color: "#000" },
                }}
                InputProps={{
                  style: { backgroundColor: "#fff" },
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
                      height: "300px",
                    }}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
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
                      <Button
                        variant="contained"
                        className="mt-2"
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
                  value={newRoadmap.title}
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
                  value={newRoadmap.author_name}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Author Description"
                  variant="outlined"
                  fullWidth
                  name="author_desc"
                  value={newRoadmap.author_desc}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Article Description"
                  variant="outlined"
                  fullWidth
                  name="article_desc"
                  value={newRoadmap.article_desc}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Content"
                  variant="outlined"
                  fullWidth
                  name="content"
                  value={newRoadmap.content}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <TextField
                  label="Progress (%)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  name="progress"
                  value={newRoadmap.progress}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                  InputProps={{
                    style: { backgroundColor: "#fff", color: "#000" },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  className="mt-4"
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
