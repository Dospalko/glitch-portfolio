import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
// ---> Import the glitchy variants
import { glitchyPageTransitionVariants } from '../utils/motionVariants';

// Komponent, ktorý v určitých intervaloch spustí glitch animáciu na obalenom texte
const GlitchWrapper = ({ children, glitchFrequency = 4000, glitchDuration = 300 }) => {
  // Stav, ktorý určuje, či momentálne prebieha glitch animácia
  const [isGlitch, setIsGlitch] = React.useState(false);

  React.useEffect(() => {
    let timeoutId;
    // Funkcia, ktorá spustí glitch a následne rekurzívne naplánuje ďalší glitch
    const triggerGlitch = () => {
      setIsGlitch(true);
      setTimeout(() => {
        setIsGlitch(false);
        // Nasledujúci glitch sa spustí po náhodnom intervale
        timeoutId = setTimeout(triggerGlitch, Math.random() * glitchFrequency);
      }, glitchDuration);
    };

    // Prvý glitch po náhodnom čase
    timeoutId = setTimeout(triggerGlitch, Math.random() * glitchFrequency);

    return () => clearTimeout(timeoutId);
  }, [glitchFrequency, glitchDuration]);

  return (
    <motion.span
      // Ak prebieha glitch, použijeme kľúčové snímky s malými posunmi a zmenami opacity
      animate={
        isGlitch
          ? { x: [0, -5, 5, -5, 5, 0], opacity: [1, 0.7, 1, 0.7, 1, 1] }
          : { x: 0, opacity: 1 }
      }
      transition={{ duration: glitchDuration / 1000, ease: "easeInOut" }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.span>
  );
};

// Reusable Button Component s glitch efektom vloženým do textu
const GlitchButton = ({ children, to, href, onClick, className = '', type = 'button' }) => {
  // Základné triedy pre styling
  const baseClasses = `
    inline-block px-6 py-2 border border-[var(--color-text-secondary)]
    text-[var(--color-text-primary)] font-medium font-mono rounded text-sm
    hover:border-[var(--color-accent-glitch)] hover:text-[var(--color-accent-glitch)]
    hover:bg-[var(--color-highlight-bg)] transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-glitch)] focus:ring-opacity-50
    ${className}
    animate-text-jitter-slight-hover /* Subtílne chvenie textu na hover */
  `;

  // Vlastnosti animácie pri hover/tap
  const motionProps = {
    whileHover: {
      scale: 1.05,
    },
    whileTap: { scale: 0.95 },
  };

  // Ak máme odkaz pomocou 'to'
  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={baseClasses}>
          <GlitchWrapper>{children}</GlitchWrapper>
        </Link>
      </motion.div>
    );
  }

  // Ak máme externý odkaz cez 'href'
  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          <GlitchWrapper>{children}</GlitchWrapper>
        </a>
      </motion.div>
    );
  }

  // Pre tlačidlo, ktoré je priamo motion komponentom
  return (
    <motion.button {...motionProps} onClick={onClick} className={baseClasses} type={type}>
      <GlitchWrapper>{children}</GlitchWrapper>
    </motion.button>
  );
};

const HomePage = () => {
  // Stav pre načítavanie
  const [loading, setLoading] = React.useState(true);

  // Po 3 sekundách vypneme loading a spustíme zvyšné animácie
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)] z-50"
          >
            <motion.h1
              animate={{
                x: [0, -10, 10, -10, 10, 0],
                opacity: [1, 0.5, 1, 0.5, 1, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
              className="text-4xl font-mono text-[var(--color-accent-glitch)]"
            >
              Loading...
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.section
          id="home"
          className="py-16 md:py-24 text-center md:text-left min-h-[calc(100vh-200px)] flex items-center"
          variants={glitchyPageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center w-full">
            {/* Text Content Area */}
            <div className="md:col-span-2">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 font-mono"
              >
                {/* Glitch efekt obalený okolo celého nadpisu */}
                <GlitchWrapper>
                  <span className="text-[var(--color-accent-glitch)] animate-color-pulse">//</span> Hi, I'm [Dominik]
                </GlitchWrapper>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg sm:text-xl lg:text-2xl text-[var(--color-text-secondary)] mb-8"
              >
                <GlitchWrapper>
                  A Software Engineer crafting{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">robust & interactive</span> digital experiences.
                  Transforming complexity into{' '}
                  <span className="text-[var(--color-text-primary)] font-medium">elegant solutions</span>.
                </GlitchWrapper>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <GlitchButton to="/projects">Explore Work</GlitchButton>
                <GlitchButton to="/contact" className="border-transparent hover:border-[var(--color-text-secondary)]">
                  Get In Touch
                </GlitchButton>
              </motion.div>
            </div>

            {/* Visual Area - Right side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="hidden md:block md:col-span-1 relative aspect-square"
            >
              <div className="absolute inset-0 border border-[var(--color-border-subtle)] rounded-lg overflow-hidden group animate-image-glitch-hover">
                <div className="absolute inset-0 bg-gray-900/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[var(--color-text-secondary)] text-sm font-mono">
                    [ Interface Snapshot ]
                  </span>
                </div>
                <div className="absolute inset-0 w-full h-full has-scanlines z-10"></div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}
    </>
  );
};

export default HomePage;
