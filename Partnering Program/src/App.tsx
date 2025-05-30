import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import images from './assests/forms-bg.jpg'
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import HowItWorks from './components/HowItWorks';
// import TestimonialsSection from './components/TestimonialsSection';
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
//header pages
import HowItWorksPage from './pages/HowItWorksPage';
import BenefitsPage from './pages/BenefitsPage';
import FaqPage from './pages/FaqPage';
import PartnersPage from './pages/PartnersPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rehydrateAuth } from './store/slices/authSlice';
import { RootState } from './store/store';


function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!token || !user) {
      dispatch(rehydrateAuth());
    }
  }, [dispatch, token, user]);
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={
            <div className="min-h-screen flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6)), url(${images})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in',
              }}
            >
                <div className="w-full md:w-1/2 p-6">
                  <LoginForm />
                </div>

            </div>
          } />
          <Route path="/signup" element={
            <div className="min-h-screen flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6)), url(${images})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in',
              }}
            >
                <div className="w-full md:w-1/2 p-6">
                  <SignUpForm />
                </div>
            </div>
          } />
          <Route path="/forgot-password" element={
            <div className="min-h-screen flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6)), url(${images})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in',
              }}
            >
                <div className="w-full md:w-1/2 p-6">
                  <ForgotPassword />
                </div>
            </div>
          } />
          <Route path="/reset-password" element={
            <div className="min-h-screen flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6), rgba(0, 0, 84, 0.6)), url(${images})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in',
              }}
            >
                <div className="w-full md:w-1/2 p-6">
                  <ResetPassword />
                </div>
            </div>
          } />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
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
              {/* <TestimonialsSection /> */}
              <DashboardSection />
              <FaqSection />
              <CtaSection />
              <Footer />
            </>
          } />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/partners" element={<PartnersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;