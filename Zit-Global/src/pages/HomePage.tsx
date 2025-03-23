import React, { lazy } from 'react';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Link } from 'lucide-react';
import MotivationBgImg from "../asset/images/Graduation-Bg-Img.jpg"

// Lazy load components
const Hero = lazy(() => import('../components/HomePageComponent/Hero/HeroSection'));
//const Events = lazy(() => import('../components/HomePageComponent/Hero/event'));
const SuccessStory = lazy(() => import('../components/HomePageComponent/Hero/SuccessStory'));
const OurApproach = lazy(() => import('../components/HomePageComponent/OurApproach'))
const StudyAtZit = lazy(() => import('../components/HomePageComponent/StudyAtZit'))
const ProgramsWeOffer = lazy(() => import('../components/HomePageComponent/ProgramsWeOffer'));
const TTM = lazy(() => import('../components/HomePageComponent/Hero/TTM'));
const TeachSomeone = lazy(() => import('../components/HomePageComponent/Hero/TeachSomeon'));
const UpComingEvent = lazy(() => import('../components/HomePageComponent/UpComingEvent'));
const TutorshipSection = lazy(() => import ('../components/HomePageComponent/TutorshipSection'))
const ReadyToStartSec = lazy(() => import('../components/MotivationPage/ReadyToStartSec'));

const HomePage: React.FC = () => {
    return (
        <main className="overflow-hidden">
                <Hero />
                <OurApproach />
                <StudyAtZit />
                <ProgramsWeOffer />
                <TutorshipSection />
                <div className="text-white py-16" style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 90, 1), rgba(0, 0, 90, 0.98)), url(${MotivationBgImg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                    }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold mb-6 text-white">Ready to Start Learning?</h2>
                    <p className="text-md text-white mb-8 max-w-2xl mx-auto">
                        Join our community of learners and kickstart your career in technology and design.
                        All courses are free and designed to help you successed.
                     </p>
                    <Link
                    to="/admission"
                    className="border border-white font-bold text-xs hover:px-6 hover:py-2 text-white px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
                    >
                    Apply Now
                    </Link>
                    </div>
                </div>
                <ReadyToStartSec />
                <TTM />
                <TeachSomeone />
                <TTM />
                <SuccessStory /> 
                <UpComingEvent />
                <ScrollToTopButton />
        </main>
    );
};

export default HomePage;
