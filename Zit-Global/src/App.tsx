import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
