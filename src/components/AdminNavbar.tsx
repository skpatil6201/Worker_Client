import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logoss.png';
import { logout } from '../utils/auth';

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full top-0 z-50">
      {/* Top Bar */}
      <div className="bg-slate-800 text-white py-2">
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
              <span className="text-xs bg-red-600 px-2 py-1 rounded">ADMIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/admin-dashboard" className="flex items-center gap-3">
              <img className='h-16' src={logo} alt="S.K. Associates" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-800">S.K. ASSOCIATES</span>
                <p className="text-xs text-gray-600 text-l tracking-wider">Admin Panel</p>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/admin-dashboard" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/admin-dashboard' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Dashboard
              </Link>
              
              <Link 
                to="/manage-firms" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/manage-firms' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Manage Firms
              </Link>

              <Link 
                to="/manage-candidates" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/manage-candidates' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Manage Candidates
              </Link>

              <Link 
                to="/reports" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/reports' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Reports
              </Link>
              
              <Link 
                to="/settings" 
                className={`transition font-semibold text-sm uppercase ${
                  location.pathname === '/settings' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-1' 
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                Settings
              </Link>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="transition font-semibold text-sm uppercase text-red-600 hover:text-red-700"
              >
                Logout
              </button>
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
                  to="/admin-dashboard" 
                  className={`transition font-semibold ${
                    location.pathname === '/admin-dashboard' 
                      ? 'text-green-600 font-bold' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/manage-firms" 
                  className="transition font-semibold text-gray-700 hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Manage Firms
                </Link>
                <Link 
                  to="/manage-candidates" 
                  className="transition font-semibold text-gray-700 hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Manage Candidates
                </Link>
                <Link 
                  to="/reports" 
                  className="transition font-semibold text-gray-700 hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Reports
                </Link>
                <Link 
                  to="/settings" 
                  className="transition font-semibold text-gray-700 hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="transition font-semibold text-red-600 hover:text-red-700 text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}