// src/RegistrationPage.jsx
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock,
  Email,
} from "@mui/icons-material";
import { auth, db } from "../../firebase.js"; // Import auth and db
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      alert("User registered successfully!");
      navigate("/selectstream");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Card
          style={{
            width: "26rem",
            padding: "2rem",
            borderRadius: "10px",
            backgroundColor: "#1f1f1f",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            className="text-center mb-5"
            style={{
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "1px",
            }}
          >
            Welcome User 🚀
          </Typography>
          {error && (
            <Typography
              variant="body2"
              className="text-center mb-3"
              style={{ color: "red" }}
            >
              {error}
            </Typography>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                className="mb-2"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle style={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#888",
                    },
                  "& .MuiInputLabel-root": {
                    color: "#aaa",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fff",
                  },
                }}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                className="mb-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email style={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#888",
                    },
                  "& .MuiInputLabel-root": {
                    color: "#aaa",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fff",
                  },
                }}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                className="mb-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock style={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        style={{ color: "#757575" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#888",
                    },
                  "& .MuiInputLabel-root": {
                    color: "#aaa",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fff",
                  },
                }}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <TextField
                fullWidth
                label="Confirm Password"
                className="mb-2"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock style={{ color: "#757575" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                        style={{ color: "#757575" }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "#2c2c2c",
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#555",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#888",
                    },
                  "& .MuiInputLabel-root": {
                    color: "#aaa",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#fff",
                  },
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                borderRadius: "5px",
                transition: "all 0.3s ease",
              }}
            >
              Sign Up
            </Button>
          </Form>
          <Typography
            variant="body2"
            className="text-center mt-3"
            style={{ color: "#aaaaaa" }}
          >
            Don’t have an account?{" "}
            <a href="/" style={{ color: "#1976d2" }}>
              Log in
            </a>
          </Typography>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
