"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "../components/ProjectCard" // Ensure this path is correct
import { projectsData } from "../data/projects" // Ensure this path is correct
import { FaChevronDown, FaTimes } from "react-icons/fa"
import { glitchyPageTransitionVariants } from "../utils/motionVariants" // Ensure this path is correct

const HEADER_HEIGHT_OFFSET = 90 // Keep for ScrollButton if needed

const workExperienceData = [
  {
    id: 1,
    title: "AI Developer",
    company: "Deutsche Telekom IT Solutions",
    dates: "2024 - Present",
    description: "Developing AI models and integrating LLMs into production applications.",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Smilingwords",
    dates: "Winter 2023/24",
    description: "Built web features with Flutter & Firebase alongside senior devs.",
  },
  {
    id: 3,
    title: "Programming Teacher",
    company: "Algorithmics",
    dates: "2022/23",
    description: "Taught students algorithms, programming, and game design, boosting engagement.",
  },
]

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 0.4, ease: "easeOut" } },
}
// Modal specific variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } }, // Slight delay on exit? Optional.
}
const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
}

// Add new variants for project content transitions
const projectContentVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  }),
}

// --- Scroll Button Component ---
const ScrollButton = ({ nextSectionId }) => {
  const onClick = () => {
    const el = document.getElementById(nextSectionId)
    if (!el) return
    const elementPosition = el.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT_OFFSET
    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
  }
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-accent-glitch)] bg-[var(--color-background)]/50 backdrop-blur-sm z-20"
      aria-label={`Scroll to ${nextSectionId.replace("-", " ")}`}
    >
      <FaChevronDown size={22} />
    </motion.button>
  )
}

// --- Main Projects Page Component ---
const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [direction, setDirection] = useState(0)
  const [allProjects, setAllProjects] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Effect to combine all projects and set them in state
  useEffect(() => {
    const workProjects = projectsData.filter((p) => p.category === "work")
    const personalProjects = projectsData.filter((p) => p.category === "personal")
    setAllProjects([...workProjects, ...personalProjects])
  }, [])

  // Effect to disable/enable body scroll when modal is open/closed
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = originalOverflow || "auto"
    }
    return () => {
      document.body.style.overflow = originalOverflow || "auto"
    }
  }, [selectedProject])

  // --- Data Filtering ---
  const workProjects = projectsData.filter((p) => p.category === "work")
  const personalProjects = projectsData.filter((p) => p.category === "personal")
  const displayedWork = workProjects.slice(0, 2)

  // --- Handlers ---
  const handleProjectClick = (project) => {
    // Find the index of the clicked project in the combined array
    const projectIndex = allProjects.findIndex((p) => p.id === project.id)
    setCurrentIndex(projectIndex)

    // Immediately show the modal without scrolling
    setSelectedProject(project)

    // Disable body scroll
    document.body.style.overflow = "hidden"
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    // Explicitly ensure scrolling is re-enabled immediately on close
    document.body.style.overflow = "auto"
  }

  // Function to navigate to the next project
  const handleNextProject = () => {
    if (currentIndex < allProjects.length - 1) {
      setDirection(1)
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setSelectedProject(allProjects[nextIndex])
    }
  }

  // Function to navigate to the previous project
  const handlePrevProject = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setSelectedProject(allProjects[prevIndex])
    }
  }

  return (
    <motion.section
      id="projects-page"
      className="py-16 md:py-10 overflow-hidden"
      variants={glitchyPageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* WORK & EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-16 md:mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
            <span className="text-[var(--color-accent-glitch)]">//</span> Work Portfolio
          </h3>
          <div className="flex flex-col md:flex-row gap-10 md:gap-12">
            {/* Recent Work */}
            <div className="w-full md:w-7/12 flex flex-col space-y-8">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)]">// Recent Works</h4>
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
                {displayedWork.map((p) => (
                  <motion.div
                    key={`work-${p.id}`}
                    variants={itemVariants}
                    className="cursor-pointer group"
                    onClick={() => handleProjectClick(p)}
                  >
                    <ProjectCard project={p} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            {/* Career Path */}
            <div className="w-full md:w-5/12">
              <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] mb-6">
                // Career Path
              </h4>
              <div className="relative pl-8 py-4">
                <div
                  className="absolute top-0 bottom-0 left-0 w-0.5 bg-[var(--color-accent-glitch)]/50"
                  aria-hidden="true"
                />
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
                  {workExperienceData.map((exp) => (
                    <motion.div key={exp.id} variants={itemVariants} className="relative">
                      <div
                        className="absolute -left-[calc(1rem+2px)] top-1 w-2 h-2 rounded-full bg-[var(--color-accent-glitch)] border-2 border-[var(--color-background)]"
                        aria-hidden="true"
                      />
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="relative my-20 flex justify-center items-center"
            aria-hidden="true"
          >
            <motion.div
              className="w-full h-px bg-[var(--color-border-subtle)]"
              animate={{ x: [0, -5, 5, -5, 5, 0], opacity: [1, 0.8, 1, 0.8, 1, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
            />
            <motion.span
              className="absolute px-4 bg-[var(--color-background)] font-mono text-sm text-[var(--color-text-secondary)] glitch-text"
              animate={{ x: [0, 2, -2, 2, -2, 0], opacity: [1, 0.85, 1, 0.85, 1, 1] }}
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
            >
              // personal_ventures //
            </motion.span>
          </motion.div>
        )}

        {/* PERSONAL PROJECTS */}
        {personalProjects.length > 0 && (
          <motion.div
            id="personal-projects"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="pb-16 md:pb-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
              <span className="text-[var(--color-accent-glitch)]">//</span> Personal Side Projects
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {personalProjects.map((p) => (
                <motion.div
                  key={`personal-${p.id}`}
                  variants={itemVariants}
                  className="cursor-pointer group"
                  onClick={() => handleProjectClick(p)}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>{" "}
      {/* End of max-w-6xl container */}
      {/* MODAL Implementation */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <motion.div
              key="modal-content"
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[90vw] max-w-xl max-h-[85vh]
                bg-[var(--color-background-alt)]
                border border-[var(--color-border-subtle)]
                rounded-lg shadow-2xl z-50
                overflow-hidden flex flex-col"
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              style={{
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.3), 0 0 10px var(--color-accent-glitch)",
              }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-5 border-b border-[var(--color-border-subtle)] flex-shrink-0 bg-[var(--color-background)]/80 backdrop-blur-sm">
                <h2
                  id="modal-title"
                  className="text-xl font-bold font-mono text-[var(--color-text-primary)] flex items-center"
                >
                  <span className="text-[var(--color-accent-glitch)] mr-2">//</span>
                  {selectedProject.title}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)] p-2 rounded-full hover:bg-[var(--color-highlight-bg)] transition-colors"
                  aria-label="Close project details"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 flex-grow overflow-y-auto custom-scrollbar" style={{ maxHeight: "60vh" }}>
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={selectedProject.id}
                    custom={direction}
                    variants={projectContentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex flex-col"
                  >
                    <div className="bg-black/20 rounded-lg p-2 mb-6">
                      <img
                        src={selectedProject.imageUrl || "/placeholder.svg"}
                        alt={selectedProject.title}
                        className="w-full h-auto max-h-72 object-contain rounded"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[var(--color-text-secondary)] mb-6 text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-mono text-sm font-semibold mb-3 text-[var(--color-text-secondary)] flex items-center">
                        <span className="text-[var(--color-accent-glitch)] mr-2">//</span> Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-xs font-mono px-3 py-1.5 rounded-md hover:border-[var(--color-accent-glitch)]/50 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Modal Footer (Links and Navigation) */}
              <div className="p-5 border-t border-[var(--color-border-subtle)] flex justify-between items-center flex-shrink-0 bg-[var(--color-background)]/80 backdrop-blur-sm">
                {/* Project Navigation */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePrevProject}
                    disabled={currentIndex <= 0}
                    className={`p-2 rounded-full ${
                      currentIndex <= 0
                        ? "text-[var(--color-text-secondary)]/30 cursor-not-allowed"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)] hover:bg-[var(--color-highlight-bg)]"
                    } transition-colors`}
                    aria-label="Previous project"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {currentIndex + 1} / {allProjects.length}
                  </span>
                  <button
                    onClick={handleNextProject}
                    disabled={currentIndex >= allProjects.length - 1}
                    className={`p-2 rounded-full ${
                      currentIndex >= allProjects.length - 1
                        ? "text-[var(--color-text-secondary)]/30 cursor-not-allowed"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)] hover:bg-[var(--color-highlight-bg)]"
                    } transition-colors`}
                    aria-label="Next project"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium px-4 py-2 rounded-md bg-[var(--color-accent-glitch)]/10 border border-[var(--color-accent-glitch)]/30 text-[var(--color-accent-glitch)] hover:bg-[var(--color-accent-glitch)]/20 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {selectedProject.codeUrl && (
                    <a
                      href={selectedProject.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium px-4 py-2 rounded-md bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-glitch)]/50 transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

{
  /* Add custom scrollbar styles */
}
;<style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: var(--color-background);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: var(--color-border-subtle);
        border-radius: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-accent-glitch);
    }
`}</style>

export default ProjectsPage
