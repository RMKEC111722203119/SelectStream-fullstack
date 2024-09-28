import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { motion } from "framer-motion"; // Import Framer Motion
import "./QuickLearn.css"; // Ensure this contains appropriate styles

const QuickLearn = () => {
  const [query, setQuery] = useState("");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    if (!query) return; // Prevent empty search

    try {
      const response = await fetch(`http://127.0.0.1:5000/quick`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setVideo(data);
      } else {
        setError(data.error || "No video found");
        setVideo(null);
      }
    } catch (error) {
      setError("Error fetching video. Please try again." + error.message);
      setVideo(null);
    }
  };

  const getEmbedUrl = (videoUrl) => {
    const videoId = videoUrl.split("v=")[1]; // Extract the video ID from the URL
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <motion.p
        className="display-6 text-white mt-2"
        style={{ fontWeight: "bold" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to{" "}
        <span style={{ textDecoration: "underline" }}>Select-Stream AI</span> 🎥
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="subtitle1"
          className="text-light"
          color="textSecondary"
          sx={{ mb: 5 }}
        >
          Discover the most informative and concise YouTube videos instantly.
        </Typography>
      </motion.div>

      <Container maxWidth="lg" className="quick-learn" sx={{ mt: 5, py: 5 }}>
        <motion.form
          onSubmit={handleSearch}
          className="mb-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={8}>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search for tutorials..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <button
                      type="submit"
                      className="btn text-white"
                      size="large"
                    >
                      <SearchIcon />
                    </button>
                  ),
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Typography
                variant="body2"
                color="white"
                align="center"
                sx={{ mt: 2, fontFamily: "'Poppins', sans-serif" }}
              >
                What do you want to learn today? 🤔
              </Typography>
            </Grid>
          </Grid>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          </motion.div>
        )}

        {video && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="video-card"
              elevation={3}
              sx={{ p: 3, mt: 5, backgroundColor: "#f5f5f5" }}
            >
              <Typography variant="h5" gutterBottom align="center">
                {video.title}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                color="textSecondary"
                align="center"
              >
                Channel: {video.channelTitle}
              </Typography>
              <div
                className="video-wrapper"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <iframe
                  src={getEmbedUrl(video.response)}
                  title="YouTube video"
                  frameBorder="0"
                  allowFullScreen
                  className="responsive-iframe"
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                ></iframe>
              </div>
              <Button
                variant="contained"
                href={video.response}
                target="_blank"
                className="watch-link text-center rounded-pill"
                sx={{
                  display: "block",
                  backgroundColor: "#FF0000",
                  color: "#fff",
                }}
              >
                Watch on YouTube
              </Button>
            </Card>
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default QuickLearn;
