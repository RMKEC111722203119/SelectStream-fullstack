// utils/Roadmap.jsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import roadmaps from "./roadmaps"; // Import the roadmap object
import "./Roadmap.css";

const Roadmap = () => {
  const [techStack, setTechStack] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRoadmap = roadmaps[techStack];

    if (selectedRoadmap) {
      setRoadmap(selectedRoadmap);
    } else {
      setRoadmap([]);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <TextField
          label="Enter Tech Stack (e.g., Frontend Development)"
          variant="outlined"
          fullWidth
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
          Get Roadmap
        </Button>
      </form>

      {roadmap.length > 0 && (
        <div>
          <Typography variant="h6">Roadmap for {techStack}:</Typography>
          <ul>
            {roadmap.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {roadmap.length === 0 && techStack && (
        <Typography variant="body1" color="error">
          No roadmap found for "{techStack}".
        </Typography>
      )}
    </Container>
  );
};

export default Roadmap;
