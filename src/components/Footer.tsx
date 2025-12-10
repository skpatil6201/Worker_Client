export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid ml-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">ABOUT</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              S.K. Associates LLP is a CA in Pune, a professionally managed firm 
              catering to domestic and international clients with a wide range of services in 
              domestic and international taxation, regulatory and advisory services, and 
              cross-border transaction-related services.
            </p>
          </div>

          {/* Services Section */}
          
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">SERVICES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Business Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Company Formation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Audit & Assurance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Direct Tax
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Corporate Laws
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Consultancy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  NRI Tax and Allied Services
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm ">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Links
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Head Office Section */}
          
          <div className="text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">HEAD OFFICE</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <p className="text-gray-300">
                  Office No:- B-2240, Ganga Trueno Business Park, New Airport Road, Near 
                  Dorabjee's Viman nagar, Pune-411014
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+917875037800" className="text-gray-300 hover:text-white transition-colors">
                  +91-7875037800
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <a href="tel:+919020299928000" className="text-gray-300 hover:text-white transition-colors">
                  +91-020-29992800
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href="mailto:cajitentelisara@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  cajitentelisara@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 ml-4  pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Copyrights © All rights reserved to S.K. Associates LLP
            </p>
            {/* <div className="flex items-center gap-4">
              <a 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get In Touch
              </a>
              <a 
                href="tel:+917875037800"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}