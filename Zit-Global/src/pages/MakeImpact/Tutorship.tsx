import Hero from "../../components/TutorShipComponent/hero";
import ProgramOverview from "../../components/MentorShipComponent/ProgramOverview";
import ScrollToTop from "../../components/common/ScrollToTop";
import WhyJoin from "../../components/TutorShipComponent/WhyJoin";
import TutorSteps from "../../components/TutorShipComponent/TurtorStep";
import CTA from "../../components/MentorShipComponent/CTA";
const GetMentorShip = () => {
return(
        <div>
            <Hero />
            <ProgramOverview />
            <WhyJoin />
            <TutorSteps />
            <CTA />
            <ScrollToTop />
        </div>
)
};

export default GetMentorShip;
