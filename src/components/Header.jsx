// src/components/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const navLinkClass = ({ isActive }) =>
    `nav-link-custom ${ // Use base class defined in index.css if desired
      isActive
        ? 'text-[var(--color-accent-glitch)] bg-[var(--color-highlight-bg)]' // Use CSS vars
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-gray-700/50' // Mix and match ok
    }`;

  return (
    // Use CSS var for background, add subtle border
    <header className="bg-[var(--color-background)]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-[var(--color-border-subtle)]">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-[var(--color-text-primary)] hover:text-[var(--color-accent-glitch)] transition-colors"
        >
          {/* Use the specific hover animation class from index.css */}
          <span className="inline-block animate-text-jitter-hover">
            [Your Name/Logo]
          </span>
        </Link>
        <div className="space-x-4">
          {/* NavLinks will use navLinkClass which now uses CSS vars */}
          <NavLink to="/" className={navLinkClass} end> 
            // Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            // About
          </NavLink>
          <NavLink to="/projects" className={navLinkClass}>
            // Projects
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            // Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;