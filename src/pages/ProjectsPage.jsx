import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard'; // Ensure this path is correct
import { projectsData } from '../data/projects'; // Ensure this path is correct
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { glitchyPageTransitionVariants } from '../utils/motionVariants'; // Ensure this path is correct

const HEADER_HEIGHT_OFFSET = 90; // Keep for ScrollButton if needed

const workExperienceData = [
    { id: 1, title: "AI Developer", company: "Deutsche Telekom IT Solutions", dates: "2024 - Present", description: "Developing AI models and integrating LLMs into production applications." },
    { id: 2, title: "Full Stack Developer", company: "Smilingwords", dates: "Winter 2023/24", description: "Built web features with Flutter & Firebase alongside senior devs." },
    { id: 3, title: "Programming Teacher", company: "Algorithmics", dates: "2022/23", description: "Taught students algorithms, programming, and game design, boosting engagement." },
];

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: 'blur(3px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0)', transition: { duration: 0.4, ease: 'easeOut' } },
};
// Modal specific variants
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } } // Added exit transition for backdrop
};
const modalContentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: "-50%" }, // Start centered vertically
    visible: {
        opacity: 1,
        scale: 1,
        y: "-50%", // Stay centered
        transition: { type: 'spring', stiffness: 300, damping: 25 }, // Spring animation
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: "-50%", // Center vertically on exit
        transition: { duration: 0.2 }
    }
};

// --- Scroll Button Component ---
const ScrollButton = ({ nextSectionId }) => {
    const onClick = () => {
        const el = document.getElementById(nextSectionId);
        if (!el) return;
        // Calculate scroll position considering potential header offset
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT_OFFSET;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    };
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-accent-glitch)] bg-[var(--color-background)]/50 backdrop-blur-sm z-20"
            aria-label={`Scroll to ${nextSectionId.replace('-', ' ')}`} // Accessibility
        >
            <FaChevronDown size={22} />
        </motion.button>
    );
};

// --- Main Projects Page Component ---
const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Effect to disable/enable body scroll when modal is open/closed
    useEffect(() => {
        const originalOverflow = document.body.style.overflow; // Store original value
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalOverflow || 'auto'; // Restore original or default
        }
        // Cleanup function to restore original overflow on unmount
        return () => { document.body.style.overflow = originalOverflow || 'auto'; };
    }, [selectedProject]);

    // --- Data Filtering ---
    const workProjects = projectsData.filter(p => p.category === 'work');
    const personalProjects = projectsData.filter(p => p.category === 'personal');
    const displayedWork = workProjects.slice(0, 2); // Display first 2 work projects initially

    // --- Handlers ---
    // SIMPLIFIED HANDLER: Just sets the selected project state
    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <motion.section
            id="projects-page"
            className="py-16 md:py-10 overflow-hidden" // Section overflow hidden is generally fine
            variants={glitchyPageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="max-w-6xl mx-auto px-4 relative"> {/* Added relative positioning */}

                {/* WORK & EXPERIENCE */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="mb-16 md:mb-20" // Added margin-bottom
                >
                    <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
                        <span className="text-[var(--color-accent-glitch)]">//</span> Work Portfolio
                    </h3>
                    <div className="flex flex-col md:flex-row gap-10 md:gap-12">
                        {/* Recent Work */}
                        <div className="w-full md:w-7/12 flex flex-col space-y-8">
                            <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)]">// Recent Works</h4>
                            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
                                {displayedWork.map(p => (
                                    <motion.div
                                        key={`work-${p.id}`}
                                        variants={itemVariants}
                                        className="cursor-pointer group" // Added group for potential hover effects on card
                                        onClick={() => handleProjectClick(p)} // Simplified onClick
                                    >
                                        <ProjectCard project={p} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        {/* Career Path */}
                        <div className="w-full md:w-5/12">
                             <h4 className="text-xl font-semibold font-mono text-[var(--color-text-secondary)] mb-6">// Career Path</h4>
                             <div className="relative pl-8 py-4">
                                 {/* Timeline line */}
                                <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-[var(--color-accent-glitch)]/50" aria-hidden="true"/> {/* Accessibility: hide decorative element */}
                                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
                                    {workExperienceData.map(exp => (
                                        <motion.div key={exp.id} variants={itemVariants} className="relative">
                                            {/* Timeline dot */}
                                            <div className="absolute -left-[calc(1rem+2px)] top-1 w-2 h-2 rounded-full bg-[var(--color-accent-glitch)] border-2 border-[var(--color-background)]" aria-hidden="true"/> {/* Accessibility: hide decorative element */}
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
                    {/* Conditionally render scroll button only if personal projects exist */}
                    {personalProjects.length > 0 && <ScrollButton nextSectionId="personal-projects" />}
                </motion.div>

                {/* DIVIDER (Only if personal projects exist) */}
                {personalProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="relative my-20 flex justify-center items-center"
                        aria-hidden="true" // Hide decorative divider from screen readers
                    >
                        <motion.div
                            className="w-full h-px bg-[var(--color-border-subtle)]"
                            animate={{ x: [0, -5, 5, -5, 5, 0], opacity: [1, 0.8, 1, 0.8, 1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }} // Changed repeatType
                        />
                        <motion.span
                            className="absolute px-4 bg-[var(--color-background)] font-mono text-sm text-[var(--color-text-secondary)] glitch-text"
                            animate={{ x: [0, 2, -2, 2, -2, 0], opacity: [1, 0.85, 1, 0.85, 1, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror' }} // Changed repeatType
                        >
                            // personal_ventures //
                        </motion.span>
                    </motion.div>
                )}

                {/* PERSONAL PROJECTS (Only if they exist) */}
                {personalProjects.length > 0 && (
                    <motion.div
                        id="personal-projects" // ID for scroll button target
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }} // Animate when scrolling into view
                        viewport={{ once: true, amount: 0.1 }} // Trigger animation once
                        transition={{ duration: 0.4 }}
                        className="pb-16 md:pb-20" // Add padding bottom for spacing
                    >
                        <h3 className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center glitch-text">
                            <span className="text-[var(--color-accent-glitch)]">//</span> Personal Side Projects
                        </h3>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show" // Use whileInView for staggered animation on scroll
                            viewport={{ once: true, amount: 0.1 }} // Adjust amount as needed
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {personalProjects.map(p => (
                                <motion.div
                                    key={`personal-${p.id}`}
                                    variants={itemVariants}
                                    className="cursor-pointer group"
                                    onClick={() => handleProjectClick(p)} // Simplified onClick
                                >
                                    <ProjectCard project={p} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </div> {/* End of max-w-6xl container */}

            {/* MODAL Implementation */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            key="backdrop"
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" // Added backdrop blur
                            variants={backdropVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit" // Use exit variant
                            onClick={handleCloseModal} // Close modal on backdrop click
                        />

                        {/* Modal Content */}
                        <motion.div
                            key="modal-content"
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 // Center positioning
                                       w-[90vw] max-w-xl // Responsive width, max width
                                       max-h-[85vh] // Max height to prevent overflow
                                       bg-[var(--color-background-alt)] // Use an alternative bg if desired
                                       border border-[var(--color-border-subtle)]
                                       rounded-lg shadow-2xl z-50 // Higher z-index
                                       overflow-hidden // Hide overflow, internal scroll handled by body
                                       flex flex-col" // Use flex column for internal layout
                            variants={modalContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit" // Use exit variant
                            // Prevent clicks inside the modal from closing it via the backdrop
                            onClick={e => e.stopPropagation()}
                            role="dialog" // Accessibility
                            aria-modal="true" // Accessibility
                            aria-labelledby="modal-title" // Accessibility
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 border-b border-[var(--color-border-subtle)] flex-shrink-0"> {/* flex-shrink-0 prevents header shrinking */}
                                <h2 id="modal-title" className="text-xl font-bold font-mono text-[var(--color-text-primary)]">
                                    {selectedProject.title}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)] p-1 rounded-full hover:bg-[var(--color-highlight-bg)] transition-colors"
                                    aria-label="Close project details"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>

                            {/* Modal Body (Scrollable) */}
                            <div className="p-6 flex-grow overflow-y-auto"> {/* flex-grow allows this area to take available space, overflow-y-auto for scroll */}
                                <img
                                    src={selectedProject.imageUrl}
                                    alt={selectedProject.title} // Keep alt text descriptive
                                    className="w-full h-auto max-h-60 object-contain mb-4 rounded" // Adjusted image styling
                                    loading="lazy" // Lazy loading for images
                                />
                                <p className="text-[var(--color-text-secondary)] mb-4 text-sm leading-relaxed">
                                    {selectedProject.description}
                                </p>
                                <div className="mb-4">
                                    <h4 className="font-mono text-sm font-semibold mb-2 text-[var(--color-text-secondary)]">// Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="inline-block bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-xs font-mono px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                             {/* Modal Footer (Links) */}
                            <div className="p-4 border-t border-[var(--color-border-subtle)] flex justify-end space-x-4 flex-shrink-0"> {/* flex-shrink-0 prevents footer shrinking */}
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium hover:underline text-[var(--color-accent-glitch)] px-3 py-1 rounded border border-transparent hover:border-[var(--color-accent-glitch)]/50 transition-colors"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {selectedProject.codeUrl && (
                                    <a
                                        href={selectedProject.codeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium hover:underline text-[var(--color-accent-glitch)] px-3 py-1 rounded border border-transparent hover:border-[var(--color-accent-glitch)]/50 transition-colors"
                                    >
                                        Source Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default ProjectsPage;