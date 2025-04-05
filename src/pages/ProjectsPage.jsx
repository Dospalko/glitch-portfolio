import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsData } from '../data/projects';
import { motion } from 'framer-motion';
import { FaChevronDown, FaBriefcase } from "react-icons/fa"; // Added FaBriefcase
import { glitchyPageTransitionVariants } from '../utils/motionVariants';

const HEADER_HEIGHT_OFFSET = 90; // Fine-tuned offset for header

// --- Dummy Work Experience Data (Replace with your actual data) ---
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
        y: [-1, -3, -1, -3, -2], x: [0, 1, -1, 1, 0],
        filter: `drop-shadow(0 0 6px var(--color-accent-glitch))`,
        transition: { y: {duration: 0.3, repeat: Infinity}, x: {duration: 0.2, repeat: Infinity}, scale: {duration: 0.2}, filter: {duration: 0.2} }
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
  const workProjects = projectsData.filter(project => project.category === "work");
  const personalProjects = projectsData.filter(project => project.category === "personal");

  // Select only the first 2 work projects for the left column
  const displayedWorkProjects = workProjects.slice(0, 2);

  return (
    <motion.section
      id="projects-page"
      className="py-16  md:py-10  w-full overflow-hidden"
      variants={glitchyPageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-6xl mx-auto px-4">

        <motion.div
          id="work-section-container" // Renamed ID for clarity
          className="mb-24 md:mb-24 flex flex-col items-center" // Main container still centers button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 mt-0 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Work Portfolio
          </motion.h3>

        

          {/* Flex container for Left (Projects) and Right (Experience) Columns */}
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-12 mb-10 w-full">
            {/* --- Left Column: Work Projects --- */}
            <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col space-y-8">
               <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] text-center md:text-left">// Recent Work</h4>
               {displayedWorkProjects.length > 0 ? (
                <motion.div
                  className="flex flex-col gap-8 md:gap-10 w-full" // Simple column layout for the two projects
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
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center md:text-left text-[var(--color-text-secondary)] font-mono"
                >
                  // No recent work projects to display.
                </motion.p>
              )}
              
            </div>

            {/* --- Right Column: Work Experience Timeline --- */}
            <div className="w-full md:w-5/12 lg:w-1/2">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] text-center md:text-left mb-6">// Career Path</h4>
              {workExperienceData.length > 0 ? (
                <div className="relative pl-8 py-4">
                  {/* Vertical Line */}
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[var(--color-accent-glitch)]/50"></div>
                   {/* Timeline Items */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="show" // Use animate for initial load
                      className="space-y-10"
                    >
                       {workExperienceData.map((exp, index) => (
                         <motion.div key={exp.id} className="relative" variants={timelineItemVariants}>
                            {/* Dot on the line */}
                             <div className="absolute -left-[calc(1rem+2px)] top-1 w-2 h-2 rounded-full bg-[var(--color-accent-glitch)] border-2 border-[var(--color-background)]"></div>
                             {/* Content */}
                             <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">{exp.dates}</p>
                             <h5 className="text-lg font-bold font-mono text-[var(--color-text-primary)] mb-1">{exp.title}</h5>
                             <p className="text-sm font-mono text-[var(--color-text-secondary)] mb-2">{exp.company}</p>
                             <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/80">{exp.description}</p>
                         </motion.div>
                      ))}
                   </motion.div>
                </div>
              ) : (
                 <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center md:text-left text-[var(--color-text-secondary)] font-mono"
                >
                  // No work experience listed yet.
                </motion.p>
              )}
            </div>
          </div>
            {/* Scroll Button positioned before the flex layout */}
            {personalProjects.length > 0 && (workProjects.length > 0 || workExperienceData.length > 0) && (
            <ScrollButton nextSectionId="personal-projects" />
          )}
        </motion.div>


       {/* Divider only shown if there are both work/exp and personal projects */}
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
              animate={{ x: [0, -5, 5, -5, 5, 0], opacity: [1, 0.8, 1, 0.8, 1, 1], }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, }}
            />
            <motion.span
              className="absolute px-4 bg-[var(--color-background)] font-mono text-sm text-[var(--color-text-secondary)] glitch-text"
              animate={{ x: [0, 2, -2, 2, -2, 0], opacity: [1, 0.85, 1, 0.85, 1, 1], }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, }}
            >
             // personal_ventures //
            </motion.span>
          </motion.div>
        )}

        {/* Personal Projects Section */}
        <motion.div
          id="personal-projects"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className={ (workProjects.length > 0 || workExperienceData.length > 0) && personalProjects.length > 0 ? "" : "mt-16" }
        >
          <motion.h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Personal Side Projects
          </motion.h3>
          {personalProjects.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {personalProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-[var(--color-text-secondary)] font-mono"
            >
              // No personal side projects available at the moment.
            </motion.p>
          )}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ProjectsPage;