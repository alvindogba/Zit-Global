import React, { lazy, Suspense } from 'react';

// Lazy load components
const Hero = lazy(() => import('../components/HomePageComponent/Hero'));
const Events = lazy(() => import('../components/HomePageComponent/Hero/event'));
const SuccessStory = lazy(() => import('../components/HomePageComponent/Hero/SuccessStory'));
const StudySucceed = lazy(() => import('../components/StudySucceed'));
const Testimonial = lazy(() => import('../components/Testimonial/Testimonial'));
const CallToAction = lazy(() => import('../components/HomePageComponent/CallToAction/index'));

const LoadingComponent = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg h-full w-full min-h-[200px]" />
);

const HomePage: React.FC = () => {
    return (
        <main className="overflow-hidden">
            <Suspense fallback={<LoadingComponent />}>
                <Hero />
                <Events />
                <SuccessStory />
                <StudySucceed />
                <Testimonial />
                <CallToAction />
            </Suspense>
        </main>
    );
};

export default HomePage;
