import HeroSection from "../../components/GuidingHand/heroSection";
import ProgramsSection from "../../components/GuidingHand/ProgramSection";
import InfoSection from "../../components/GuidingHand/Info-section";
import HowItWorks from "../../components/GuidingHand/How-it-works";
import Statistic from "../../components/GuidingHand/Statistic"
import VisionSection from "../../components/GuidingHand/Vission";
import UpComingEvent from "../../components/HomePageComponent/UpComingEvent";
import CallToAction from "../../components/GuidingHand/CTA-Global-Computer";

export default function GuidingHandingProgram() {
    return (
        <div>
            <HeroSection />
            <ProgramsSection />
            <InfoSection />
            <HowItWorks />
            <Statistic />
            <VisionSection />
            <UpComingEvent />
            <CallToAction />

        </div>
    )
}