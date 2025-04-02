import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900/50 border-t border-gray-700/50 mt-12 py-4">
      <div className="container mx-auto px-4 text-center text-text-secondary text-sm">
        © {year} [Your Name]. // System nominal.
        {/* Add links to GitHub, LinkedIn etc. later */}
      </div>
    </footer>
  );
};

export default Footer;