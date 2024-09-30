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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
 // For rendering math (optional)
import "katex/dist/katex.min.css"; // Include KaTeX CSS
import Iframe from "react-iframe"; // For handling iframes
import "bootstrap/dist/css/bootstrap.min.css";
import "./Roadmap.css";

// Custom component to handle iframes in Markdown
const IframeRenderer = ({ src }) => {
  return (
    <Iframe
      url={src}
      width="100%"
      height="315px"
      display="initial"
      position="relative"
      id="iframeId"
      className="my-iframe"
    />
  );
};

const Roadmap = () => {
  const [techStack, setTechStack] = useState("");
  const [allRoadmaps, setAllRoadmaps] = useState([]);
  const [filteredRoadmaps, setFilteredRoadmaps] = useState([]);
  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    author_name: "",
    author_desc: "",
    article_desc: "",
    content: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false); // Modal open state
  const [selectedRoadmap, setSelectedRoadmap] = useState(null); // Selected roadmap data

  // Function to fetch user roadmaps
  const fetchUserRoadmaps = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/get_data");
      if (Array.isArray(response.data)) {
        setAllRoadmaps(response.data);
        setFilteredRoadmaps(response.data);
      } else {
        console.error("Fetched data is not an array:", response.data);
        setAllRoadmaps([]);
        setFilteredRoadmaps([]);
      }
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
      setAllRoadmaps([]);
      setFilteredRoadmaps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoadmaps();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setTechStack(value);

    if (value.trim() === "") {
      setFilteredRoadmaps(allRoadmaps);
    } else {
      const filtered = allRoadmaps.filter((roadmap) =>
        roadmap.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRoadmaps(filtered);
    }
  };

  const handleInputChange = (e) => {
    setNewRoadmap({ ...newRoadmap, [e.target.name]: e.target.value });
  };

  const handleAddRoadmap = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/add_data",
        newRoadmap
      );
      if (response.data) {
        setNewRoadmap({
          title: "",
          author_name: "",
          author_desc: "",
          article_desc: "",
          content: "",
        });
        setShowForm(false);
        await fetchUserRoadmaps();
      }
    } catch (error) {
      console.error("Error adding roadmap:", error);
    }
  };

  // Handle opening the modal and setting selected roadmap
  const handleOpenModal = (roadmap) => {
    setSelectedRoadmap(roadmap);
    setOpenModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRoadmap(null);
  };

  return (
    <>
      <p className="display-6 text-white mt-2" style={{ fontWeight: "bold" }}>
        Get your{" "}
        <span style={{ textDecoration: "underline" }}>
          Personalized RoadMaps
        </span>{" "}
        📌
      </p>
      <Container className="mt-5 p-3">
        <Card
          className="text-white"
          style={{ background: "#1a1a1a", borderRadius: "10px" }}
        >
          <CardContent>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="d-flex flex-column gap-3"
            >
              <TextField
                label="Enter a technology stack"
                variant="outlined"
                fullWidth
                className="form-control"
                InputLabelProps={{ style: { color: "#b0b0b0" } }}
                inputProps={{ style: { color: "#000" } }}
                InputProps={{ style: { backgroundColor: "#fff" } }}
                value={techStack}
                onChange={handleSearchChange}
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

            <Divider className="my-4" />

            <Typography variant="h5" className="mt-4 text-white">
             Well Structured Roadmaps:
            </Typography>
            <Grid container spacing={3} className="mt-3">
              {filteredRoadmaps.map((roadmap, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    className="mt-3 bg-dark text-light shadow-sm"
                    style={{
                      borderRadius: "10px",
                      width: "350px",
                      height: "400px",
                    }} // Increased width and height
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
                        onClick={() => handleOpenModal(roadmap)}
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

        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg">
          <DialogTitle>{selectedRoadmap?.title}</DialogTitle>
          <DialogContent>
            {selectedRoadmap && (
              <>
                <DialogContentText>
                  <strong>Author:</strong> {selectedRoadmap.author_name}
                  <br />
                  <strong>About Author:</strong> {selectedRoadmap.author_desc}
                  <br />
                  <strong>Description:</strong> {selectedRoadmap.article_desc}
                </DialogContentText>
                <Typography variant="body1" style={{ marginTop: 20 }}>
                  <ReactMarkdown
                    components={{
                      iframe: ({ node }) => {
                        // Check if the src exists and returns a rendered Iframe
                        const src = node.children[0]?.value || "";
                        return <IframeRenderer src={src} />;
                      },
                    }}
                  >
                    {selectedRoadmap.content}
                  </ReactMarkdown>
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseModal}
              color="primary"
              style={{ color: "#ff5722" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Roadmap;
