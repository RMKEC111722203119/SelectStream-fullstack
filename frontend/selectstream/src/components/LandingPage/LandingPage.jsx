import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Home, School, Settings as SettingsIcon } from "@mui/icons-material";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Roadmap from "./utils/Roadmap";


import HomePage from "./utils/HomePage";
import QuickLearn from "./utils/QuickLearn";
const LandingPage = () => {
  const [activeComponent, setActiveComponent] = useState("Home");
const navigate = useNavigate();
  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <HomePage/>;
      case "selectstream":
        return <QuickLearn/>;
      case "Roadmap":
        return <Roadmap />
      case "Settings":
        return <h1 style={{ color: "#fff" }}>Settings</h1>;
      default:
        return <h1 style={{ color: "#fff" }}>Welcome to the Home Page</h1>;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="sidebar text-white " style={{backgroundColor:"#040404"}}>
          <Nav className="flex-column mt-3">
            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("Home")}
            >
              <Home /> <span className="ms-2">Home</span>
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("selectstream")}
            >
              <School /> <span className="ms-2">Select-Stream AI</span>
            </Nav.Link>
            <Nav.Link
  className="text-white"
  onClick={() => setActiveComponent("Roadmap")}
>
  <span className="ms-2">Roadmap</span>
</Nav.Link>

            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("Settings")}
            >
              <SettingsIcon /> <span className="ms-2">Settings </span>
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => {
                navigate("/");
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Col>
        <Col md={9} className="main-content" style={{backgroundColor:"#040404"}}>
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
