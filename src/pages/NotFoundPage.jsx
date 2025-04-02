// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-6xl font-bold font-mono text-[var(--color-accent-glitch)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">File Not Found</h2>
      <p className="text-[var(--color-text-secondary)] mb-6">
        The resource you requested could not be located in this workspace.
      </p>
      <Link
        to="/"
        className="px-6 py-2 border border-[var(--color-text-secondary)] text-[var(--color-text-primary)] font-medium rounded hover:border-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch)] hover:bg-[var(--color-highlight-bg)] transition-colors duration-200"
      >
        Return to Home 
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;