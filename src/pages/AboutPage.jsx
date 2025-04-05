import React from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

// Assuming glitchyPageTransitionVariants is defined correctly elsewhere
import { glitchyPageTransitionVariants } from "../utils/motionVariants";

const ScrollButton = ({ nextSectionId }) => {
  const handleClick = () => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Scroll target element not found: #${nextSectionId}`);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
        y: [-1, -3, -1, -3, -2], // Add vertical jitter
        x: [0, 1, -1, 1, 0], // Add horizontal jitter
        filter: `drop-shadow(0 0 6px var(--color-accent-glitch))`, // Glow
        transition: { y: {duration: 0.3, repeat: Infinity}, x: {duration: 0.2, repeat: Infinity}, scale: {duration: 0.2}, filter: {duration: 0.2} }
      }}
      whileTap={{ scale: 0.90, filter: `brightness(0.7)` }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }} // Default transition for non-hover states
      className="p-3 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-accent-glitch)] hover:border-[var(--color-accent-glitch)] z-20 backdrop-blur-sm bg-[var(--color-background)]/50"
      aria-label={`Scroll down to ${nextSectionId} section`}
    >
      <FaChevronDown size={22} />
    </motion.button>
  );
};


const skills = {
  frontend: ["React", "JavaScript", "Tailwind CSS", "HTML, CSS", "TypeScript", "Framer Motion"],
  backend: [
    "Python",
    "Flask",
    "REST APIs",
    "FastAPI",
    "PostgreSQL",
    "SQLite",
    "HuggingFace Transformers",
    "OpenAI API",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "LangChain",
    "SQLAlchemy"
  ],
  tools: ["Git", "Docker", "Vite", "Webpack", "Figma", "Linux/CLI", "Communication", "Problem Solving"],
};

const achievements = [
  {
    id: 1,
    icon: null,
    title: "Erste Hackathon",
    description:
      "Participated in the Erste Hackathon, where my team developed an innovative expenditure prediction tool using financial data analysis. Focused on backend logic and data processing.",
    image: "/images/erste.png",
  },
  {
    id: 2,
    icon: null,
    title: "Telekom Hackathon Winner",
    description:
      "Secured 2nd place overall and 1st in our category at the Telekom Hackathon. We built an RFP summarizer leveraging web scraping, text extraction (NLP), and scoring algorithms.",
    image: "/images/hackwin.png",
  },
  {
    id: 3,
    icon: null,
    title: "Bachelor's Degree Earned",
    description:
      "Successfully completed my Bachelor's degree in Informatics at the Technical University of Košice with good results, building a strong foundation in computer science.",
    image: "/images/bp.png",
  },
  {
    id: 4,
    icon: null,
    title: "Hackathon Product Owner",
    description:
      "After winning the Hackathon last year, me and my collague joined this year as product owners and mentors at the hackathon, guiding participants on our own theme.",
    image: "/images/hack.png",
  },
];


const AboutPage = () => {

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={glitchyPageTransitionVariants}
      className="overflow-x-hidden"
    >
      <section
        id="about"
        className="min-h-screen flex flex-col justify-start items-center relative px-4 pt-16 pb-12 md:pt-20 md:pb-16"
      >
        <div className="max-w-4xl w-full mb-10 md:mb-12">
          <motion.h2
             className="text-3xl md:text-4xl font-bold font-mono mb-10 text-center"
             initial={{ opacity: 0, y: -15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1, duration: 0.3 }}
          >
             <span className="text-[var(--color-accent-glitch)]">//</span> About_Me.md
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-12">
             <motion.div
                className="w-full md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="aspect-square w-full max-w-xs md:max-w-none mx-auto border border-[var(--color-border-subtle)] rounded-md overflow-hidden group animate-image-glitch-hover bg-[var(--color-background)]/30 relative">
                   <img
                    src="/images/ja.png"
                    alt="Dominik Palo"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                   />
                  <div className="absolute inset-0 w-full h-full has-scanlines z-10 pointer-events-none"></div>
                </div>
             </motion.div>
             <motion.div
                className="w-full md:w-1/2 lg:w-7/12 xl:w-2/3 space-y-4 text-[var(--color-text-primary)] text-center md:text-left"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                 <p className="text-lg leading-relaxed">
                  Hi! I'm Dominik Palo, a <strong>full stack AI developer</strong> and <strong>student</strong> at the Technical University of Košice. I started programming in high school, cultivating a passion that has driven me for about <strong>6 years</strong>. Alongside my formal education, I continuously enhance my skills through personal projects and practical IT roles. I recently completed my bachelor's degree.
                 </p>
                 <p className="leading-relaxed text-[var(--color-text-secondary)]">
                   My journey at TU Košice involved rigorous coursework and projects, honing my abilities across the full stack. Lately, my enthusiasm has pivoted towards the cutting-edge field of AI, where I'm actively developing applications leveraging large language models (LLMs) and exploring the potential of autonomous agents to solve complex real-world problems. I thrive on challenges and am always eager to learn and implement new technologies.
                 </p>
             </motion.div>
          </div>
        </div>
        <ScrollButton nextSectionId="tech" />
      </section>

      <section
        id="tech"
        className="min-h-screen flex flex-col justify-center items-center relative px-4 py-16 md:py-20"
      >
        <div className="max-w-4xl w-full">
           <motion.h3
             className="text-2xl md:text-3xl font-bold font-mono mb-8 text-center"
             initial={{ opacity: 0, y: -15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.3 }}
             transition={{ delay: 0.1, duration: 0.3 }}
           >
             <span className="text-[var(--color-accent-glitch)]">//</span> Tech_Stack
           </motion.h3>
          <div className="space-y-8">
             {Object.entries(skills).map(([category, list]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4 }}
                >
                  <h4 className="text-lg font-semibold font-mono text-[var(--color-text-secondary)] mb-4 capitalize border-b border-[var(--color-border-subtle)] pb-2">
                    _{category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {list.map((skill) => (
                       <motion.span
                         key={skill}
                         className="inline-block bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-xs font-mono px-3 py-1.5 rounded-full hover:border-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch)] transition-all duration-200 cursor-default"
                         whileHover={{ scale: 1.08, y: -2 }}
                       >
                         {skill}
                       </motion.span>
                    ))}
                  </div>
                </motion.div>
             ))}
           </div>
        </div>
         <motion.button
           onClick={() => {
              const nextSection = document.getElementById("achievements");
              if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
           }}
           whileHover={{
            scale: 1.1,
            y: [-1, -3, -1, -3, -2],
            x: [0, 1, -1, 1, 0],
            filter: `drop-shadow(0 0 6px var(--color-accent-glitch))`,
            transition: { y: {duration: 0.3, repeat: Infinity}, x: {duration: 0.2, repeat: Infinity}, scale: {duration: 0.2}, filter: {duration: 0.2} }
           }}
           whileTap={{ scale: 0.90, filter: `brightness(0.7)` }}
           transition={{ type: "spring", stiffness: 400, damping: 17 }}
           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-3 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-accent-glitch)] hover:border-[var(--color-accent-glitch)] z-20 backdrop-blur-sm bg-[var(--color-background)]/50"
           aria-label="Scroll down to achievements section"
          >
            <FaChevronDown size={22} />
         </motion.button>
      </section>

      <section
        id="achievements"
        className="min-h-screen flex flex-col justify-center items-center relative px-4 py-16 md:py-20"
      >
        <div className="max-w-5xl w-full">
          <motion.h3
            className="text-2xl md:text-3xl font-bold font-mono mb-10 text-center"
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <span className="text-[var(--color-accent-glitch)]">//</span> Achievements && Milestones
          </motion.h3>

          <motion.div
              className="flex flex-col md:flex-row gap-6 md:gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }} // Stagger children entry
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="w-full max-w-sm mx-auto bg-[var(--color-background)]/60 border border-[var(--color-border-subtle)] rounded-lg shadow-lg overflow-hidden backdrop-blur-sm flex flex-col"
                  initial={{ opacity: 0, y: 20 }} // Animate from bottom
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{
                    scale: 1.03,
                    borderColor: "var(--color-accent-glitch)",
                    boxShadow: "0 0 12px rgba(var(--color-accent-glitch-rgb), 0.25)"
                  }}
                >
                  {achievement.image && (
                    <div className="w-full aspect-[4/3] relative bg-[var(--color-background)]/30">
                      <img
                        src={achievement.image}
                        alt={`${achievement.title} visual representation`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      {achievement.icon && (
                         <achievement.icon className="text-[var(--color-accent-glitch)] text-lg flex-shrink-0" />
                      )}
                      <h4 className="text-base font-bold font-mono text-[var(--color-text-primary)]">
                        {achievement.title}
                      </h4>
                    </div>
                    <p className="text-[var(--color-text-secondary)] font-mono text-sm leading-relaxed flex-grow">
                       {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;