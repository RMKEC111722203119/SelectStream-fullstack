// src/LoginPage.jsx
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
} from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Correctly import auth from firebase.js

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Login successful!");
        navigate("/selectstream");
      })
      .catch((error) => {
        alert(`Login failed: ${error.message}`);
      });
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
            width: "24rem",
            padding: "2rem",
            borderRadius: "10px",
            backgroundColor: "#1f1f1f",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            className="text-center mb-5"
            style={{
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "1px",
            }}
          >
            Login 🚀
          </Typography>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername" className="mb-3">
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                placeholder="Enter your email"
                className="mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Form.Group controlId="formPassword" className="mb-3">
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
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
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              style={{
                backgroundColor: "#1976d2",
                border: "none",
                fontWeight: "bold",
                padding: "0.75rem",
                fontSize: "16px",
                borderRadius: "8px",
              }}
            >
              Login
            </Button>
          </Form>
          <Typography
            variant="body2"
            className="text-center mt-3"
            style={{ color: "#aaaaaa" }}
          >
            Don’t have an account?{" "}
            <a href="/user-register" style={{ color: "#1976d2" }}>
              Sign up
            </a>
          </Typography>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
