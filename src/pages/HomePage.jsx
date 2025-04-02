// src/pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Use Link for internal navigation


const GlitchButton = ({ children, to, href, onClick, className = '', type = 'button' }) => {
  const baseClasses = `
    px-6 py-2 border border-[var(--color-text-secondary)]
    text-[var(--color-text-primary)] font-medium rounded
    hover:border-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch)]
    hover:bg-[var(--color-highlight-bg)] transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-glitch)] focus:ring-opacity-50
    ${className}
  `;

  const motionProps = {
    whileHover: { scale: 1.03 /* Less intense */ },
    whileTap: { scale: 0.97 },
  };

  if (to) {
    return (
      <motion.div {...motionProps}>
         <Link to={to} className={baseClasses} >{children}</Link>
      </motion.div>
    );
  }
   if (href) {
     return (
       <motion.a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses} {...motionProps}>
         {children}
       </motion.a>
     );
   }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      className={baseClasses}
      type={type}
    >
      {children}
    </motion.button>
  );
};


const HomePage = () => {
  return (
    <section id="home" className="py-16 md:py-24 text-center md:text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // Use font-mono utility (maps to Fira Code via @theme)
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-mono"
          >
            {/* Use CSS var for glitch color, maybe add subtle pulse? */}
            <span className="text-[var(--color-accent-glitch)] animate-color-pulse">//</span> Hi, I'm [Your Name]
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
             // Use CSS var for secondary text
            className="text-lg sm:text-xl lg:text-2xl text-[var(--color-text-secondary)] mb-8"
          >
            A Software Engineer specializing in building {/* Use CSS var for primary text */}
            <span className="text-[var(--color-text-primary)]">dynamic and responsive</span> web applications. Turning ideas into {/* Use CSS var for primary text */}
            <span className="text-[var(--color-text-primary)]">digital realities</span>.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.4 }}
             className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            {/* Use 'to' prop for internal links */}
            <GlitchButton to="/projects">
              Explore My Work 
            </GlitchButton>
            <GlitchButton to="/contact" className="border-transparent hover:border-[var(--color-text-secondary)]">
               Contact Me
            </GlitchButton>
         
            {/* <GlitchButton href="https://github.com/yourusername" className="border-transparent hover:border-[var(--color-text-secondary)]"> GitHub </GlitchButton> */}
          </motion.div>
        </div>

        {/* Visual Area - use CSS vars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:block md:col-span-1 relative aspect-square"
        >
          <div className="absolute inset-0 bg-gray-800/50 border border-[var(--color-border-subtle)] rounded-lg flex items-center justify-center overflow-hidden">
             {/* Placeholder for visual or actual image */}
             <span className="text-[var(--color-text-secondary)] text-sm">(Visual Element Placeholder)</span>

             <img
                src="/path/to/your/image.jpg" alt="Abstract visual"
                className="absolute inset-0 w-full h-full object-cover animate-image-glitch-hover"
             /> 
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePage;