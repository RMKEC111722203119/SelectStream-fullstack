import React, { useState } from "react";
import { Container, Card, Button, Grid, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material"; // MUI icon for search
import "./QuickLearn.css"; // Ensure you create this CSS file

const QuickLearn = () => {
  const [query, setQuery] = useState("");
  const [video, setVideo] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return; // Prevent empty search
    try {
      const response = await fetch(
        `http://localhost:5000/search?query=${query}`
      ); // Replace with your backend URL
      const data = await response.json();
      setVideo(data); // Assuming your backend returns video data
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <>
      <h3 className="display-6 text-white">
        Welcome to the Select-Stream AI 🎥!
      </h3>
      <p className="text-secondary">
        This tool is designed to help you find the most informative and concise
        YouTube videos on any topic quickly and optimally.
      </p>
      <Container maxWidth="lg" className="quick-learn" sx={{ mt: 5 }}>
        <form onSubmit={handleSearch} className="mb-3">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for tutorials..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      <SearchIcon />
                    </Button>
                  ),
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#007bff",
                    },
                  },
                }}
              />
              <p
                className="text-white h6 mt-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                What You Wanna Learn Today? 🤔
              </p>
            </Grid>
          </Grid>
        </form>

        {video && (
          <Card className="video-card mb-4" elevation={3}>
            <Card.Content>
              <Card.Title>{video.title}</Card.Title>
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`} // Assuming video.id is the YouTube video ID
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                  className="responsive-iframe"
                  style={{ width: "100%", height: "400px" }} // Fixed height for better responsiveness
                ></iframe>
              </div>
              <Card.Text className="mt-2">{video.description}</Card.Text>
              <Button
                variant="outlined"
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                className="watch-link"
                sx={{ marginTop: 2 }}
              >
                Watch on YouTube
              </Button>
            </Card.Content>
          </Card>
        )}
      </Container>
    </>
  );
};

export default QuickLearn;
