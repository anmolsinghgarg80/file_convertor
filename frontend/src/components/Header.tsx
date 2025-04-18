import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M10 14H18M10 10H18M6 18H8"></path>
            </svg>
            <span className="text-xl font-bold">ConvertMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/all-tools"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              All Converters
            </Link>
            <Link
              to="/how-it-works"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Pricing
            </Link>
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              to="/signup"
              className="bg-white text-indigo-700 rounded-lg py-2 px-4 font-bold hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            <Link
              to="/"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/all-tools"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              All Converters
            </Link>
            <Link
              to="/how-it-works"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="block hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              Pricing
            </Link>
            <Link
              to="/signup"
              className="block bg-white text-indigo-700 rounded-md py-2 px-3 font-bold text-center mt-4"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
