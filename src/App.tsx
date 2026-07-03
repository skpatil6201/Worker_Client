import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import ManageServices from './pages/admin/ManageServices';
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

function AppLayout() {
  const location = useLocation();
  const isPortalRoute = location.pathname.startsWith('/admin/')
    || location.pathname.startsWith('/firm/')
    || location.pathname.startsWith('/candidate/')
    || [
      '/admin-dashboard',
      '/admin-panel',
      '/manage-firms',
      '/manage-candidates',
      '/manage-gallery',
      '/manage-services',
      '/reports',
      '/settings',
      '/firm-dashboard',
      '/clients',
      '/projects',
      '/find-candidates',
      '/billing',
      '/firm-profile',
      '/candidate-dashboard',
      '/find-jobs',
      '/my-applications',
      '/interviews',
      '/resume',
      '/candidate-profile'
    ].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
    
      {!isPortalRoute && <Navbar />}

      

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
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredUserType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/firm/dashboard" element={
              <ProtectedRoute requiredUserType="firm">
                <FirmDashboard />
              </ProtectedRoute>
            } />
            <Route path="/candidate/dashboard" element={
              <ProtectedRoute requiredUserType="candidate">
                <CandidateDashboard />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes - Protected */}
            <Route path="/admin/panel" element={
              <ProtectedRoute requiredUserType="admin">
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-firms" element={
              <ProtectedRoute requiredUserType="admin">
                <ManageFirms />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-candidates" element={
              <ProtectedRoute requiredUserType="admin">
                <ManageCandidates />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-gallery" element={
              <ProtectedRoute requiredUserType="admin">
                <ManageGallery />
              </ProtectedRoute>
            } />
            <Route path="/admin/manage-services" element={
              <ProtectedRoute requiredUserType="admin">
                <ManageServices />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute requiredUserType="admin">
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute requiredUserType="admin">
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Firm Routes - Protected */}
            <Route path="/firm/clients" element={
              <ProtectedRoute requiredUserType="firm">
                <Clients />
              </ProtectedRoute>
            } />
            <Route path="/firm/projects" element={
              <ProtectedRoute requiredUserType="firm">
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/firm/find-candidates" element={
              <ProtectedRoute requiredUserType="firm">
                <FindCandidates />
              </ProtectedRoute>
            } />
            <Route path="/firm/billing" element={
              <ProtectedRoute requiredUserType="firm">
                <Billing />
              </ProtectedRoute>
            } />
            <Route path="/firm/profile" element={
              <ProtectedRoute requiredUserType="firm">
                <FirmProfile />
              </ProtectedRoute>
            } />
            
            {/* Candidate Routes - Protected */}
            <Route path="/candidate/find-jobs" element={
              <ProtectedRoute requiredUserType="candidate">
                <FindJobs />
              </ProtectedRoute>
            } />
            <Route path="/candidate/my-applications" element={
              <ProtectedRoute requiredUserType="candidate">
                <MyApplications />
              </ProtectedRoute>
            } />
            <Route path="/candidate/interviews" element={
              <ProtectedRoute requiredUserType="candidate">
                <Interviews />
              </ProtectedRoute>
            } />
            <Route path="/candidate/resume" element={
              <ProtectedRoute requiredUserType="candidate">
                <Resume />
              </ProtectedRoute>
            } />
            <Route path="/candidate/profile" element={
              <ProtectedRoute requiredUserType="candidate">
                <CandidateProfile />
              </ProtectedRoute>
            } />

            {/* Backward-compatible redirects for old flat URLs and common misspelling */}
            <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashbord" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin-panel" element={<Navigate to="/admin/panel" replace />} />
            <Route path="/manage-firms" element={<Navigate to="/admin/manage-firms" replace />} />
            <Route path="/manage-candidates" element={<Navigate to="/admin/manage-candidates" replace />} />
            <Route path="/manage-gallery" element={<Navigate to="/admin/manage-gallery" replace />} />
            <Route path="/manage-services" element={<Navigate to="/admin/manage-services" replace />} />
            <Route path="/reports" element={<Navigate to="/admin/reports" replace />} />
            <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />

            <Route path="/firm-dashboard" element={<Navigate to="/firm/dashboard" replace />} />
            <Route path="/firm/dashbord" element={<Navigate to="/firm/dashboard" replace />} />
            <Route path="/clients" element={<Navigate to="/firm/clients" replace />} />
            <Route path="/projects" element={<Navigate to="/firm/projects" replace />} />
            <Route path="/find-candidates" element={<Navigate to="/firm/find-candidates" replace />} />
            <Route path="/billing" element={<Navigate to="/firm/billing" replace />} />
            <Route path="/firm-profile" element={<Navigate to="/firm/profile" replace />} />

            <Route path="/candidate-dashboard" element={<Navigate to="/candidate/dashboard" replace />} />
            <Route path="/candidate/dashbord" element={<Navigate to="/candidate/dashboard" replace />} />
            <Route path="/find-jobs" element={<Navigate to="/candidate/find-jobs" replace />} />
            <Route path="/my-applications" element={<Navigate to="/candidate/my-applications" replace />} />
            <Route path="/interviews" element={<Navigate to="/candidate/interviews" replace />} />
            <Route path="/resume" element={<Navigate to="/candidate/resume" replace />} />
            <Route path="/candidate-profile" element={<Navigate to="/candidate/profile" replace />} />
        </Routes>
      </main>
      {!isPortalRoute && <Footer />}
      {!isPortalRoute && <ContactWidget />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
