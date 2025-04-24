import React from 'react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { motion } from 'framer-motion';
import { FaChevronDown, FaBriefcase } from "react-icons/fa"; // Pridaný FaBriefcase
import { glitchyPageTransitionVariants } from '../utils/motionVariants';

// Konštanta pre offset výšky hlavičky, aby sa zabezpečilo správne scrollovanie
const HEADER_HEIGHT_OFFSET = 90;

// --- Dummy dáta pracovných skúseností (nahradiť skutočnými dátami) ---
const workExperienceData = [
  {
    id: 1,
    title: "AI Developer",
    company: "Deutsche Telekom IT Solutions",
    dates: "2024 - Present",
    description: "Developing AI models and integrating LLMs into production applications."
  },
  {
    id: 2,
    title: "Full stack developer",
    company: "Smilingwords",
    dates: "Winter 2023/24",
    description: "Assisted senior developers in building features for web platform using Flutter and cloud technologies like Firebase"
  },
  {
    id: 3,
    title: "Programming teacher",
    company: "Algorithmics",
    dates: "2022/23",
    description: "I taught several students the fundamentals of algorithms, programming, and game design. This interactive and creative approach significantly improved their understanding and engagement."
  }
];

// Komponent pre tlačidlo, ktoré scrolluje na ďalšiu sekciu
const ScrollButton = ({ nextSectionId }) => {
  const handleClick = () => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT_OFFSET;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      console.warn(`Scroll target element not found: #${nextSectionId}`);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
        y: [-1, -3, -1, -3, -2],
        x: [0, 1, -1, 1, 0],
        filter: `drop-shadow(0 0 6px var(--color-accent-glitch))`,
        transition: { y: { duration: 0.3, repeat: Infinity }, x: { duration: 0.2, repeat: Infinity }, scale: { duration: 0.2 }, filter: { duration: 0.2 } }
      }}
      whileTap={{ scale: 0.90, filter: `brightness(0.7)` }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="p-3 mb-10 md:mb-12 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-accent-glitch)] hover:border-[var(--color-accent-glitch)] z-20 backdrop-blur-sm bg-[var(--color-background)]/50"
      aria-label={`Scroll down to ${nextSectionId.replace('-', ' ')} section`}
    >
      <FaChevronDown size={22} />
    </motion.button>
  );
};

// Variants pre animácie celého kontajnera a jednotlivých položiek
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } },
};

const timelineItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  const workProjects = projectsData.filter(p => p.category === "work");
  const personalProjects = projectsData.filter(p => p.category === "personal");
  const displayedWorkProjects = workProjects.slice(0, 2);

  return (
    <motion.section
      id="projects-page"
      className="py-16 md:py-10 w-full overflow-hidden"
      variants={glitchyPageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          id="work-section-container" // Premenovaný ID pre väčšiu prehľadnosť
          className="mb-24 md:mb-24 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 mt-0 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Work Portfolio
          </motion.h3>

          {/* Flex kontajner pre ľavú (projekty) a pravú (skúsenosti) kolónu */}
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-12 mb-10 w-full">
            {/* --- Ľavá kolóna: Pracovné projekty --- */}
            <div className="w-full md:w-7/12 lg:w-1/2 mx-auto flex flex-col space-y-8">
              {/* Obrázok nad sekciou Recent Work */}
             
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] text-center md:text-left">
                // Recent Works
              </h4>
              {displayedWorkProjects.length > 0 ? (
                <motion.div
                  className="flex flex-col gap-8 md:gap-10 w-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {displayedWorkProjects.map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-center md:text-left text-[var(--color-text-secondary)] font-mono"
                >
                  // No recent work projects to display.
                </motion.p>
              )}
            </div>

            {/* --- Pravá kolóna: Timeline pracovných skúseností --- */}
            <div className="w-full md:w-5/12 lg:w-1/2">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] text-center md:text-left mb-6">
                // Career Path
              </h4>
              {workExperienceData.length > 0 ? (
                <div className="relative pl-8 py-4">
                  {/* Vertikálna čiara */}
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[var(--color-accent-glitch)]/50"></div>
                  {/* Timeline položky */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-10"
                  >
                    {workExperienceData.map((exp) => (
                      <motion.div key={exp.id} className="relative" variants={timelineItemVariants}>
                        {/* Bod na čiare */}
                        <div className="absolute -left-[calc(1rem+2px)] top-1 w-2 h-2 rounded-full bg-[var(--color-accent-glitch)] border-2 border-[var(--color-background)]"></div>
                        {/* Obsah */}
                        <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                          {exp.dates}
                        </p>
                        <h5 className="text-lg font-bold font-mono text-[var(--color-text-primary)] mb-1">
                          {exp.title}
                        </h5>
                        <p className="text-sm font-mono text-[var(--color-text-secondary)] mb-2">
                          {exp.company}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/80">
                          {exp.description}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center md:text-left text-[var(--color-text-secondary)] font-mono"
                >
                  // No work experience listed yet.
                </motion.p>
              )}
            </div>
          </div>

          {/* ScrollButton sa zobrazí, ak sú dostupné osobné projekty a aspoň jeden z pracovných projektov/skúseností */}
          {personalProjects.length > 0 && (workProjects.length > 0 || workExperienceData.length > 0) && (
            <ScrollButton nextSectionId="personal-projects" />
          )}
        </motion.div>

        {/* Oddeľovač, ktorý sa zobrazí len ak sú obidve sekcie (work/exp a personal projects) */}
        {(workProjects.length > 0 || workExperienceData.length > 0) && personalProjects.length > 0 && (
          <motion.div
            className="relative my-20 md:my-24 flex justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-px bg-[var(--color-border-subtle)]"
              animate={{ x: [0, -5, 5, -5, 5, 0], opacity: [1, 0.8, 1, 0.8, 1, 1] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.span
              className="absolute px-4 bg-[var(--color-background)] font-mono text-sm text-[var(--color-text-secondary)] glitch-text"
              animate={{ x: [0, 2, -2, 2, -2, 0], opacity: [1, 0.85, 1, 0.85, 1, 1] }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
            >
              // personal_ventures //
            </motion.span>
          </motion.div>
        )}

        {/* Sekcia osobných projektov */}
        <motion.div
          id="personal-projects"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className={(workProjects.length > 0 || workExperienceData.length > 0) && personalProjects.length > 0 ? "" : "mt-16"}
        >
          <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Personal Side Projects
          </motion.h3>
          {personalProjects.length > 0 ? (
              <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {personalProjects.map(project => (
                <motion.div key={project.id} variants={itemVariants}>
                  <div onClick={() => setSelectedProject(project)} className="cursor-pointer">
                    <ProjectCard project={project} />
                  </div>
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
        
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-[var(--color-background)] rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 relative"
              variants={modalAnim}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)]"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>

              {/* Project Details */}
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-48 object-contain mb-4"
                loading="lazy"
              />
              <h2 className="text-2xl font-bold font-mono mb-2 text-[var(--color-text-primary)]">
                {selectedProject.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap mb-4">
                {selectedProject.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-block bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-xs font-mono px-2 py-1 rounded mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline text-[var(--color-accent-glitch)]"
                  >
                    Live Demo
                  </a>
                )}
                {selectedProject.codeUrl && (
                  <a
                    href={selectedProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline text-[var(--color-accent-glitch)]"
                  >
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProjectsPage;
 