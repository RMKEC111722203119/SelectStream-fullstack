import React,{useEffect} from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaChartLine,
  FaUsers,
  FaVideo,
  FaMap,
  FaRocket,
} from "react-icons/fa"; // Import additional icons
import { motion } from "framer-motion"; // Import motion
// Import Lenis


const HomePage = () => {
  const navigate = useNavigate();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Initialize Lenis for smooth scrolling
  


  return (
    <div
      className="home-page"
      style={{ backgroundColor: "#040404", minHeight: "100vh" }}
    >
      <header
        className="text-white text-center py-5"
        style={{ backgroundColor: "#040404" }}
      >
        <motion.h1
          style={{ fontSize: "3rem", fontWeight: "700" }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span style={ {fontWeight: "bold", }}>Select-Stream</span>
        </motion.h1>
        <motion.p
          className="lead"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your journey towards knowledge starts here.
        </motion.p>
        <Button
          variant="outline-light"
          onClick={() => navigate("/signup")}
          style={{ marginTop: "20px" }}
        >
          Get Started
        </Button>
      </header>

      <Container className="my-5">
        <Row className="justify-content-center">
          {/* Original Cards */}
          {[
            {
              icon: <FaBookOpen size={50} color="#007bff" />,
              title: "Explore Courses",
              text: "Discover a wide range of courses that fit your learning needs.",
              onClick: () => navigate("/courses"),
            },
            {
              icon: <FaChartLine size={50} color="#007bff" />,
              title: "Track Your Progress",
              text: "Keep track of your learning progress and achievements.",
              onClick: () => navigate("/progress"),
            },
            {
              icon: <FaUsers size={50} color="#007bff" />,
              title: "Connect with Others",
              text: "Join a community of learners and share your experiences.",
              onClick: () => navigate("/community"),
            },
          ].map((card, index) => (
            <Col md={4} className="d-flex" key={index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <Card className="mb-4 shadow-sm custom-card w-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-3">{card.icon}</div>
                    <Card.Title className="text-center">
                      {card.title}
                    </Card.Title>
                    <Card.Text className="text-center">{card.text}</Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={card.onClick}
                    >
                      {card.title}
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* New Sections */}
        <Row className="justify-content-center my-5">
          {[
            {
              icon: <FaVideo size={50} color="#007bff" />,
              title: "Optimized Video Learning",
              text: "Access carefully selected videos tailored to enhance your understanding of engineering concepts.",
              onClick: () => navigate("/videos"),
            },
            {
              icon: <FaMap size={50} color="#007bff" />,
              title: "Personalized Roadmap",
              text: "Create a customized learning roadmap to guide you through your educational journey.",
              onClick: () => navigate("/roadmap"),
            },
            {
              icon: <FaRocket size={50} color="#007bff" />,
              title: "Career Enhancement",
              text: "Enhance your career prospects with expert advice and resources tailored to your field.",
              onClick: () => navigate("/career"),
            },
          ].map((card, index) => (
            <Col md={4} className="d-flex" key={index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <Card className="mb-4 shadow-sm custom-card w-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-3">{card.icon}</div>
                    <Card.Title className="text-center">
                      {card.title}
                    </Card.Title>
                    <Card.Text className="text-center">{card.text}</Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={card.onClick}
                    >
                      {card.title}
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      <section className="text-white text-center my-5">
        <h2>What Our Users Say</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0 }}
        >
          <Alert
            variant="light"
            className="text-dark mx-auto"
            style={{ maxWidth: "600px" }}
            >
            "This platform has transformed my learning experience! The courses
            are comprehensive, and the community is supportive."
            <br /> — Happy Learner
          </Alert>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Alert
            variant="light"
            className="text-dark mx-auto"
            style={{ maxWidth: "600px" }}
          >
            "I love the progress tracking feature. It keeps me motivated!"
            <br /> — Motivated Student
          </Alert>
        </motion.div>
      </section>

      <footer className="text-white text-center py-3">
        <p>
          &copy; {new Date().getFullYear()} Select-Stream AI. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
