import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
     // Use CSS vars for background, border, text
    <footer className="bg-gray-900/30 border-t border-[var(--color-border-subtle)] mt-12 py-4">
      <div className="container mx-auto px-4 text-center text-[var(--color-text-secondary)] text-sm">
        © {year} [Your Name]. // System nominal. <span className="animate-ping inline-block w-1 h-1 bg-green-400 rounded-full opacity-75"></span>
        {/* Add actual links later */}
        <div className="mt-2 space-x-4">
             <a href="#" className="hover:text-[var(--color-text-primary)]">GitHub</a>
             <a href="#" className="hover:text-[var(--color-text-primary)]">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;