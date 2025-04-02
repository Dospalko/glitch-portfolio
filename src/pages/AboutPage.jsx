import React from 'react';
import { motion } from 'framer-motion';
// ---> Import the glitchy variants
import { glitchyPageTransitionVariants } from '../utils/motionVariants';

// Example Skills Data - Move to src/data/skills.js later ideally
const skills = {
  frontend: ["React", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "TypeScript"],
  backend: ["Node.js", "Express", "REST APIs"], // Example
  tools: ["Git", "Docker", "Vite", "Webpack", "Figma", "Linux/CLI"], // Example
  // databases: ["MongoDB", "PostgreSQL"], // Example
};

// Skill badge component
const SkillBadge = ({ skill }) => (
  <motion.span
    className="inline-block bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] text-xs font-mono px-3 py-1 rounded mr-2 mb-2 hover:border-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch)] transition-all duration-200"
    whileHover={{ scale: 1.08, y: -2 }} // Slight pop effect
  >
    {skill}
  </motion.span>
);

const AboutPage = () => {
  return (
    // ---> Apply variants to the top-level motion component
    <motion.section
      id="about"
      className="py-16 md:py-20" // Consistent padding
      variants={glitchyPageTransitionVariants} // Use the glitchy variants
      initial="initial"
      animate="animate"
      exit="exit"
    >
       <div className="max-w-4xl mx-auto"> {/* Constrain width */}

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Optional: Image Column */}
           <motion.div
              className="md:col-span-1 hidden md:block relative aspect-w-1 aspect-h-1" // Square aspect ratio
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
           >
             {/* Placeholder for Photo or abstract graphic */}
              <div className="absolute inset-0 border border-[var(--color-border-subtle)] rounded-md overflow-hidden group animate-image-glitch-hover bg-gray-900/50">
                  {/* <img src="/path/to/your-about-photo.jpg" alt="Your Name" className="object-cover w-full h-full group-hover:scale-105 transition-transform" loading="lazy"/> */}
                  <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-[var(--color-text-secondary)] text-sm font-mono">[ Profile Snapshot ]</span>
                  </div>
                   <div className="absolute inset-0 w-full h-full has-scanlines z-10"></div>
              </div>
           </motion.div>

          {/* Text Content Column */}
          <motion.div
             className="md:col-span-2 space-y-5 text-[var(--color-text-primary)]" // Styles for text
             initial={{ opacity: 0, x: 20 }} // Slide in from right
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed">
              Hi! I'm [Your Name], a passionate <strong className="font-medium text-[var(--color-accent-glitch)]">[Your Role - e.g., Software Engineer, Frontend Developer]</strong> based in [Your Location/Remote]. I specialize in building dynamic, user-centric web applications from concept to deployment.
            </p>
             <p className="leading-relaxed text-[var(--color-text-secondary)]">
               My journey into tech started with [brief origin story - e.g., a curiosity for how websites worked, building a simple game, etc.]. I thrive on solving complex problems and enjoy the process of turning abstract ideas into tangible, high-performance digital products. I'm particularly interested in [mention specific areas like performance optimization, UI/UX design, backend architecture, specific tech like React Native etc.].
             </p>
            <p className="leading-relaxed text-[var(--color-text-secondary)]">
              When I'm not coding, you might find me [mention a hobby or two - e.g., exploring new tech trends, contributing to open source, hiking, playing music, etc.]. I'm always eager to learn and collaborate on exciting projects.
            </p>
          </motion.div>
        </div>

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
            {/* Iterate over skill categories */}
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

      </div>
    </motion.section>
  );
};

export default AboutPage;