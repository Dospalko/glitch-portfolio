import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { FaChevronDown, FaBriefcase, FaTimes } from 'react-icons/fa';
import { glitchyPageTransitionVariants } from '../utils/motionVariants';

// Offset for header height when scrolling
const HEADER_HEIGHT_OFFSET = 90;

// Dummy work experience data
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
    description: "Assisted senior developers in building features for web platform using Flutter and cloud technologies like Firebase."
  },
  {
    id: 3,
    title: "Programming teacher",
    company: "Algorithmics",
    dates: "2022/23",
    description: "Taught fundamentals of algorithms, programming, and game design—boosting student engagement and understanding."
  }
];

// Scroll-to-next-section button
const ScrollButton = ({ nextSectionId }) => {
  const handleClick = () => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      const top = nextSection.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
        y: [-1, -3, -1, -3, -2],
        x: [0, 1, -1, 1, 0],
        filter: 'drop-shadow(0 0 6px var(--color-accent-glitch))',
        transition: { y: { duration: 0.3, repeat: Infinity }, x: { duration: 0.2, repeat: Infinity } }
      }}
      whileTap={{ scale: 0.9, filter: 'brightness(0.7)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-accent-glitch)] bg-[var(--color-background)]/50 backdrop-blur-sm z-20"
      aria-label={`Scroll to ${nextSectionId}`}
    >
      <FaChevronDown size={22} />
    </motion.button>
  );
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(3px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 0.4, ease: 'easeOut' } },
};
const timelineItemVariants = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// Modal animations
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 }
};
const modalVariants = {
  hidden:  { y: '-10%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { type: 'spring', stiffness: 300 } }
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const closeModal = () => setSelectedProject(null);

  // Separate work and personal projects
  const workProjects = projectsData.filter(p => p.category === 'work');
  const personalProjects = projectsData.filter(p => p.category === 'personal');
  const displayedWorkProjects = workProjects.slice(0, 2);

  return (
    <motion.section
      id="projects-page"
      className="py-16 md:py-10 overflow-hidden w-full"
      variants={glitchyPageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* WORK + EXPERIENCE */}
        <motion.div
          className="mb-24 flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Work Portfolio
          </motion.h3>

          <div className="flex flex-col md:flex-row gap-10 md:gap-12 w-full">
            {/* Recent Work */}
            <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col space-y-8">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)]">
                // Recent Works
              </h4>
              {displayedWorkProjects.length > 0 ? (
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
                  {displayedWorkProjects.map(project => (
                    <motion.div key={project.id} variants={itemVariants}>
                      <div onClick={() => setSelectedProject(project)} className="cursor-pointer">
                        <ProjectCard project={project} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-[var(--color-text-secondary)] font-mono">No recent work projects.</p>
              )}
            </div>

            {/* Career Path */}
            <div className="w-full md:w-5/12 lg:w-1/2">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] mb-6">
                // Career Path
              </h4>
              {workExperienceData.length > 0 ? (
                <div className="relative pl-8 py-4">
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[var(--color-accent-glitch)]/50"></div>
                  <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
                    {workExperienceData.map(exp => (
                      <motion.div key={exp.id} variants={timelineItemVariants} className="relative">
                        <div className="absolute -left-[calc(1rem+2px)] top-1 w-2 h-2 rounded-full bg-[var(--color-accent-glitch)] border-2 border-[var(--color-background)]"></div>
                        <p className="text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">{exp.dates}</p>
                        <h5 className="text-lg font-bold font-mono text-[var(--color-text-primary)] mb-1">{exp.title}</h5>
                        <p className="text-sm font-mono text-[var(--color-text-secondary)] mb-2">{exp.company}</p>
                        <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/80">{exp.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ) : (
                <p className="text-[var(--color-text-secondary)] font-mono">No work experience listed.</p>
              )}
            </div>
          </div>

          {(personalProjects.length > 0) && (
            <ScrollButton nextSectionId="personal-projects" />
          )}
        </motion.div>

        {/* DIVIDER */}
        {(workProjects.length || workExperienceData.length) && personalProjects.length && (
          <motion.div
            className="relative my-20 flex justify-center items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-px bg-[var(--color-border-subtle)]"
              animate={{ x: [0, -5, 5, -5, 5, 0], opacity: [1,0.8,1,0.8,1,1] }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.span
              className="absolute px-4 bg-[var(--color-background)] font-mono text-sm text-[var(--color-text-secondary)] glitch-text"
              animate={{ x: [0,2,-2,2,-2,0], opacity: [1,0.85,1,0.85,1,1] }}
              transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
            >
              // personal_ventures //
            </motion.span>
          </motion.div>
        )}

        {/* PERSONAL PROJECTS */}
        <motion.div
          id="personal-projects"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Personal Side Projects
          </motion.h3>
          {personalProjects.length > 0 ? (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalProjects.map(project => (
                <motion.div key={project.id} variants={itemVariants}>
                  <div onClick={() => setSelectedProject(project)} className="cursor-pointer">
                    <ProjectCard project={project} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-center text-[var(--color-text-secondary)] font-mono">
              No personal side projects available.
            </p>
          )}
        </motion.div>
      </div>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-[var(--color-background)] rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 relative"
              variants={modalVariants}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)]"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-48 object-contain mb-4"
                loading="lazy"
              />
              <h2 className="text-2xl font-bold font-mono mb-2 text-[var(--color-text-primary)]">
                {selectedProject.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                {selectedProject.description}
              </p>
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
