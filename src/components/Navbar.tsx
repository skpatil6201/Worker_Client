import { Link } from 'react-router-dom';
import logo from '../assets/logoss.png';
export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" >
            <img className='h-12' src={logo} alt="" />
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-indigo-200 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-indigo-200 transition">
              About
            </Link>
            <Link to="/features" className="hover:text-indigo-200 transition">
              Features
            </Link>
            <Link to="/contact" className="hover:text-indigo-200 transition">
              Contact
            </Link>
            <Link to="/login" className="hover:text-indigo-200 transition">
              Login
            </Link>
            <Link to="/signup" className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-indigo-50 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
