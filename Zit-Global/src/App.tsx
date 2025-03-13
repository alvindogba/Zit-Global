import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectSkeleton, BlogPostSkeleton, ServiceSkeleton, CoursesSkeleton } from './components/Skeleton';
import { Header } from './components/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Footer from './components/Footer/index'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const HomePage = lazy(() => import('./pages/HomePage'))
const DonationPage = lazy(() => import('./pages/Donationations/DonationPage'));
// const PaymentSuccessPage = lazy(() => import('./pages/Donationations/PaymentSucessPage'));
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

// PayPal initial options
const paypalOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  components: "buttons",
  vault: true,
  "enable-funding": ["venmo", "paylater"],
  "disable-funding": ["card"],
  "data-sdk-integration-source": "react-paypal-js",
  "data-uid-auto": true,
  "data-user-id-token": true,
  locale: "en_US",
  "buyer-country": "US"
};

function App() {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Elements stripe={stripePromise}>
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <div className="pt-20">
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
                  <GuidingHand />
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
              path="/toturship-program"
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
            {/* <Route
              path="/donation-success"
              element={
                <Suspense fallback={<ServiceSkeleton />}> 
                  <PaymentSuccessPage />
                </Suspense>
              }
            /> */}
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
