import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FuturePrediction = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: query, sender: "user" },
    ]);

    try {
      // Make a POST request to your Flask backend
      const response = await axios.post(
        "http://127.0.0.1:5000/scope",
        {
          query,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseMessage = response.data.answer;

      // Check if the response contains a YouTube link
      const youtubeLinkPattern =
        /https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
      const isYouTubeLink = youtubeLinkPattern.test(responseMessage);

      // Add the response message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: isYouTubeLink ? responseMessage : response.data.answer,
          sender: "bot",
          isVideo: isYouTubeLink, // Flag to identify if the response is a video
        },
      ]);
      setQuery(""); // Clear the input field
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error fetching response", sender: "bot" },
      ]);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Future Prediction Chat 🔮
      </Typography>
      <Box
        sx={{
          maxWidth: 1000,
          mx: "auto",
          my: 4,
          p: 2,
          bgcolor: "#121212",
          borderRadius: 2,
          boxShadow: 3,
        }}
        className="mt-5"
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 2,
            maxHeight: 400,
            overflowY: "auto",
            bgcolor: "#1E1E1E",
            borderRadius: 2,
          }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {msg.isVideo ? (
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${
                    msg.text.split("v=")[1]
                  }`}
                  title="YouTube video"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <Typography
                  variant="body1"
                  align={msg.sender === "user" ? "right" : "left"}
                  sx={{
                    bgcolor: msg.sender === "user" ? "primary.main" : "#424242",
                    color: "white",
                    borderRadius: 2,
                    padding: "10px",
                    margin: "10px 0",
                    maxWidth: "80%",
                    display: "inline-block",
                    boxShadow: 1,
                  }}
                >
                  {msg.text}
                </Typography>
              )}
            </motion.div>
          ))}
        </Paper>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            variant="outlined"
            fullWidth
            label="Type your query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              mr: 1,
              bgcolor: "#424242",
              borderRadius: 2,
              input: {
                color: "white",
              },
              label: {
                color: "#B0BEC5",
              },
            }}
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      </Box>
    </>
  );
};

export default FuturePrediction;
