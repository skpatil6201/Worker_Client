import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logoss.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" >
            <img className='h-12' src={logo} alt="" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">
              About
            </Link>
            <Link to="/features" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Features
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Contact
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm font-medium">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none text-gray-700"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isOpen ? (
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/features" 
                className="text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center shadow-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
