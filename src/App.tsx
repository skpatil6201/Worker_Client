import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactWidget from './components/ContactWidget';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import Links from './pages/Links';
import AdminDashboard from './pages/AdminDashboard';
import FirmDashboard from './pages/FirmDashboard';
import CandidateDashboard from './pages/CandidateDashboard';

// Admin Pages
import ManageFirms from './pages/admin/ManageFirms';
import ManageCandidates from './pages/admin/ManageCandidates';
import ManageGallery from './pages/admin/ManageGallery';
import AdminPanel from './pages/admin/AdminPanel';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// Firm Pages
import Clients from './pages/firm/Clients';
import Projects from './pages/firm/Projects';
import FindCandidates from './pages/firm/FindCandidates';
import Billing from './pages/firm/Billing';
import FirmProfile from './pages/firm/FirmProfile';

// Candidate Pages
import FindJobs from './pages/candidate/FindJobs';
import MyApplications from './pages/candidate/MyApplications';
import Interviews from './pages/candidate/Interviews';
import Resume from './pages/candidate/Resume';
import CandidateProfile from './pages/candidate/CandidateProfile';

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
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/links" element={<Links />} />
            
            {/* Registration Routes - Redirect to main signup */}
            <Route path="/firm-registration" element={<Signup />} />
            <Route path="/candidate-registration" element={<Signup />} />
            
            {/* Dashboard Routes - Protected */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute requiredUserType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/firm-dashboard" element={
              <ProtectedRoute requiredUserType="firm">
                <FirmDashboard />
              </ProtectedRoute>
            } />
            <Route path="/candidate-dashboard" element={
              <ProtectedRoute requiredUserType="candidate">
                <CandidateDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin-panel" element={
              <ProtectedRoute requiredUserType="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/manage-firms" element={
              <ProtectedRoute requiredUserType="admin">
                <ManageFirms />
              </ProtectedRoute>
            } />
            <Route path="/manage-candidates" element={
              <ProtectedRoute requiredUserType="admin">
                <ManageCandidates />
              </ProtectedRoute>
            } />
            <Route path="/manage-gallery" element={
              <ProtectedRoute requiredUserType="admin">
                <ManageGallery />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute requiredUserType="admin">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute requiredUserType="admin">
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Firm Routes - Protected */}
            <Route path="/clients" element={
              <ProtectedRoute requiredUserType="firm">
                <Clients />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute requiredUserType="firm">
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/find-candidates" element={
              <ProtectedRoute requiredUserType="firm">
                <FindCandidates />
              </ProtectedRoute>
            } />
            <Route path="/billing" element={
              <ProtectedRoute requiredUserType="firm">
                <Billing />
              </ProtectedRoute>
            } />
            <Route path="/firm-profile" element={
              <ProtectedRoute requiredUserType="firm">
                <FirmProfile />
              </ProtectedRoute>
            } />
            
            {/* Candidate Routes - Protected */}
            <Route path="/find-jobs" element={
              <ProtectedRoute requiredUserType="candidate">
                <FindJobs />
              </ProtectedRoute>
            } />
            <Route path="/my-applications" element={
              <ProtectedRoute requiredUserType="candidate">
                <MyApplications />
              </ProtectedRoute>
            } />
            <Route path="/interviews" element={
              <ProtectedRoute requiredUserType="candidate">
                <Interviews />
              </ProtectedRoute>
            } />
            <Route path="/resume" element={
              <ProtectedRoute requiredUserType="candidate">
                <Resume />
              </ProtectedRoute>
            } />
            <Route path="/candidate-profile" element={
              <ProtectedRoute requiredUserType="candidate">
                <CandidateProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ContactWidget />
      </div>
    </Router>
  );
}

export default App;