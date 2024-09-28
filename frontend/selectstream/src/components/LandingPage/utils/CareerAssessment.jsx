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
  IconButton,
  InputAdornment,
  styled,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material"; // Icon for upload
import { styled as styledSystem } from '@mui/system';

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
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#555', // Border color for dark theme
    },
    '&:hover fieldset': {
      borderColor: '#777', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff', // Focus border color
    },
  },
  '& .MuiInputBase-input': {
    color: '#fff', // Text color in the input
  },
});

const StyledUploadButton = styled(Button)({
  backgroundColor: "#1e1e1e",
  color: "#fff",
  marginTop: "1rem",
  '&:hover': {
    backgroundColor: "#333",
  },
});

const CareerAssessment = () => {
  const [document, setDocument] = useState(null);
  const [answers, setAnswers] = useState({
    logicalProblems: '',
    enjoyNumbers: '',
    creativeActivities: '',
    aspirations: '',
    passions: '',
    skills: '',
    workExperience: '',
    education: '',
  });

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleQuestionChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle document upload and answers submission logic here
    console.log("Document:", document);
    console.log("Answers:", answers);
  };

  return (
    <StyledContainer>
      <Typography variant="h4" align="center" gutterBottom>
        Career Assessment
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid item xs={12} className="mb-5">
            <Typography variant="h6" sx={{ color: '#fff' }}>Upload Document:</Typography>
            <StyledUploadButton
              component="label"
              variant="outlined"
              startIcon={<UploadFile />}
            >
              {document ? document.name : "Choose File"}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </StyledUploadButton>
          </Grid>
        <Grid container spacing={2}>
          {/* Logical Problems */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: '#fff' }}>Are you more interested in solving logical problems?</FormLabel>
              <FormControlLabel
                control={<Radio onChange={handleQuestionChange} name="logicalProblems" value="Yes" sx={{ color: '#fff' }} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio onChange={handleQuestionChange} name="logicalProblems" value="No" sx={{ color: '#fff' }} />}
                label="No"
              />
            </FormControl>
          </Grid>

          {/* Enjoy Working with Numbers */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: '#fff' }}>Do you enjoy working with numbers?</FormLabel>
              <FormControlLabel
                control={<Radio onChange={handleQuestionChange} name="enjoyNumbers" value="Yes" sx={{ color: '#fff' }} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio onChange={handleQuestionChange} name="enjoyNumbers" value="No" sx={{ color: '#fff' }} />}
                label="No"
              />
            </FormControl>
          </Grid>

          {/* Prefer Creative Activities */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ color: '#fff' }}>Do you prefer creative activities?</FormLabel>
              <FormControlLabel
                control={<Radio onChange={handleQuestionChange} name="creativeActivities" value="Yes" sx={{ color: '#fff' }} />}
                label="Yes"
              />
              <FormControlLabel
                control={<Radio onChange={handleQuestionChange} name="creativeActivities" value="No" sx={{ color: '#fff' }} />}
                label="No"
              />
            </FormControl>
          </Grid>

          {/* Aspirations and Interests */}
          <Grid item xs={12}>
  <Typography variant="h6" className="mb-3" sx={{ color: '#fff' }}>
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
      style: { color: '#808080' } // Set label color to #ff2000
    }}
  />
  <StyledTextArea
    label="What are your passions and interests?"
    name="passions"
    onChange={handleQuestionChange}
    rows={2}
    fullWidth
    variant="outlined"
    multiline
    InputLabelProps={{
      style: { color: '#808080' } // Set label color to #ff2000
    }}
  />
</Grid>

{/* Abilities and Experience */}
<Grid item xs={12}>
  <Typography variant="h6" className="mb-3" sx={{ color: '#fff' }}>
    Your Abilities and Experience
  </Typography>
  <StyledTextArea
    label="List your skills (comma-separated)"
    name="skills"
    onChange={handleQuestionChange}
    rows={2}
    fullWidth
    variant="outlined"
    multiline
    InputLabelProps={{
      style: { color: '#808080' } // Set label color to #ff2000
    }}
  />
  <StyledTextArea
    label="Describe your work experience"
    name="workExperience"
    onChange={handleQuestionChange}
    rows={3}
    fullWidth
    variant="outlined"
    multiline
    InputLabelProps={{
      style: { color: '#808080' } // Set label color to #ff2000
    }}
  />
  <StyledTextArea
    label="Educational background (degrees, certifications)"
    name="education"
    onChange={handleQuestionChange}
    rows={3}
    fullWidth
    variant="outlined"
    multiline
    InputLabelProps={{
      style: { color: '#808080' } // Set label color to #ff2000
    }}
  />
</Grid>


          {/* Document Upload */}
          
        </Grid>
        <Box display="flex" justifyContent="center" marginTop="2rem" >
          <Button variant="contained" type="submit" style={{background:"#ff2000"}}>
            Submit
          </Button>
        </Box>
      </form>
    </StyledContainer>
  );
};

export default CareerAssessment;
