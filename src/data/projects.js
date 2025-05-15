// src/data/projects.js
export const projectsData = [
  {
    id: 1,
    title: "Personal Finance Tracker",
    description:
      "Single-page web application for tracking income and expenses. Features include dynamic budgeting with automatic creation (defaults to €100), 50/30/20 rule visualization, and a weekly snapshot report. Built with React, Flask, and TailwindCSS.",
    tags: [
      "React",
      "Flask",
      "Python",
      "JavaScript",
      "TailwindCSS",
      "SQLite",
      "Flask-CORS",
      "Framer Motion",
      "JWT",
      "REST API",
    
    ],
    imageUrl: "/images/finapp.png", // Nahraď skutočnou cestou/URL
    liveUrl: null, // Nahraď URL nasadenej aplikácie, ak existuje
    codeUrl: "https://github.com/Dospalko/FinApp", // Nahraď URL tvojho repozitára
    category: "personal", // Alebo "Finance", "Personal Project"
  },
  {
    id: 5,
    title: "GitViZ",
    description:
      "Interactive GitHub profile visualization tool that provides insights into user activity, language usage, and repository statistics. Features include contribution heatmaps, language breakdown charts, and detailed repository analytics.",
    tags: [
      "Next.js",
      "TypeScript",
      "GitHub API",
      "Recharts",
      "Tailwind CSS",
      "Framer Motion",
    ],
    imageUrl: "/images/gitviz.png",
    liveUrl: "https://gitviz.vercel.app",
    codeUrl: "https://github.com/Dospalko/GitGet",
    category: "personal",
  },
  {
    id: 3,
    title: "PyScrum - Python Scrum",
    description:
      "A powerful command-line interface for managing sprints and tasks with features like priority tagging, due dates, status tracking, reports in CSV/HTML, and backlog/sprint workflows. Built with Python and Typer, using SQLite for persistence. Includes automated testing with Pytest.",
    tags: [
      "Python",
      "Typer",
      "SQLite",
      "CLI",
      "TDD",
      "Pytest",
      "OOP",
      "Sprint Management",
      "Task Management",
      "Reporting",
    ],
    imageUrl: "/images/pyscrum.png",
    codeUrl: "https://github.com/Dospalko/PyScrum", // Nahraď URL tvojho repozitára
    category: "personal",
  },
  {
    id: 6,
    title: "Annotation tool",
    description:
      "NER Annotation tool for Slovak language, Web application for annotating Slovak texts with named entities. It was a part of my bachelor thesis. I used it to create a dataset for Slovak language NER model.",
    tags: ["Flask", "Python", "HuggingFace", "OpenAI", "PostgreSQL", "React"],
    imageUrl:
      "/images/ner.png",
    liveUrl: "#", // Maybe the portfolio itself uses this?
    codeUrl: "#",
    category: "personal", // Add category property s
  },
  {
    id: 2,
    title: "Data Science projects",
    description:
      "I made a lot of data science projects including data analysis, data preparation for modeling and machine learning models. I also made a few data visualization projects. Last but not least of course i trained models ",
    tags: [
      "Python",
      "Anaconda",
      "Jupyter",
      "Pandas",
      "Matplotlib",
      "Scikit-learn",
    ],
    imageUrl: "/images/data.webp",
    liveUrl: "#",
    codeUrl: "#",
    category: "personal", // Add category property s
  },
  
  {
    id: 4,
    title: "LSTM Models",
    description:
      "In my work i made analysis and preparation of data for LSTM models. I also trained LSTM models for prediction. The workflow was firstly to connect a lot of tables together for one table. Then i made a lot of data preparation steps like removing outliers, filling missing values, scaling and so on. Before training i also encoded the data a with RF model picked the best predictors after that i trained LSTM models for prediction.",
    tags: [
      "Pandas",
      "Python",
      "Keras",
      "Scikit-learn",
      "DataBricks",
      "Tensorflow",
    ],
    imageUrl:
      "/images/lstm.png",
    liveUrl: "#", // Maybe the portfolio itself uses this?
    codeUrl: "#",
    category: "work", // Add category property s
  },
  {
    "id": 5, // Assuming this is the next ID in your portfolio
    "title": "ColorBuddy AI Palette Generator",
    "description": "ColorBuddy is an intelligent web application designed to streamline the color palette creation process for designers and developers. Users can either upload an image to extract its dominant colors or leverage an AI-powered 'Inspire Me' feature to generate unique, aesthetically pleasing palettes. Key functionalities include automatic WCAG 2.1 contrast checking between palette colors to ensure accessibility, and instant export of palettes as ready-to-use Tailwind CSS configurations or standard CSS custom properties. The goal is to bridge the gap between color inspiration and practical implementation, making palette selection fast, accessible, and code-ready.",
    "tags": [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
    ],
    "imageUrl": "/images/colorbud.png", // You'll need to create a compelling preview image
    "liveUrl": "https://your-colorbuddy-live-url.com", // Replace with actual live URL when deployed
    "codeUrl": "https://github.com/your-username/colorbuddy-repo", // Replace with your GitHub repo URL
    "category": "personal" // Or "full-stack" / "web-application"
  },
  {
    "id": 6, // Or the next available ID in your portfolio
    "title": "MoodTunes - AI-Powered Music Discovery",
    "description": "MoodTunes is an innovative web application that transforms your current feelings into a personalized music experience. Users describe their mood or vibe in natural language, and an AI (powered by OpenAI's GPT models) analyzes the sentiment and context. Based on this analysis, MoodTunes dynamically curates a playlist of suggested songs intended to match or complement the user's emotional state. The interface provides a seamless, full-screen experience with visual feedback and allows users to explore new music by linking out to search for the suggested tracks.",
    "tags": [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "OpenAI API",
      "AI",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "imageUrl": "/images/moodtunes_preview.png", // Create an engaging preview image (e.g., screenshot of the app with a cool playlist)
    "liveUrl": "https://your-moodtunes-live-url.com", // Replace with your actual deployed URL
    "codeUrl": "https://github.com/your-username/moodtunes-repo", // Replace with your GitHub repository URL
    "category": "personal" // Or "personal" / "ai-application" / "web-application"
  }
  
];
