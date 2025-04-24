import React, { lazy } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';

// Lazy load components
const Hero = lazy(() => import('../components/HomePageComponent/HeroSection'));
const OurApproach = lazy(() => import('../components/HomePageComponent/OurApproach'))
const StudyAtZit = lazy(() => import('../components/HomePageComponent/StudyAtZit'))
const ProgramsWeOffer = lazy(() => import('../components/HomePageComponent/ProgramsWeOffer'));
const TTM = lazy(() => import('../components/HomePageComponent/TTM'));
const TeachSomeone = lazy(() => import('../components/HomePageComponent/Hero/TeachSomeon'));
const UpComingEvent = lazy(() => import('../components/HomePageComponent/UpComingEvent'));
const TutorshipSection = lazy(() => import ('../components/HomePageComponent/TutorshipSection'))
const ReadyToStartSec = lazy(() => import('../components/MotivationPage/ReadyToStartSec'));
import SuccessStory from '../components/HomePageComponent/Hero/SuccessStory';

const HomePage: React.FC = () => {
    return (
        <main className="overflow-hidden">
                <Hero/>
                <OurApproach />
                <StudyAtZit />
                <ProgramsWeOffer />
                <TutorshipSection />
                <ReadyToStartSec />
                <TeachSomeone />
                <TTM />
                <SuccessStory />
                <UpComingEvent />
                <ScrollToTopButton />
        </main>
    );
};

export default HomePage;
