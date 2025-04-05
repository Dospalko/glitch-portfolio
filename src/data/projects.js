// src/data/projects.js
export const projectsData = [
    {
      id: 1,
      title: "FinApp",
      description: "Single page web application for tracking expenses and incomes with features like 50/30/20 rule and budgeting",
      tags: ["React", "Flask", "TailwindCSS", "SQLite", "Chart.js"],
      imageUrl: "/images/finapp.png", // Replace with actual image URL/path
      liveUrl: "#", // Replace with actual live demo URL or null
      codeUrl: "#", // Replace with actual GitHub/repo URL or null
      category: "personal", // Add category property s
    },
    {
      id: 2,
      title: "Data Science projects",
      description: "I made a lot of data science projects including data analysis, data preparation for modeling and machine learning models. I also made a few data visualization projects. Last but not least of course i trained models ",
      tags: ["Python", "Anaconda", "Jupyter", "Pandas","Matplotlib", "Scikit-learn", "Tensorflow"],
      imageUrl: "/images/data.webp",
      liveUrl: "#",
      codeUrl: "#",
      category: "personal", // Add category property s
    },
    {
      id: 3,
      title: "Annotation tool",
      description: "NER Annotation tool for Slovak language, Web application for annotating Slovak texts with named entities. It was a part of my bachelor thesis. I used it to create a dataset for Slovak language NER model.",
      tags: ["Flask", "Python", "HuggingFace", "OpenAI", "PostgreSQL", "React"],
      imageUrl: "https://via.placeholder.com/600x400/1A1A1A/EAEAEA?text=GlitchArt+Generator",
      liveUrl: "#", // Maybe the portfolio itself uses this?
      codeUrl: "#",
      category: "personal", // Add category property s
    },
    {
      id: 4,
      title: "LSTM Models",
      description: "In my work i made analysis and preparation of data for LSTM models. I also trained LSTM models for prediction. The workflow was firstly to connect a lot of tables together for one table. Then i made a lot of data preparation steps like removing outliers, filling missing values, scaling and so on. Before training i also encoded the data a with RF model picked the best predictors after that i trained LSTM models for prediction.",
      tags: ["Pandas", "Python","Keras", "Scikit-learn", "DataBricks", "Tensorflow"],
      imageUrl: "https://via.placeholder.com/600x400/1A1A1A/EAEAEA?text=GlitchArt+Generator",
      liveUrl: "#", // Maybe the portfolio itself uses this?
      codeUrl: "#",
      category: "work", // Add category property s
    },
   
     // Add more of your best projects here...
  ];