import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectSkeleton, BlogPostSkeleton, ServiceSkeleton, CoursesSkeleton } from './components/Skeleton';
import { Header } from './components/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Footer from './components/Footer/index'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Header } from './components/Header';
import { ProjectSkeleton, BlogPostSkeleton, ServiceSkeleton } from './components/Skeleton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const DonationPage = lazy(() => import('./pages/Donationations/DonationPage'));
const DonationSuccess = lazy(() => import('./pages/Donationations/DonationSuccess'));
const DonationPage = lazy(() => import('./pages/Donationations/DonationPage'));
const PaymentSuccessPage = lazy(() => import('./pages/Donationations/PaymentSucessPage'));
const Admission = lazy(() => import('./pages/Admission/AdmissionPage'));
const HowToApply = lazy(() => import('./pages/Admission/HowToApply'));
const Students = lazy(() => import('./pages/StudentsPage'));
const Motivation = lazy(() => import('./pages/MotivationPage'));
const Contact = lazy(() => import('./pages/ContactPage'));
const Courses = lazy(() => import('./pages/CoursesPage'))
const Cohort = lazy(() => import('./pages/CohortPage'))
const BeADonor =lazy(() => import('./pages/MakeImpact/BeADonor'))
const Mentorship =lazy(() => import('./pages/MakeImpact/Mentorship'))
const Tutorship =lazy(() => import('./pages/MakeImpact/Tutorship'))
const GuidingHand =lazy(() => import('./pages/MakeImpact/GuidingHand'))
//Each course offer page
const Fullstack =lazy(() => import('./pages/CoursesDetails/FullStackDevelopment'))
const UIUXDesign =lazy(() => import('./pages/CoursesDetails/UIUXDesign'))
const GraphicDesign =lazy(() => import('./pages/CoursesDetails/GraphicDesign'))
const CyberSecurity =lazy(() => import('./pages/CoursesDetails/CyberSercurity'))


// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <PayPalScriptProvider options={{
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD",
      components: "buttons,funding-eligibility"
    }}>
      <Elements stripe={stripePromise}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<ServiceSkeleton />}>
                      <Home />
                    </Suspense>
                  }
                />
                <Route
                  path="/success"
                  element={
                    <Suspense fallback={<ServiceSkeleton />}>
                      <DonationSuccess />
                    </Suspense>
                  }
                />
                <Route
                  path="/donate"
                  element={
                    <Suspense fallback={<ServiceSkeleton />}>
                      <DonationPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <Suspense fallback={<ServiceSkeleton />}>
                      <About />
                    </Suspense>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <Suspense fallback={<ServiceSkeleton />}>
                      <Services />
                    </Suspense>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <Suspense fallback={<ProjectSkeleton />}>
                      <Projects />
                    </Suspense>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <Suspense fallback={<BlogPostSkeleton />}>
                      <Blog />
                    </Suspense>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Suspense fallback={<ServiceSkeleton />}>
                      <Contact />
                    </Suspense>
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      </Elements>
    </PayPalScriptProvider>
  );
}

export default App;
