import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define the routes/tabs
const tabs = [
  { path: '/', label: 'Home.jsx' },
  { path: '/about', label: 'AboutMe.md' }, // Use file-like names
  { path: '/projects', label: 'Projects.json' },
  { path: '/contact', label: 'Contact.config' },
];

const NavigationTabs = () => {
  const baseTabClass = "px-4 py-2 text-sm font-mono transition-colors duration-150 border-b-2"; // Border bottom for active state later
  const inactiveTabClass = "text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-highlight-bg)] hover:text-[var(--color-text-primary)]";
  const activeTabClass = "text-[var(--color-text-primary)] bg-gray-800/50 border-[var(--color-accent-glitch)]"; // Accent border for active

  return (
    // Simulates the tab bar area
    <nav className=" border-b border-[var(--color-border-subtle)] sticky top-0 z-50 backdrop-blur-sm">
       {/* Container for the tabs */}
      <div className="container mx-auto flex items-center px-2 overflow-x-auto"> {/* Allow horizontal scroll on small screens if needed */}
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            // Use 'end' prop for the Home route to avoid matching other routes starting with '/'
            end={tab.path === '/'}
            className={({ isActive }) =>
              `${baseTabClass} ${isActive ? activeTabClass : inactiveTabClass}`
            }
          >
            {/* We could add a subtle glitch effect on the active tab text later */}
            {({ isActive }) => (
               <motion.span layoutId="underline" className="relative block"> {/* Shared layout animation for active indicator */}
                {tab.label}
                 {isActive && (
                     <motion.div
                        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--color-accent-glitch)]"
                        layoutId="activeTabIndicator" // Animate this line
                        initial={false} // prevent initial animation if not active
                        transition={{ type: "spring", stiffness: 300, damping: 30 }} // spring animation for indicator
                    />
                 )}
               </motion.span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavigationTabs;