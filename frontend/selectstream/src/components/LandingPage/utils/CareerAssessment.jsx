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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { styled } from "@mui/system";

// Set the workerSrc to the correct path for pdf.js
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${"2.16.105"}/pdf.worker.js`;

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#1A1A1A", // Dark background
  padding: "2.5rem",
  borderRadius: "10px",
  marginTop: "2rem",
  color: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease-in-out", // Smooth transition effect
  "&:hover": {
    transform: "scale(1.02)", // Subtle zoom effect on hover
  },
}));

const StyledTextArea = styled(TextField)({
  marginBottom: "1.5rem",
  backgroundColor: "#252525",
  borderRadius: "5px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#666",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFF",
    },
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  transition: "border-color 0.3s ease",
});

const StyledUploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#333",
  color: "#fff",
  marginTop: "1rem",
  "&:hover": {
    backgroundColor: "#555",
  },
  transition: "background-color 0.3s ease",
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: "1.5rem",
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "#45A049",
  },
  transition: "background-color 0.3s ease",
}));

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
    setExtractedText("");
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
      const pdfDoc = await getDocument(pdfData).promise;

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

    const submissionData = {
      ...answers,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/career-assessment",
        submissionData
      );
      setResponseMessage(response.data.content);
      setDialogOpen(true);
    } catch (error) {
      setResponseMessage("There was an error submitting the data.");
      setDialogOpen(true);
    }

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
      <Fade in timeout={800}>
        <Typography variant="h4" className="text-white mt-2 mb-2" gutterBottom>
          Career Analytics 📊
        </Typography>
      </Fade>
      <Fade in timeout={1200}>
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

              {/* Creative Activities */}
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
                <Typography
                  variant="h6"
                  className="mb-3"
                  sx={{ color: "#fff" }}
                >
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
                />
                <StyledTextArea
                  label="What are you most passionate about?"
                  name="passions"
                  onChange={handleQuestionChange}
                  rows={2}
                  fullWidth
                  variant="outlined"
                  multiline
                />
                <StyledTextArea
                  label="What skills do you possess?"
                  name="skills"
                  onChange={handleQuestionChange}
                  rows={2}
                  fullWidth
                  variant="outlined"
                  multiline
                />
                <StyledTextArea
                  label="Summarize your work experience."
                  name="workExperience"
                  onChange={handleQuestionChange}
                  rows={3}
                  fullWidth
                  variant="outlined"
                  multiline
                />
                <StyledTextArea
                  label="Detail your education."
                  name="education"
                  onChange={handleQuestionChange}
                  rows={3}
                  fullWidth
                  variant="outlined"
                  multiline
                />
              </Grid>
            </Grid>

            <SubmitButton
              type="submit"
              variant="contained"
              className="btn"
              style={{ background: "#ff2000" }}
            >
              Submit
            </SubmitButton>
          </form>
        </StyledContainer>
      </Fade>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Text extracted successfully!
        </Alert>
      </Snackbar>

      {/* Dialog for Displaying API Response */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Response from Intelli</DialogTitle>
        <DialogContent>
          <ReactMarkdown>{responseMessage}</ReactMarkdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CareerAssessment;
