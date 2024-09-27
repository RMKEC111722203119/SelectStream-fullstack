// utils/roadmaps.js

// Searchable roadmaps based on tech stacks
const searchableRoadmaps = {
  "Frontend Development": [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Redux",
    "CSS Frameworks (Bootstrap, Tailwind)",
  ],
  "Backend Development": [
    "Node.js",
    "Express.js",
    "MongoDB",
    "RESTful APIs",
    "Authentication (JWT)",
  ],
  "Full Stack Development": [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
  ],
};

// Predefined roadmaps for specific fields
const predefinedRoadmaps = [
  {
    title: "Deep Learning Roadmap",
    author_name: "Deep Learning Expert",
    author_desc: "A comprehensive guide to mastering Deep Learning.",
    article_desc:
      "Structured roadmap covering essential aspects of Deep Learning.",
    content: `
    ## Deep Learning Roadmap
    1. *Learn Python and Libraries*: NumPy, pandas, matplotlib
    2. *Learn Neural Networks Basics*: Perceptrons, activation functions, and backpropagation
    3. *Deep Learning Frameworks*: TensorFlow, PyTorch
    4. *Practice Projects*: Implement CNN, RNN, GANs
    5. *Specialize*: Explore Transfer Learning, NLP, and reinforcement learning
    `,
  },
  {
    title: "Semiconductor Roadmap",
    author_name: "Semiconductor Specialist",
    author_desc:
      "Explore the fundamentals and advancements in semiconductor technology.",
    article_desc:
      "An insightful roadmap for understanding semiconductor technologies.",
    content: `
    ## Semiconductor Roadmap
    1. *Physics of Semiconductors*: Band theory, p-n junctions
    2. *Device Fundamentals*: Diodes, transistors (MOSFET, BJT)
    3. *Fabrication Process*: Cleanroom technology, photolithography
    4. *Advanced Topics*: SOI, FinFETs, quantum computing technologies
    `,
  },
  {
    title: "GATE Exam Roadmap",
    author_name: "GATE Exam Expert",
    author_desc: "Comprehensive guide to excel in the GATE exam.",
    article_desc: "Effective strategies for GATE exam preparation. ",
    content: `
    ## GATE Exam Roadmap
    1. *Understand Exam Syllabus*: Be thorough with the subject-wise syllabus
    2. *Basic Concepts*: Strengthen fundamental topics in Engineering Mathematics and Core subjects
    3. *Practice Previous Papers*: Solve at least 10 years of previous GATE papers
    4. *Mock Tests*: Take timed tests regularly
    `,
  },
];

export { searchableRoadmaps, predefinedRoadmaps };
