import React from 'react';
import ProjectCard from '../components/ProjectCard'; // Ensure path is correct
import { projectsData } from '../data/projects';   // Ensure path is correct
import { motion } from 'framer-motion';
// ---> Import the glitchy variants
import { glitchyPageTransitionVariants } from '../utils/motionVariants'; // Ensure path is correct

// Stagger container variant for the grid items
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger effect delay between children
    },
  },
};

// Stagger item variant for each card
const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
};


const ProjectsPage = () => {
  return (
    // ---> This motion.section handles the transition for the *entire page*
    <motion.section
      id="projects"
      className="py-16 md:py-20" // Consistent padding
      variants={glitchyPageTransitionVariants} // Use the glitchy variants
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Page Title */}
      <motion.h2
         className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center glitch-text" // Added bottom margin
         // Simple inline motion for the title within the page transition
         initial={{ opacity: 0, y: -15 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.1, duration: 0.3 }} // Slightly delayed after page transition starts
       >
        <span className="text-[var(--color-accent-glitch)]">//</span> ./Selected_Works
        {/* Add a subtle glitch effect class if desired */}
        {/* <span className="animate-text-jitter-slight-hover">./Selected_Works</span> */}
      </motion.h2>

      {/* Project Grid */}
      {projectsData.length > 0 ? (
         // Use motion.div for the grid container to apply staggerVariants
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants} // Variants for staggering children
          initial="hidden"
          animate="show" // Trigger the animation for children
        >
          {projectsData.map((project) => (
            // Each grid item uses the itemVariants for staggered entry
            <motion.div key={project.id} variants={itemVariants}>
              {/* ProjectCard itself can still have whileInView for scroll reveal if needed, */}
              {/* but the initial stagger is handled here */}
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
         // Fallback message
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-center text-[var(--color-text-secondary)] font-mono"
         >
          // Compiling project data... System standby.
        </motion.p>
      )}
    </motion.section>
  );
};

export default ProjectsPage;