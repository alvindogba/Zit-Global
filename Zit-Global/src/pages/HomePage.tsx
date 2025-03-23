import React, { lazy } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Header } from '../components/Header';
import  Footer  from '../components/Footer/index';

// Lazy load components
const Hero = lazy(() => import('../components/HomePageComponent/Hero/HeroSection'));
//const Events = lazy(() => import('../components/HomePageComponent/Hero/event'));
const SuccessStory = lazy(() => import('../components/HomePageComponent/Hero/SuccessStory'));
const OurApproach = lazy(() => import('../components/HomePageComponent/OurApproach'))
const StudyAtZit = lazy(() => import('../components/HomePageComponent/StudyAtZit'))
const ProgramsWeOffer = lazy(() => import('../components/HomePageComponent/ProgramsWeOffer'));
const TTM = lazy(() => import('../components/HomePageComponent/Hero/TTM'));
const TeachSomeone = lazy(() => import('../components/HomePageComponent/Hero/TeachSomeon'));
const JoinUs = lazy(() => import('../components/HomePageComponent/Hero/JoinUs'));
const UpComingEvent = lazy(() => import('../components/HomePageComponent/UpComingEvent'));
const TutorshipSection = lazy(() => import ('../components/HomePageComponent/TutorshipSection'))
const ReadyToStartSec = lazy(() => import('../components/MotivationPage/ReadyToStartSec'));

const HomePage: React.FC = () => {
    return (
        <main className="overflow-hidden">
                <Header />
                <Hero />
                <OurApproach />
                <TutorshipSection />
                <StudyAtZit />
                <ProgramsWeOffer />
                <ReadyToStartSec />
                <TTM />
                <TeachSomeone />
                <JoinUs />
                <SuccessStory /> 
                <UpComingEvent />
                <ScrollToTopButton />
                <Footer />
        </main>
    );
};

export default HomePage;
