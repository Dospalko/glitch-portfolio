import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import ikon z react-icons
import { VscHome, VscAccount, VscJson, VscMail, VscCode } from "react-icons/vsc";

// Definícia kariet s cestami, popismi a ikonami
const tabs = [
  { path: '/', label: 'Home.jsx', icon: VscCode },
  { path: '/about', label: 'AboutMe.md', icon: VscAccount },
  { path: '/projects', label: 'Projects.json', icon: VscJson },
  { path: '/contact', label: 'Contact.config', icon: VscMail },
];

const NavigationTabs = () => {
  // Základné triedy pre styling
  const baseTabClass = "flex items-center gap-2 px-4 py-2 text-sm font-mono transition-colors duration-150 border-b-2";
  const inactiveTabClass = "text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-highlight-bg)] hover:text-[var(--color-text-primary)]";
  // Trieda pre aktívnu kartu – zvýrazníme ju aj glitch efektom
  const activeTabClass = "text-[var(--color-text-primary)] bg-gray-800/60 border-[var(--color-accent-glitch)]";

  // Definícia glitch efektu pre hover pomocou Framer Motion
  const glitchHoverAnimation = {
    x: [0, -5, 5, -5, 5, 0],
    opacity: [1, 0.7, 1, 0.7, 1],
    transition: { duration: 0.4, ease: "easeInOut" }
  };

  const iconGlitchHoverAnimation = {
    x: [0, -3, 3, -3, 3, 0],
    transition: { duration: 0.4, ease: "easeInOut" }
  };

  return (
    <nav className="bg-[var(--color-background)]/90 backdrop-blur-md sticky top-0 z-50 border-b-2 border-[var(--color-border-subtle)]">
      <div className="container mx-auto flex items-stretch px-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'} // Zabezpečí presné zladenie pre Home link
              className={({ isActive }) =>
                `${baseTabClass} ${isActive ? activeTabClass : inactiveTabClass}`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Obalíme ikonu do motion.span pre glitch efekt na hover */}
                  <motion.span whileHover={iconGlitchHoverAnimation}>
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[var(--color-accent-glitch)]' : ''}`}
                    />
                  </motion.span>

                  {/* Obalíme text do motion.span s glitch hover animáciou */}
                  <motion.span
                    whileHover={glitchHoverAnimation}
                    className={`relative block whitespace-nowrap ${
                      isActive ? 'animate-active-glitch' : ''
                    }`}
                  >
                    {tab.label}

                    {/* Podčiarknutie pre aktívnu kartu s hladkým prechodom */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-[-2px] left-[-4px] right-[-4px] h-[2px] bg-[var(--color-accent-glitch)]"
                        layoutId="activeTabIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
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
