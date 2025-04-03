import React from 'react';
import ProjectCard from '../components/ProjectCard'; // Uistite sa, že cesta je správna
import { projectsData } from '../data/projects';   // Uistite sa, že cesta je správna
import { motion } from 'framer-motion';
// ---> Import glitchy variants
import { glitchyPageTransitionVariants } from '../utils/motionVariants'; // Uistite sa, že cesta je správna

// Stagger container variant pre grid položky
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // oneskorenie medzi položkami
    },
  },
};

// Stagger item variant pre každú kartu
const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
};

const ProjectsPage = () => {
  // Filtrovanie projektov podľa kategórie – pridaj property "category" do projektovData
  const workProjects = projectsData.filter(project => project.category === "work");
  const personalProjects = projectsData.filter(project => project.category === "personal");

  return (
    <motion.section
      id="projects"
      className="py-16 md:py-20" // Konzistentné odsadenie
      variants={glitchyPageTransitionVariants} // Glitch varianty pre prechod celej stránky
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hlavný nadpis stránky */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold font-mono mb-12 text-center glitch-text"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span className="text-[var(--color-accent-glitch)]">//</span> ./Selected_Works
      </motion.h2>

      {/* Sekcia pracovných projektov */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-16"
      >
        <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
          <span className="text-[var(--color-accent-glitch)]">//</span> Work Projects
        </motion.h3>
        {workProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {workProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[var(--color-text-secondary)] font-mono"
          >
            // No work projects available at the moment.
          </motion.p>
        )}
      </motion.div>

     {/* Cool Glitch Divider */}
<motion.div
  className="relative my-16 flex justify-center items-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {/* Animated line */}
  <motion.div
    className="w-full h-px bg-[var(--color-border-subtle)]"
    animate={{
      x: [0, -5, 5, -5, 5, 0],
      opacity: [1, 0.8, 1, 0.8, 1, 1],
    }}
    transition={{
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  />
  {/* Animated glitch text */}
  <motion.span
    className="absolute px-4 bg-[var(--color-background)] font-mono text-sm text-[var(--color-text-secondary)]"
    animate={{
      x: [0, 5, -5, 5, -5, 0],
      opacity: [1, 0.7, 1, 0.7, 1, 1],
    }}
    transition={{
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    }}
  >
   ....
  </motion.span>
</motion.div>


      {/* Sekcia osobných side projektov */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-16"
      >
        <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
          <span className="text-[var(--color-accent-glitch)]">//</span> Personal Side Projects
        </motion.h3>
        {personalProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {personalProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[var(--color-text-secondary)] font-mono"
          >
            // No personal side projects available at the moment.
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ProjectsPage;
