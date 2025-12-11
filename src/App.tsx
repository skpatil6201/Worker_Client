import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactWidget from './components/ContactWidget';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import Links from './pages/Links';
import FirmRegistration from './pages/FirmRegistration';
import CandidateRegistration from './pages/CandidateRegistration';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/links" element={<Links />} />
            
            {/* Registration Routes */}
            <Route path="/firm-registration" element={<FirmRegistration />} />
            <Route path="/candidate-registration" element={<CandidateRegistration />} />
          </Routes>
        </main>
        <Footer />
        <ContactWidget />
      </div>
    </Router>
  );
}

export default App;