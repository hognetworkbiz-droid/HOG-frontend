import React from 'react';

function Header({ logoUrl, siteName, onAdminLoginClick }) {
  return (
    <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <img src={logoUrl} alt="Site Logo" className="h-10 w-auto" />
            <span className="ml-3 text-2xl font-bold text-white">{siteName}</span>
          </div>
          <button
            onClick={onAdminLoginClick}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors duration-200"
          >
            Admin Login
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
