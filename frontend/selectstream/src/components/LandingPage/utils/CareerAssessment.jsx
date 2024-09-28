// utils/CareerAssessment.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  styled,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material"; // Icon for upload
import { db } from "../../../firebase.js"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage"; // For file upload
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"; // Import from pdfjs-dist
import axios from "axios"; // For HTTP requests

// Set the workerSrc to the correct path
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${"2.16.105"}/pdf.worker.js`; // Specify your version of pdf.js here

const StyledContainer = styled(Container)({
  backgroundColor: "#121212", // Dark background
  padding: "2rem",
  borderRadius: "8px",
  marginTop: "2rem",
  color: "#fff",
});

const StyledTextArea = styled(TextField)({
  marginBottom: "1rem",
  backgroundColor: "#1e1e1e", // Darker text area background
  borderRadius: "4px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#555", // Border color for dark theme
    },
    "&:hover fieldset": {
      borderColor: "#777", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff", // Focus border color
    },
  },
  "& .MuiInputBase-input": {
    color: "#fff", // Text color in the input
  },
});

const StyledUploadButton = styled(Button)({
  backgroundColor: "#1e1e1e",
  color: "#fff",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const CareerAssessment = () => {
  const [document, setDocument] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [answers, setAnswers] = useState({
    logicalProblems: "",
    enjoyNumbers: "",
    creativeActivities: "",
    aspirations: "",
    passions: "",
    skills: "",
    workExperience: "",
    education: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
    setExtractedText(""); // Clear extracted text on new file selection
  };

  const handleQuestionChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleExtractText = async () => {
    if (!document) return;
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const pdfData = new Uint8Array(fileReader.result);
      const pdfDoc = await pdfjs.getDocument(pdfData).promise; // Use pdfjs.getDocument

      let text = "";
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const content = await page.getTextContent();
        const textItems = content.items.map((item) => item.str);
        text += textItems.join(" ") + "\n";
      }

      setExtractedText(text);
      setSnackbarOpen(true);
    };
    fileReader.readAsArrayBuffer(document);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const submissionData = {
      ...answers,
    };

    try {
      // Send data to Flask backend
      const response = await axios.post(
        "http://127.0.0.1:5000/career-assessment",
        submissionData
      );
      setResponseMessage(response.data.message); // Assuming response has a message field
      setDialogOpen(true); // Open dialog to show response
    } catch (error) {
      console.error("Error submitting data: ", error);
      setResponseMessage("There was an error submitting the data.");
      setDialogOpen(true); // Open dialog to show error
    }

    // Reset form after submission
    setDocument(null);
    setAnswers({
      logicalProblems: "",
      enjoyNumbers: "",
      creativeActivities: "",
      aspirations: "",
      passions: "",
      skills: "",
      workExperience: "",
      education: "",
    });
  };

  return (
    <>
      <Typography variant="h4" className="text-white mt-2 mb-2" gutterBottom>
        Career Analytics 📊
      </Typography>
      <StyledContainer>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} className="mb-5">
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Upload Document: <span className="font-sm">(Only PDFs)</span>
            </Typography>
            <StyledUploadButton
              component="label"
              variant="outlined"
              startIcon={<UploadFile />}
            >
              {document ? document.name : "Choose File"}
              <input
                type="file"
                hidden
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </StyledUploadButton>
            {document && (
              <Button
                variant="outlined"
                onClick={handleExtractText}
                sx={{ marginTop: "1rem", color: "#fff" }}
              >
                Extract Text from PDF
              </Button>
            )}
          </Grid>
          <Grid container spacing={2}>
            {/* Logical Problems */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "#fff" }}>
                  Are you more interested in solving logical problems?
                </FormLabel>
                <FormControlLabel
                  control={
                    <Radio
                      onChange={handleQuestionChange}
                      name="logicalProblems"
                      value="Yes"
                      sx={{ color: "#fff" }}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Radio
                      onChange={handleQuestionChange}
                      name="logicalProblems"
                      value="No"
                      sx={{ color: "#fff" }}
                    />
                  }
                  label="No"
                />
              </FormControl>
            </Grid>

            {/* Enjoy Working with Numbers */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "#fff" }}>
                  Do you enjoy working with numbers?
                </FormLabel>
                <FormControlLabel
                  control={
                    <Radio
                      onChange={handleQuestionChange}
                      name="enjoyNumbers"
                      value="Yes"
                      sx={{ color: "#fff" }}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Radio
                      onChange={handleQuestionChange}
                      name="enjoyNumbers"
                      value="No"
                      sx={{ color: "#fff" }}
                    />
                  }
                  label="No"
                />
              </FormControl>
            </Grid>

            {/* Prefer Creative Activities */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "#fff" }}>
                  Do you prefer creative activities?
                </FormLabel>
                <FormControlLabel
                  control={
                    <Radio
                      onChange={handleQuestionChange}
                      name="creativeActivities"
                      value="Yes"
                      sx={{ color: "#fff" }}
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Radio
                      onChange={handleQuestionChange}
                      name="creativeActivities"
                      value="No"
                      sx={{ color: "#fff" }}
                    />
                  }
                  label="No"
                />
              </FormControl>
            </Grid>

            {/* Aspirations and Interests */}
            <Grid item xs={12}>
              <Typography variant="h6" className="mb-3" sx={{ color: "#fff" }}>
                Aspirations and Interests
              </Typography>
              <StyledTextArea
                label="What are your career aspirations?"
                name="aspirations"
                onChange={handleQuestionChange}
                rows={2}
                fullWidth
                variant="outlined"
                multiline
                InputLabelProps={{
                  style: { color: "#808080" }, // Set label color
                }}
              />
              <StyledTextArea
                label="What are your passions?"
                name="passions"
                onChange={handleQuestionChange}
                rows={2}
                fullWidth
                variant="outlined"
                multiline
                InputLabelProps={{
                  style: { color: "#808080" }, // Set label color
                }}
              />
              <StyledTextArea
                label="What are your skills?"
                name="skills"
                onChange={handleQuestionChange}
                rows={2}
                fullWidth
                variant="outlined"
                multiline
                InputLabelProps={{
                  style: { color: "#808080" }, // Set label color
                }}
              />
              <StyledTextArea
                label="Previous Work Experience"
                name="workExperience"
                onChange={handleQuestionChange}
                rows={2}
                fullWidth
                variant="outlined"
                multiline
                InputLabelProps={{
                  style: { color: "#808080" }, // Set label color
                }}
              />
              <StyledTextArea
                label="Education"
                name="education"
                onChange={handleQuestionChange}
                rows={2}
                fullWidth
                variant="outlined"
                multiline
                InputLabelProps={{
                  style: { color: "#808080" }, // Set label color
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "1.5rem",
              backgroundColor: "#4CAF50",
              color: "#fff",
            }}
          >
            Submit
          </Button>
        </form>
      </StyledContainer>

      {/* Snackbar for text extraction */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Text extracted from PDF!
        </Alert>
      </Snackbar>

      {/* Dialog for submission response */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Submission Response</DialogTitle>
        <DialogContent>
          <Typography>{responseMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CareerAssessment;
