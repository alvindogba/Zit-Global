import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectSkeleton, BlogPostSkeleton, ServiceSkeleton } from './components/Skeleton';
import { Header } from './components/Header';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
