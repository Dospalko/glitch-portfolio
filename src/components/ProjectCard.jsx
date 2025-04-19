import React from 'react';
import { motion } from 'framer-motion';

// Simple tag component
const Tag = ({ text }) => (
  <span className="inline-block bg-[var(--color-highlight-bg)] text-[var(--color-text-secondary)] text-xs font-mono px-2 py-1 rounded-sm mr-2 mb-2">
    {text}
  </span>
);

const ProjectCard = ({ project }) => {
  const { title, description, tags, imageUrl, liveUrl, codeUrl } = project;

  return (
    <motion.div
      className="flex flex-col h-full w-full max-w-sm border border-[var(--color-border-subtle)] rounded-md overflow-hidden bg-[var(--color-background)]/30 hover:border-[var(--color-accent-glitch)]/50 transition-colors duration-300 group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Image with fixed height */}
      <div className="relative overflow-hidden w-full h-48 md:h-56 flex-shrink-0">
        <img
          src={imageUrl}
          alt={`Screenshot of ${title}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-image-glitch-hover"></div>
      </div>

      {/* Content area grows to fill and keep footer at bottom */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-mono mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-glitch)] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-3 flex-shrink-0">
          {description}
        </p>

        {/* Tag list with overflow hidden to maintain uniform height */}
        <div className="mb-4 flex flex-wrap overflow-hidden">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>

        {/* Footer links pinned to bottom */}
        <div className="mt-auto flex items-center space-x-4">
          {liveUrl && liveUrl !== '#' && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch-darker)] font-medium transition-colors duration-200 hover:underline"
            >
              Live Demo
            </a>
          )}
          {codeUrl && codeUrl !== '#' && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch-darker)] font-medium transition-colors duration-200 hover:underline"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
