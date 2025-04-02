// src/components/NavigationTabs.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import icons
import { VscHome, VscAccount, VscJson, VscMail, VscCode } from "react-icons/vsc"; // Using VscCode for JSX

// Update tabs array with icons (Ensure this is defined correctly)
const tabs = [
  { path: '/', label: 'Home.jsx', icon: VscCode },
  { path: '/about', label: 'AboutMe.md', icon: VscAccount },
  { path: '/projects', label: 'Projects.json', icon: VscJson },
  { path: '/contact', label: 'Contact.config', icon: VscMail },
];

const NavigationTabs = () => {
  // Class definitions (ensure these match your desired look)
  const baseTabClass = "flex items-center gap-2 px-4 py-2 text-sm font-mono transition-colors duration-150 border-b-2";
  const inactiveTabClass = "text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-highlight-bg)] hover:text-[var(--color-text-primary)]";
  // Ensure activeTabClass provides enough visual feedback
  const activeTabClass = "text-[var(--color-text-primary)] bg-gray-800/60 border-[var(--color-accent-glitch)]";

  return (
    <nav className="bg-[var(--color-background)]/90 backdrop-blur-md sticky top-0 z-50 border-b-2 border-[var(--color-border-subtle)]">
      <div className="container mx-auto flex items-stretch px-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'} // Crucial for Home link matching exactly
              className={({ isActive }) =>
                `${baseTabClass} ${isActive ? activeTabClass : inactiveTabClass}`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Icon styling based on active state */}
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[var(--color-accent-glitch)]' : ''}`} />

                  {/* Motion span for label - *APPLY GLITCH CLASS HERE* */}
                  <motion.span
                    // Using layoutId helps animate position smoothly if needed, keep it simple if causing issues
                    // layoutId={`tab-label-${tab.path}`}
                    className={`relative block whitespace-nowrap ${
                      isActive ? 'animate-active-glitch' : '' // Conditionally apply glitch animation class
                    }`}
                  >
                    {tab.label}

                    {/* Motion div for the active indicator underline */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-[-2px] left-[-4px] right-[-4px] h-[2px] bg-[var(--color-accent-glitch)]" // Positioning for underline
                        layoutId="activeTabIndicator" // Shared ID for smooth animation between tabs
                        initial={false} // Don't animate on initial page load
                        transition={{ type: "spring", stiffness: 350, damping: 35 }} // Fine-tune spring physics
                      />
                    )}
                  </motion.span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationTabs;