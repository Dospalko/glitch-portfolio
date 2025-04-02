// src/pages/ProjectsPage.jsx
import React from 'react';
import ProjectCard from '../components/ProjectCard'; // Ensure path is correct
import { projectsData } from '../data/projects';   // Ensure path is correct
import { motion } from 'framer-motion';
import { pageTransitionVariants } from '../utils/motionVariants'; // Ensure path is correct

const ProjectsPage = () => {
  return (
    // This motion.section handles the transition for the *entire page*
    <motion.section
      id="projects"
      className="py-16" // Standard padding
      variants={pageTransitionVariants} // Defined in utils/motionVariants.js
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h2 className="text-3xl md:text-4xl font-bold font-mono mb-10 text-center"> {/* Increased margin bottom */}
        <span className="text-[var(--color-accent-glitch)]">//</span> ./Selected_Works
      </h2>

      {projectsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"> {/* Increased gap */}
          {projectsData.map((project, index) => (
            // ProjectCard handles its own scroll-triggered animation ('whileInView')
            // Optionally add a slight stagger effect based on index for page load
            <motion.div
               key={project.id}
               // Example stagger effect: delay based on index *within the page load*
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: index * 0.05 }} // Short delay per card
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-text-secondary)]">
          // No projects found or still loading...
        </p>
      )}
    </motion.section>
  );
};

export default ProjectsPage;