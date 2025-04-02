// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import NavigationTabs from './components/NavigationTabs';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas'; // ---> Import the canvas

// Page imports...
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans relative isolate"> {/* Added relative isolate */}
       <BackgroundCanvas /> {/* ---> Add the canvas component here */}

      <NavigationTabs />

      {/* Adjust padding/margin if needed, ensure main content has background for readability if canvas is too busy */}
      <main className="flex-grow container mx-auto px-4 py-8 z-10"> {/* Ensure main is above canvas */}
         {/* Optional: Add a subtle background to main content area if needed */}
         {/* <div className="bg-[var(--color-background)]/80 backdrop-blur-sm p-4 rounded-md"> */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
               {/* Routes... */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        {/* </div> */}
      </main>

      <Footer />
    </div>
  );
}

export default App;