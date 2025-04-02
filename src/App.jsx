// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence

// import Header from './components/Header'; // Remove old Header import
import NavigationTabs from './components/NavigationTabs'; // Import new NavigationTabs
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage'; // Import a 404 page (create below)

function App() {
  const location = useLocation(); // Get current location for AnimatePresence

  return (
    <div className="min-h-screen flex flex-col font-sans"> {/* Ensure base font is applied */}
      {/* <Header /> */} {/* Remove old Header */}
      <NavigationTabs /> {/* Use new Tabs */}

      {/* Use container within main for padding, adjust as needed */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* AnimatePresence is needed for exit animations on Route change */}
        <AnimatePresence mode="wait"> {/* 'wait' ensures previous page exits before new one enters */}
          <Routes location={location} key={location.pathname}> {/* Pass location and key */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Catch-all 404 route */}
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;