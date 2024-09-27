import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// Ensure this CSS file exists

const HomePage = () => {
  return (
    <div className="home-page" style={{backgroundColor:"#040404"}}>
      <header className="text-white text-center py-5" style={{backgroundColor:"#040404"}}>
        <h1>Welcome to Our Platform</h1>
        <p className="lead">Your journey towards knowledge starts here.</p>
      </header>

      <Container className="my-5">
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm custom-card w-100">
              <Card.Img
                variant="top"
                src="course.jpg" // Replace with your image URL
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
            <Card className="mb-4 shadow-sm custom-card w-100">
              <Card.Img
                variant="top"
                src="https://www.actitime.com/wp-content/uploads/2020/12/How-to-Track-a-Projects-Progress.png" // Replace with your image URL
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
            <Card className="mb-4 shadow-sm custom-card w-100">
              <Card.Img
                variant="top"
                src="https://www.healthbyprinciple.com/cdn/shop/articles/Connection_Blog_Big.jpg?v=1562700128" // Replace with your image URL
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

      <footer className="text-white text-center py-3" >
        <p>
          &copy; {new Date().getFullYear()} Your Platform. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
