import React from 'react';
import { motion } from 'framer-motion';
// ---> Import the glitchy variants
import { glitchyPageTransitionVariants } from '../utils/motionVariants';
import { VscMail, VscGithubAlt } from 'react-icons/vsc'; // Example icons

// Basic form component - Ideally move to components/ContactForm.jsx later
const ContactForm = () => {
  // Basic form state/handler placeholder - Implement properly later
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submission placeholder - Implement backend or service (Netlify Forms, Formspree etc.)");
    // Reset form logic here
  };

  const inputClasses = "w-full px-4 py-2 bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] rounded-md text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent-glitch)] focus:ring-1 focus:ring-[var(--color-accent-glitch)] focus:outline-none transition-colors duration-200";
  const labelClasses = "block text-sm font-mono text-[var(--color-text-secondary)] mb-1";

  return (
     <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div>
           <label htmlFor="name" className={labelClasses}>_Name:</label>
           <input type="text" id="name" name="name" required className={inputClasses} placeholder="John Doe"/>
        </div>
         <div>
            <label htmlFor="email" className={labelClasses}>_Email:</label>
            <input type="email" id="email" name="email" required className={inputClasses} placeholder="john.doe@email.com"/>
         </div>
         <div>
            <label htmlFor="message" className={labelClasses}>_Message:</label>
            <textarea id="message" name="message" rows="5" required className={inputClasses} placeholder="Your message here..."></textarea>
         </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, textShadow: "0 0 5px var(--color-accent-glitch)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-[var(--color-accent-glitch)] text-[var(--color-background)] font-bold font-mono rounded hover:bg-[var(--color-accent-glitch-darker)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-glitch)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] animate-text-jitter-slight-hover"
          >
            Send Message >
          </motion.button>
     </form>
  )
}

const ContactPage = () => {
  return (
    // ---> Apply variants to the top-level motion component
    <motion.section
      id="contact"
      className="py-16 md:py-20" // Consistent padding
      variants={glitchyPageTransitionVariants} // Use the glitchy variants
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold font-mono mb-4 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span className="text-[var(--color-accent-glitch)]">//</span> Contact: Open_Channel
      </motion.h2>

      {/* Subtitle */}
      <motion.p
         className="text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto"
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2, duration: 0.3 }}
      >
        Have a question, proposal, or just want to say hi? Send a message or connect via other channels.
      </motion.p>

      {/* Contact Form Area */}
       <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.3, duration: 0.4 }}
       >
         <ContactForm />
       </motion.div>


      {/* Other Contact Methods */}
      <motion.div
         className="text-center mt-16"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.4, duration: 0.4 }}
       >
        <h3 className="text-lg font-mono text-[var(--color-text-secondary)] mb-4">// Or find me on:</h3>
        <div className="flex justify-center items-center space-x-6">
          <a href="mailto:YOUR_EMAIL@example.com" // <-- REPLACE EMAIL
             className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)] transition-colors duration-200"
             aria-label="Email">
            <VscMail size={28} />
          </a>
           <a href="YOUR_GITHUB_LINK" // <-- REPLACE GITHUB LINK
              target="_blank" rel="noopener noreferrer"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)] transition-colors duration-200"
              aria-label="GitHub">
            <VscGithubAlt size={28} />
          </a>
          <a href="YOUR_LINKEDIN_LINK" // <-- REPLACE LINKEDIN LINK
             target="_blank" rel="noopener noreferrer"
             className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-glitch)] transition-colors duration-200"
             aria-label="LinkedIn">
         Linkedin
          </a>
          {/* Add other relevant links (Twitter, etc.) */}
        </div>
      </motion.div>

    </motion.section>
  );
};

export default ContactPage;