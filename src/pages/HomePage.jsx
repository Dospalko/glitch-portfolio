import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// ---> Import the glitchy variants
import { glitchyPageTransitionVariants } from '../utils/motionVariants';

// Reusable Button Component (Consider moving to components/Button.jsx if not already)
const GlitchButton = ({ children, to, href, onClick, className = '', type = 'button' }) => {
  const baseClasses = `
    inline-block px-6 py-2 border border-[var(--color-text-secondary)]
    text-[var(--color-text-primary)] font-medium font-mono rounded text-sm
    hover:border-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch)]
    hover:bg-[var(--color-highlight-bg)] transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-glitch)] focus:ring-opacity-50
    ${className}
    animate-text-jitter-slight-hover /* Add subtle jitter on hover */
  `; // Added inline-block and font-mono, text-sm for consistency

  const motionProps = {
    whileHover: {
      scale: 1.05, // Slightly more pronounced hover scale
       // textShadow: "0 0 5px var(--color-accent-glitch)" // Optional: Add glow on hover
    },
    whileTap: { scale: 0.95 },
  };

  // Framer Motion needs to wrap the element receiving props IF it's not a motion component itself.
  // Since Link and a aren't motion components by default, we wrap them.
  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block"> {/* Wrapper div needed */}
        <Link to={to} className={baseClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }
   if (href) {
     return (
       <motion.div {...motionProps} className="inline-block"> {/* Wrapper div needed */}
         <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
           {children}
         </a>
       </motion.div>
     );
   }

  // motion.button IS a motion component, so it can directly accept the props
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
    // ---> Apply variants to the top-level motion component
    <motion.section
      id="home"
      className="py-16 md:py-24 text-center md:text-left min-h-[calc(100vh-200px)] flex items-center" // Adjust min-height as needed
      variants={glitchyPageTransitionVariants} // Use the glitchy variants
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full"> {/* Increased gap */}
        {/* Text Content Area */}
        <div className="md:col-span-2">
          {/* Heading with Glitch Font Option */}
          <motion.h1
             initial={{ opacity: 0, y: -20 }} // Start slightly above
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }} // Add slight delay
             // Optional: Use the glitch font for the main name/heading for extreme style
             // className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-glitch text-[var(--color-text-primary)]"
             className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 font-mono" // Keeping mono for now
          >
            <span className="text-[var(--color-accent-glitch)] animate-color-pulse">//</span> Hi, I'm [Your Name]
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p
             initial={{ opacity: 0, x: -20 }} // Slide in from left
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="text-lg sm:text-xl lg:text-2xl text-[var(--color-text-secondary)] mb-8"
          >
            A Software Engineer crafting <span className="text-[var(--color-text-primary)] font-medium">robust & interactive</span> digital experiences. Transforming complexity into <span className="text-[var(--color-text-primary)] font-medium">elegant solutions</span>.
          </motion.p>

          {/* Buttons Area */}
          <motion.div
             initial={{ opacity: 0, y: 20 }} // Slide up
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.5 }}
             className="flex flex-wrap gap-4 justify-center md:justify-start" // Use flex-wrap for responsiveness
          >
            <GlitchButton to="/projects">
              Explore Work  {/* Use arrow */}
            </GlitchButton>
            <GlitchButton to="/contact" className="border-transparent hover:border-[var(--color-text-secondary)]">
               Get In Touch
            </GlitchButton>
             {/* Add GitHub/LinkedIn Links Here using GlitchButton with href */}
             {/* <GlitchButton href="YOUR_GITHUB_LINK" className="...">GitHub</GlitchButton> */}
             {/* <GlitchButton href="YOUR_LINKEDIN_LINK" className="...">LinkedIn</GlitchButton> */}
          </motion.div>
        </div>

        {/* Visual Area - Right side */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} // Start scaled down and blurred
           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} // Slightly longer duration
           className="hidden md:block md:col-span-1 relative aspect-square" // Maintain aspect ratio
        >
          {/* Apply hover glitch effect to the container div */}
          <div className="absolute inset-0 border border-[var(--color-border-subtle)] rounded-lg overflow-hidden group animate-image-glitch-hover">
             {/* Optional Background for placeholder */}
             <div className="absolute inset-0 bg-gray-900/70"></div>

             {/* Replace with your actual image or visual component */}
             {/* <img
                src="/path/to/your/actual-image.webp" // Use WebP for performance
                alt="Descriptive Alt Text"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // Zoom effect
                loading="lazy" // Lazy load image
             /> */}

             {/* Placeholder Text if no image */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[var(--color-text-secondary)] text-sm font-mono">[ Interface Snapshot ]</span>
             </div>

             {/* Optional: Add scanlines overlay to the visual */}
              <div className="absolute inset-0 w-full h-full has-scanlines z-10"></div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomePage;