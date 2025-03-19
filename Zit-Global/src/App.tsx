import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectSkeleton, BlogPostSkeleton, ServiceSkeleton, CoursesSkeleton } from './components/Skeleton';
import { Header } from './components/Header';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Footer from './components/Footer/index'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const HomePage = lazy(() => import('./pages/HomePage'))
const DonationPage = lazy(() => import('./pages/Donationations/DonationPage'));
const DonationSuccess = lazy(() => import('./pages/Donationations/DonationSuccess'));
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
const AdmissionSuccess = lazy(() => import('./pages/Admission/AdminssionSuccessPage'));
const GuidingHandPage =lazy(() => import('./pages/MakeImpact/GuidingHand'))
// const GuidingHand =lazy(() => import('./pages/MakeImpact/GuidingHand'))
//Each course offer page
const Fullstack =lazy(() => import('./pages/CoursesDetails/FullStackDevelopment'))
const UIUXDesign =lazy(() => import('./pages/CoursesDetails/UIUXDesign'))
const GraphicDesign =lazy(() => import('./pages/CoursesDetails/GraphicDesign'))
const CyberSecurity =lazy(() => import('./pages/CoursesDetails/CyberSercurity'))
const MentorshipDashboard =lazy(() => import('./pages/Dashboards/MentorshipDashboard'))


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
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <div className="pt-20">
        <ScrollToTop />

          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <Home />
                </Suspense>
              }
            />
             <Route
              path="/home"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/cohorts"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <Cohort />
                </Suspense>
              }
            />
            <Route
              path="/students"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <Students />
                </Suspense>
              }
            />
             <Route
              path="/how-to-apply"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <HowToApply />
                </Suspense>
              }
            />
            <Route
              path="/courses"
              element={
                <Suspense fallback={<CoursesSkeleton />}>
                  <Courses />
                </Suspense>
              }
            />
            <Route
              path="/motivation"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <Motivation />
                </Suspense>
              }
            />
             <Route
              path="/guilding-hands-program"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <GuidingHandPage />
                </Suspense>
              }
            />
            <Route
              path="/mentorship-program"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <Mentorship />
                </Suspense>
              }
            />
            <Route
              path="/mentorship-dashboard"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <MentorshipDashboard />
                </Suspense>
              }
            />
            <Route
              path="/tutorship-program"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <Tutorship />
                </Suspense>
              }
            />
            <Route
              path="/be-a-donor"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <BeADonor />
                </Suspense>
              }
            />
            <Route
              path="/admission"
              element={
                <Suspense fallback={<BlogPostSkeleton />}>
                  <Admission />
                </Suspense>
              }
            />
            <Route
              path="/admission-success"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <AdmissionSuccess />
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
            {/* The Donation route */}
            <Route
              path="/donate"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <DonationPage />
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
             {/* The Couses Page route */}
             <Route
              path="/courses/ui-ux-design"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <UIUXDesign />
                </Suspense>
              }
            />
             <Route
              path="/courses/graphic-design"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <GraphicDesign />
                </Suspense>
              }
            />
             <Route
              path="/courses/cybersecurity"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <CyberSecurity />
                </Suspense>
              }
            />
             <Route
              path="/courses/full-stack-development"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <Fullstack />
                </Suspense>
              }
            />
        
          </Routes>
        </div>
           {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
    </Elements>
    </PayPalScriptProvider>
  );
}

export default App;
