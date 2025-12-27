import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid ml-2 grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* About Section - Takes 2 columns */}
          <div className="text-justify md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white">ABOUT</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
           S K ASSOCIATES is a professional services firm providing specialized auditing candidates and comprehensive outsourcing solutions for accounting and Chartered Accountant services. Established in 2019 by Mr. Pradip Ajinath Thorat, the firm is dedicated to delivering high standards of accuracy, regulatory compliance, and operational efficiency. Backed by our parent organization, Shree Kotling Industries, we support businesses in optimizing their financial processes, strengthening governance, and achieving sustainable long-term growth.
            </p>
          </div>

          {/* Services Section */}
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">SERVICES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Accounting & Bookkeeping
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Audit & Assurance
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Direct Tax Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Indirect Tax (GST)
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Company Law & ROC
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Virtual CFO Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">ACCOUNT</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/firm-registration" className="text-gray-300 hover:text-white transition-colors">
                  Firm Registration
                </Link>
              </li>
              <li>
                <Link to="/candidate-registration" className="text-gray-300 hover:text-white transition-colors">
                  Candidate Registration
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/links" className="text-gray-300 hover:text-white transition-colors">
                  Links
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">CONTACT INFO</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <p className="text-gray-300">
                 Teerth Technospace, Baner, Pune – 411045
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+917276469398" className="text-gray-300 hover:text-white transition-colors">
                  +91-7276469398
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+919730517424" className="text-gray-300 hover:text-white transition-colors">
                   +91-9730517424
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href="mailto: info.skassociates4@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  info.skassociates4@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 ml-2  pt-8">
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-sm">
              Copyrights © All rights reserved to S.K. Infotech Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}