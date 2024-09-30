// LandingPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import {
  Home,
  Map,
  School,
  Settings as SettingsIcon,
  Logout,
  GroupOutlined,
  VideoCall,
  AirRounded,
} from "@mui/icons-material"; // Import new icons
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Roadmap from "./utils/Roadmap";
import HomePage from "./utils/HomePage";
import QuickLearn from "./utils/QuickLearn";
import Groups from "./utils/Groups"; 
import CareerAssessment from "./utils/CareerAssessment";
import FuturePrediction from "./utils/FuturePrediction";


const LandingPage = () => {
  const [activeComponent, setActiveComponent] = useState("Home");
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <HomePage />;
      case "selectstream":
        return <QuickLearn />;
      case "Roadmap":
        return <Roadmap />;
      case "Groups":
        return <Groups />;
      case "CareerAssessment":
        return <CareerAssessment />;
      case "futurePrediction":
        return <FuturePrediction />;
      case "Settings":
        return <h1 style={{ color: "#fff" }}>Settings</h1>;
      default:
        return <h1 style={{ color: "#fff" }}>Welcome to the Home Page</h1>;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col
          md={3}
          className="sidebar text-white"
          style={{ backgroundColor: "#040404" }}
        >
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
              <VideoCall /> <span className="ms-2">QuickLearn</span>
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("Roadmap")}
            >
              <Map /> <span className="ms-2">Personalized Roadmap</span>
            </Nav.Link>

            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("Groups")} // Link to Groups
            >
              <GroupOutlined /> <span className="ms-2">Group</span>
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("CareerAssessment")} // Link to Career Assessment
            >
              <School /> <span className="ms-2">Career Assessment</span>
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("futurePrediction")} // Link to Career Assessment
            >
              <AirRounded /> <span className="ms-2">Future Prediction</span>
            </Nav.Link>
            <Nav.Link
              className="text-white"
              onClick={() => setActiveComponent("Settings")}
            >
              <SettingsIcon /> <span className="ms-2">Settings</span>
            </Nav.Link>
            <Nav.Link
              className="text-white mt-auto"
              onClick={() => {
                navigate("/");
              }}
            >
              <Logout /> <span className="ms-2">Logout</span>
            </Nav.Link>
          </Nav>
        </Col>
        <Col
          md={9}
          className="main-content"
          style={{ backgroundColor: "#040404" }}
        >
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
