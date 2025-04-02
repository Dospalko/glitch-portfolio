import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects'; // Import the data
import { motion } from 'framer-motion';

const ProjectsPage = () => {
  return (
    <motion.section
      id="projects"
      className="py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // For page transitions later
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center">
        <span className="text-[var(--color-accent-glitch)]">//</span> ./Selected_Works
      </h2>

      {projectsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-text-secondary)]">
          Project details are currently being compiled... Check back soon!
        </p>
      )}
    </motion.section>
  );
};

export default ProjectsPage;