import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorks from './components/HowItWorks';
import TestimonialsSection from './components/TestimonialsSection';
import DashboardSection from './components/DashboardSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Analytics from './pages/dashboard/Analytics';
import Referrals from './pages/dashboard/Referrals';
import Payouts from './pages/dashboard/Payouts';
import Reports from './pages/dashboard/Reports';
import Support from './pages/dashboard/Support';
import DashboardSettings from './pages/dashboard/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
              <LoginForm />
            </div>
          } />
          <Route path="/signup" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
              <SignUpForm />
            </div>
          } />
          <Route path="/forgot-password" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
              <ForgotPassword />
            </div>
          } />
          <Route path="/reset-password" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
              <ResetPassword />
            </div>
          } />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Analytics />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="payouts" element={<Payouts />} />
            <Route path="reports" element={<Reports />} />
            <Route path="support" element={<Support />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
          <Route path="/" element={
            <>
              <Header />
              <HeroSection />
              <BenefitsSection />
              <HowItWorks />
              <TestimonialsSection />
              <DashboardSection />
              <FaqSection />
              <CtaSection />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;