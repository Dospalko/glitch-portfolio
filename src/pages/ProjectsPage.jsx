import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { glitchyPageTransitionVariants } from '../utils/motionVariants';

const HEADER_HEIGHT_OFFSET = 90;

const workExperienceData = [
  { id: 1, title: "AI Developer", company: "Deutsche Telekom IT Solutions", dates: "2024 - Present", description: "Developing AI models and integrating LLMs into production applications." },
  { id: 2, title: "Full Stack Developer", company: "Smilingwords", dates: "Winter 2023/24", description: "Built web features with Flutter & Firebase alongside senior devs." },
  { id: 3, title: "Programming Teacher", company: "Algorithmics", dates: "2022/23", description: "Taught students algorithms, programming, and game design, boosting engagement." },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(3px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 0.4, ease: 'easeOut' } },
};
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};
const modalVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300 } },
};

// Scroll button
const ScrollButton = ({ nextSectionId }) => {
  const onClick = () => {
    const el = document.getElementById(nextSectionId);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-accent-glitch)] bg-[var(--color-background)]/50 backdrop-blur-sm z-20"
    >
      <FaChevronDown size={22} />
    </motion.button>
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject]);

  const workProjects     = projectsData.filter(p => p.category === 'work');
  const personalProjects = projectsData.filter(p => p.category === 'personal');
  const displayedWork    = workProjects.slice(0, 2);

  return (
    <motion.section
      id="projects-page"
      className="py-16 md:py-10 overflow-hidden"
      variants={glitchyPageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* WORK & EXPERIENCE */}
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.4}}>
          <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Work Portfolio
          </h3>
          <div className="flex flex-col md:flex-row gap-10 md:gap-12">
            {/* Recent Work */}
            <div className="w-full md:w-7/12 flex flex-col space-y-8">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)]">// Recent Works</h4>
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
                {displayedWork.map(p => (
                  <motion.div key={`work-${p.id}`} variants={itemVariants}>
                    <div onClick={()=>setSelectedProject(p)} className="cursor-pointer">
                      <ProjectCard project={p} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Career Path */}
            <div className="w-full md:w-5/12">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] mb-6">// Career Path</h4>
              <div className="relative pl-8 py-4">
                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[var(--color-accent-glitch)]/50" />
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
                  {workExperienceData.map(exp => (
                    <motion.div key={exp.id} variants={itemVariants} className="relative">
                      <div className="absolute -left-[calc(1rem+2px)] top-1 w-2 h-2 rounded-full bg-[var(--color-accent-glitch)] border-2 border-[var(--color-background)]" />
                      <p className="text-xs uppercase font-mono text-[var(--color-text-secondary)] mb-1">{exp.dates}</p>
                      <h5 className="text-lg font-bold font-mono text-[var(--color-text-primary)] mb-1">{exp.title}</h5>
                      <p className="text-sm font-mono text-[var(--color-text-secondary)] mb-2">{exp.company}</p>
                      <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/80">{exp.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
          {personalProjects.length > 0 && <ScrollButton nextSectionId="personal-projects" />}
        </motion.div>

        {/* DIVIDER */}
        {personalProjects.length > 0 && (
          <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true,amount:0.5}} transition={{duration:0.5}}
                      className="relative my-20 flex justify-center items-center">
            <motion.div className="w-full h-px bg-[var(--color-border-subtle)]"
                        animate={{x:[0,-5,5,-5,5,0],opacity:[1,0.8,1,0.8,1,1]}}
                        transition={{duration:1.5,repeat:Infinity}}/>
            <motion.span className="absolute px-4 bg-[var(--color-background)] font-mono text-sm text-[var(--color-text-secondary)] glitch-text"
                         animate={{x:[0,2,-2,2,-2,0],opacity:[1,0.85,1,0.85,1,1]}}
                         transition={{duration:1.2,repeat:Infinity}}>
              // personal_ventures //
            </motion.span>
          </motion.div>
        )}

        {/* PERSONAL PROJECTS */}
        <motion.div id="personal-projects" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.1}} transition={{duration:0.4}}>
          <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Personal Side Projects
          </h3>
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalProjects.map(p => (
              <motion.div key={`personal-${p.id}`} variants={itemVariants}>
                <div onClick={()=>setSelectedProject(p)} className="cursor-pointer">
                  <ProjectCard project={p} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[var(--color-background)] rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)]"
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
