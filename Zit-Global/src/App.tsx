import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ScrollToTop from './components/common/ScrollToTop';
import DefaultSkeletion from './components/DefaultSkeletion';

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
const GuidingHandingProgram =lazy(() => import('./pages/MakeImpact/GuidingHandingProgram'))
// const GuidingHand =lazy(() => import('./pages/MakeImpact/GuidingHand'))
//Each course offer page
const Fullstack =lazy(() => import('./pages/CoursesDetails/FullStackDevelopment'))
const UIUXDesign =lazy(() => import('./pages/CoursesDetails/UIUXDesign'))
const GraphicDesign =lazy(() => import('./pages/CoursesDetails/GraphicDesign'))
const CyberSecurity =lazy(() => import('./pages/CoursesDetails/CyberSercurity'))
const MicrosoftOffice =lazy(() => import('./pages/CoursesDetails/MicrosoftOfficeDetailPage'))
const DatabaseAdmin =lazy(() => import('./pages/CoursesDetails/DatabaseAdminDetailPage'))
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
        <div className="pt-20">
        <ScrollToTop />

          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Home />
                </Suspense>
              }
            />
             <Route
              path="/home"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/cohorts"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Cohort />
                </Suspense>
              }
            />
            <Route
              path="/students"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Students />
                </Suspense>
              }
            />
             <Route
              path="/how-to-apply"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <HowToApply />
                </Suspense>
              }
            />
        
            <Route
              path="/courses"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Courses />
                </Suspense>
              }
            />
            <Route
              path="/motivation"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Motivation />
                </Suspense>
              }
            />
             <Route
              path="/guiding-hands-program"
              element={
                <Suspense fallback={<ProjectSkeleton />}>
                  <GuidingHandingProgram />
                </Suspense>
              }
            />
            <Route
              path="/mentorship-program"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Mentorship />
                </Suspense>
              }
            />
            <Route
              path="/mentorship-dashboard"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <MentorshipDashboard />
                </Suspense>
              }
            />
            <Route
              path="/tutorship-program"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Tutorship />
                </Suspense>
              }
            />
            <Route
              path="/be-a-donor"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <BeADonor />
                </Suspense>
              }
            />
            <Route
              path="/admission"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Admission />
                </Suspense>
              }
            />
            <Route
              path="/admission-success"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <AdmissionSuccess />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Contact />
                </Suspense>
              }
            />
            {/* The Donation route */}
            <Route
              path="/donate"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <DonationPage />
                </Suspense>
              }
            />
           <Route
              path="/success"
              element={
                <Suspense fallback={<DefaultSkeletion />}> 
                  <DonationSuccess />
                </Suspense>
              }
            /> 
             {/* The Couses Page route */}
             <Route
              path="/courses/ui-ux-design"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <UIUXDesign />
                </Suspense>
              }
            />
             <Route
              path="/courses/graphic-design"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <GraphicDesign />
                </Suspense>
              }
            />
             <Route
              path="/courses/cybersecurity"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <CyberSecurity />
                </Suspense>
              }
            />
            <Route
              path="/courses/full-stack-development"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <Fullstack />
                </Suspense>
              }
            />
            <Route
              path="/courses/microsoft-office"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <MicrosoftOffice />
                </Suspense>
              }
            />
            <Route
              path="/courses/database-admin"
              element={
                <Suspense fallback={<DefaultSkeletion />}>
                  <DatabaseAdmin />
                </Suspense>
              }
            />
        
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </Elements>
    </PayPalScriptProvider>
  );
}

export default App;
