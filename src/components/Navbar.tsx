import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logoss.png';
import { isAuthenticated, getUserData, logout, getUserType } from '../utils/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setUserData(getUserData());
    setUserType(getUserType());
  }, [location]);

  const handleLogout = () => {
    logout(navigate);
    setIsLoggedIn(false);
    setUserData(null);
    setUserType(null);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50 ">
      {/* Top Bar */}
      <div className="bg-slate-800   text-white py-2">
        <div className="container ml-8 mr-8 mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a href="mailto:info.skassociates4@gmail.com" className="flex items-center gap-2 hover:text-green-400 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                info.skassociates4@gmail.com
              </a>
              <a href="tel:+917276469398" className="flex items-center gap-2 hover:text-green-400 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                +91-7276469398 / +91-9730517424
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img className='h-16' src={logo} alt="S.K. Associates" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800">S.K. ASSOCIATES</span>
                <p className="text-xs text-gray-600 text-l tracking-wider">Your Success,Our Expertise</p>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Home
              </Link>
              
              <Link 
                to="/about" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/about' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                About
              </Link>

              <Link 
                to="/services" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/services' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Services
              </Link>

              <Link 
                to="/gallery" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/gallery' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Gallery
              </Link>
              
              <Link 
                to="/contact" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/contact' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Contact
              </Link>

              {/* Login/Logout Section */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/${userType}-dashboard`}
                    className="transition font-semibold text-sm uppercase text-blue-600 hover:text-blue-700"
                  >
                    Dashboard
                  </Link>
                  <span className="text-sm text-gray-600">
                    {userData?.username || userData?.firmName || userData?.fullName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="transition font-semibold text-sm uppercase text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`transition font-semibold text-sm uppercase ${
                      location.pathname === '/login' 
                        ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    Login
                  </Link>

                  <Link 
                    to="/signup" 
                    className={`transition font-semibold text-sm uppercase ${
                      location.pathname === '/signup' 
                        ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden focus:outline-none text-gray-700"
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
            <div className="lg:hidden pb-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className={`transition font-semibold ${
                    location.pathname === '/' 
                      ? 'text-green-600 font-bold' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className={`transition font-semibold ${
                    location.pathname === '/about' 
                      ? 'text-green-600 font-bold' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/services" 
                  className={`transition font-semibold ${
                    location.pathname === '/services' 
                      ? 'text-green-600 font-bold' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/gallery" 
                  className={`transition font-semibold ${
                    location.pathname === '/gallery' 
                      ? 'text-green-600 font-bold' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  to="/contact" 
                  className={`transition font-semibold ${
                    location.pathname === '/contact' 
                      ? 'text-green-600 font-bold' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                {/* Login/Logout Section for Mobile */}
                {isLoggedIn ? (
                  <>
                    <Link
                      to={`/${userType}-dashboard`}
                      className="transition font-semibold text-blue-600 hover:text-blue-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="transition font-semibold text-red-600 hover:text-red-700 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className={`transition font-semibold ${
                        location.pathname === '/login' 
                          ? 'text-green-600 font-bold' 
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className={`transition font-semibold ${
                        location.pathname === '/signup' 
                          ? 'text-green-600 font-bold' 
                          : 'text-gray-700 hover:text-green-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
