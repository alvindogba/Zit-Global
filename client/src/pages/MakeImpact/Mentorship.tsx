import Hero from "../../components/MentorShipComponent/Hero"
import ScrollToTopButton from '../../components/ScrollToTopButton';
import ProgramOverview from "../../components/MentorShipComponent/ProgramOverview";
import Benefits from "../../components/MentorShipComponent/Benefits";
import Steps from "../../components/MentorShipComponent/Steps";
import MentorshipPaths from "../../components/MentorShipComponent/MentorshipPaths";
import CTA from "../../components/MentorShipComponent/CTA";
const GetMentorShip = () => {

            return (
                <div>
                    <Hero />
                    <ProgramOverview />
                     <Benefits />
                     <Steps />
                     <MentorshipPaths /> 
                    <CTA /> 
                    <ScrollToTopButton /> 
 

                </div>
            );               
  
};

export default GetMentorShip;
