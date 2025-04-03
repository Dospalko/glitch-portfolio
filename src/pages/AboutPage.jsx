import React from "react";
import { motion } from "framer-motion";
// ---> Import the glitchy variants
import { glitchyPageTransitionVariants } from "../utils/motionVariants";
// Import icons from react-icons
import { FaLightbulb, FaTrophy, FaGraduationCap, FaMedal } from "react-icons/fa";

// Example Skills Data - You can later move this to src/data/skills.js
const skills = {
  frontend: ["React", "JavaScript", "Tailwind CSS", "HTML, CSS", "TypeScript"],
  backend: [
    "Python",
    "Flask",
    "REST APIs",
    "FastAPI",
    "PostgreSQL",
    "SQLite",
    "HuggingFace",
    "OpenAI API",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "LangChain",
  ],
  tools: ["Git", "Docker", "Vite", "Webpack", "Figma", "CLI", "Communication"],
};
// Example Achievements Data - You can also move this to a separate data file
const achievements = [
  {
    id: 1,
    icon: FaLightbulb,
    title: "Erste Hackathon",
    description:
      "At the Erste Hackathon, my team and I developed an expenditure prediction product. Although we didn't win, our innovative final product made a lasting impression.",
    image: "/images/erste.png", // Ensure this image exists in your public/images folder
  },
  {
    id: 2,
    icon: FaTrophy,
    title: "Telekom Hackathon",
    description:
      "At the Telekom Hackathon, we secured 2nd place overall and 1st in our category with an RFP summarizer tool that scraped, extracted, and scored proposals based on company alignment.",
    image: "/images/telekom.png",
  },
  {
    id: 3,
    icon: FaGraduationCap,
    title: "Bachelor's Degree",
    description:
      "I successfully completed my bachelor's degree at TU Košice with excellent grades, acquiring a wealth of practical and theoretical knowledge.",
    image: "/images/bachelor.png",
  },
  {
    id: 4,
    icon: FaMedal,
    title: "Chaktohn & Telekom",
    description:
      "After winning the Chaktohn event and landing a position at Telekom, my college team and I became product owners and mentors for our theme—adopted by nearly two-thirds of participants—demonstrating our leadership and innovative vision.",
    image: "/images/chaktohn.png",
  },
];


// Skill badge component
const SkillBadge = ({ skill }) => (
  <motion.span
    className="inline-block bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-xs font-mono px-3 py-1 rounded mr-2 mb-2 hover:border-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch)] transition-all duration-200"
    whileHover={{ scale: 1.08, y: -2 }}
  >
    {skill}
  </motion.span>
);



const AboutPage = () => {
  return (
    <motion.section
      id="about"
      className="py-16 md:py-20 px-4"
      variants={glitchyPageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-mono mb-8 text-center"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <span className="text-[var(--color-accent-glitch)]">//</span> About_Me.md
        </motion.h2>

        {/* About Content */}
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Image Column */}
          <motion.div
            className="w-full md:w-1/2 h-80 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-full h-full border border-[var(--color-border-subtle)] rounded-md overflow-hidden group animate-image-glitch-hover bg-gray-900/50">
              <img
                src="/images/ja.png"
                alt="Your Name"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[var(--color-text-secondary)] text-sm font-mono">
                  [ Error ]
                </span>
              </div>
              <div className="absolute inset-0 w-full h-full has-scanlines z-10"></div>
            </div>
          </motion.div>

          {/* Text Content Column */}
          <motion.div
            className="w-full md:w-1/2 space-y-5 text-[var(--color-text-primary)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
          <p className="text-lg leading-relaxed">
              Hi! I'm Dominik Palo, a <strong>full stack AI developer</strong> and <strong>student</strong> at the
              Technical University of Košice. I started programming in high
              school, so I've been programming for about <strong>6 years</strong> now. In
              addition to school, I of course also devoted myself to my skills,
              where I improved them on my own projects and in job positions in
              IT. I recently completed my bachelor's degree, where I gained
              experience and a deep understanding of various aspects of software
              development.
            </p>
            <p className="leading-relaxed text-[var(--color-text-secondary)]">
              During my studies at TU Košice, I honed my skills in both frontend
              and backend technologies through rigorous coursework and practical
              projects. Recently, my focus thanks to my work position has
              shifted towards developing advanced AI applications that leverage
              large language models (LLMs) and autonomous agents.
            </p>
          </motion.div>
        </div>
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
        {/* Skills Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold font-mono mb-6 text-center">
            <span className="text-[var(--color-accent-glitch)]">//</span> Tech_Stack
          </h3>
          <div className="space-y-6">
            {Object.entries(skills).map(([category, list]) => (
              <div key={category}>
                <h4 className="text-lg font-semibold font-mono text-[var(--color-text-secondary)] mb-3 capitalize border-b border-[var(--color-border-subtle)] pb-1">
                  _{category}
                </h4>
                <div className="flex flex-wrap">
                  {list.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
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
       {/* Achievements Section */}
       <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold font-mono mb-6 text-center">
            <span className="text-[var(--color-accent-glitch)]">//</span> Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className="bg-[var(--color-background)]/80 border border-[var(--color-border-subtle)] rounded-md shadow-lg overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  x: [0, -3, 3, -3, 3, 0],
                  opacity: [1, 0.8, 1, 0.8, 1],
                }}
                transition={{ duration: 0.5 }}
              >
                {achievement.image && (
                  <div className="w-full h-40 relative">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="object-cover w-full h-full transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <achievement.icon className="text-[var(--color-accent-glitch)] text-xl" />
                    <h4 className="text-lg font-bold font-mono text-[var(--color-text-primary)]">
                      {achievement.title}
                    </h4>
                  </div>
                  <p className="text-[var(--color-text-secondary)] font-mono text-sm">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutPage;