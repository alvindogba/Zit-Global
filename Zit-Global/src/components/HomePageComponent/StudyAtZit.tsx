import { Link } from "react-router-dom";
import SideImg3 from "../../asset/images/Study at ZIT.jpg";

export default function StudyAtZit() {
 

  return (
    <div className="max-w-8xl mx-auto font-sans bg-white text-dparacolor">
      <section className="py-16 lg:px-32 md:px-60 px-2 bg-gray-100 relative">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="font-noto text-2xl font-bold text-primary">Study at ZIT</h2>
          <p className="mt-2 font-roboto text-dparacolor md:w-[44rem] md:px-0  px-6">
          At Zongea Institute of Technology, we go beyond traditional education to ensure students learn, apply, and excel in real-world scenarios. Our Teach, Tutor, and Mentor (TTM) model provides a structured approach to hands-on learning, personalized support, and career-focused training to prepare you for success in the ever-evolving tech industry.
          </p>

          <div className="relative mt-8 md:w-[90%] max-w-full flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Image Display */}
            <img src={SideImg3} alt="Study at ZIT" className="w-full sm:w-[40rem] h-[22rem] mt-8 object-cover"
          />
            {/* Right Content (Moves Below on Small Screens) */}
            <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
              {/* Overlayed Content */}
              <div className="flex flex-col justify-center gap-4 px-10 py-8 lg:absolute md:left-[45%] lg:left-[60%] lg:top-[20%] bg-primary text-white w-full h-auto sm:w-[30rem]   shadow-lg mt-6 sm:mt-0">
                <h3 className="font-semibold font-noto text-lg">Hands-On Learning Experience</h3>
                <p className="mt-2 font-roboto text-sm">
                  Our programs are designed to bridge the gap between knowledge and application with a real-world, project-based curriculum. Through interactive learning and problem-solving exercises, students gain the confidence and technical skills to tackle challenges, build solutions, and excel in their fields.
                </p>
                <Link to="/admission" className="flex font-sans justify-center items-center hover:bg-white hover:text-primary font-medium mt-4 text-white bg-secondary hover:font-semibold w-32 h-8 rounded-md">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
