import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
      isActive
        ? 'text-accent-glitch bg-gray-800' // Active link style - maybe add subtle glitch on hover later
        : 'text-text-secondary hover:text-text-primary hover:bg-gray-700' // Inactive link style
    }`;

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700/50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-text-primary hover:text-accent-glitch transition-colors">
          [Your Name/Logo]
        </Link>
        <div className="space-x-4">
          <NavLink to="/" className={navLinkClass}>
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