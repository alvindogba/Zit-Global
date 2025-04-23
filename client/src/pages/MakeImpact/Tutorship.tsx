import Hero from "../../components/TutorShipComponent/hero";
import ScrollToTop from "../../components/common/ScrollToTop";
import WhyJoin from "../../components/TutorShipComponent/WhyJoin";
import TutorSteps from "../../components/TutorShipComponent/TurtorStep";
import CTA from "../../components/MentorShipComponent/CTA";
import TProgramOverview from "../../components/TutorShipComponent/TProgramOverview";

const GetTutorShip = () => {
return(
        <div>
            <Hero />
            <TProgramOverview />
            <WhyJoin />
            <TutorSteps />
            <CTA />
            <ScrollToTop />
        </div>
)
};

export default GetTutorShip;
