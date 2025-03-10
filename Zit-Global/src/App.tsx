import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectSkeleton, BlogPostSkeleton, ServiceSkeleton } from './components/Skeleton';
import { Header } from './components/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const DonationPage = lazy(() => import('./pages/Donationations'));

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

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
            {/* The Donation route */}
            <Route
              path="/donate"
              element={
                <Suspense fallback={<ServiceSkeleton />}>
                  <DonationPage />
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
