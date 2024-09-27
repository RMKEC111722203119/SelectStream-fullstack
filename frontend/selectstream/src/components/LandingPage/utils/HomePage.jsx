import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./HomePage.css"; // Ensure this CSS file exists

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="bg-dark text-white text-center py-5">
        <h1>Welcome to Our Platform</h1>
        <p className="lead">Your journey towards knowledge starts here.</p>
      </header>

      <Container className="my-5">
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm custom-card">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x150" // Replace with your image URL
                className="card-image"
              />
              <Card.Body>
                <Card.Title>Explore Courses</Card.Title>
                <Card.Text>
                  Discover a wide range of courses that fit your learning needs.
                </Card.Text>
                <Button variant="primary" className="custom-button">
                  Browse Courses
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm custom-card">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x150" // Replace with your image URL
                className="card-image"
              />
              <Card.Body>
                <Card.Title>Track Your Progress</Card.Title>
                <Card.Text>
                  Keep track of your learning progress and achievements.
                </Card.Text>
                <Button variant="primary" className="custom-button">
                  View Progress
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm custom-card">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300x150" // Replace with your image URL
                className="card-image"
              />
              <Card.Body>
                <Card.Title>Connect with Others</Card.Title>
                <Card.Text>
                  Join a community of learners and share your experiences.
                </Card.Text>
                <Button variant="primary" className="custom-button">
                  Join Community
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-white text-center py-3">
        <p>
          &copy; {new Date().getFullYear()} Your Platform. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
