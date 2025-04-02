// src/utils/motionVariants.js

// More aggressive glitchy page transition
export const glitchyPageTransitionVariants = {
    initial: {
      opacity: 0,
      // Start slightly "broken" with clip-path
      clipPath: "polygon(0% 0%, 10% 0%, 10% 40%, 50% 40%, 50% 100%, 0% 100%)",
      filter: "blur(5px)", // Start blurred
      // Optional: Slight initial offset
       x: "-20px",
       skewX: "-5deg",
    },
    animate: {
      opacity: 1,
      // Animate to full visibility
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      filter: "blur(0px)", // Remove blur
      x: "0px",
      skewX: "0deg",
      transition: {
        duration: 0.5, // Duration for entry animation
        ease: [0.25, 1, 0.5, 1], // Custom cubic-bezier for smoother end
        // Delay for clip-path animation if needed
        // delay: 0.1
      },
    },
    exit: {
      opacity: 0,
      // Exit by breaking apart again, maybe differently
      clipPath: "polygon(90% 0%, 100% 0%, 100% 60%, 40% 60%, 40% 100%, 90% 100%)",
      filter: "blur(8px)", // Increase blur on exit
      // Optional: Exit offset in opposite direction
       x: "20px",
       skewX: "5deg",
      transition: {
        duration: 0.3, // Faster exit
        ease: "easeIn",
      },
    },
  };
  
  // Keep the simpler variant if you want to switch back easily
  export const simplePageTransitionVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };