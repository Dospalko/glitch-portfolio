// src/utils/motionVariants.js (Example)
export const pageTransitionVariants = {
    initial: {
      opacity: 0,
      // x: "-50vw", // Slide from left example
       y: 30, // Subtle slide up
       filter: "blur(5px)", // Glitchy blur
    },
    animate: {
      opacity: 1,
      // x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        // staggerChildren: 0.1 // If page has children to animate
      },
    },
    exit: {
      opacity: 0,
      // x: "50vw", // Slide to right example
      y: -30, // Subtle slide up and out
      filter: "blur(5px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };
  
  // You could define different variants like 'slideHorizontal', 'glitchyFade' etc.