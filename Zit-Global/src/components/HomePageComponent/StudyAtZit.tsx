import { Link } from "react-router-dom";
import SideImg3 from "../../asset/images/Study at ZIT.jpg";

export default function StudyAtZit() {
 

  return (
    <div className=" font-sans text-dparacolor">
      <section className="py-16 md:px-32 px-2 bg-gray-100 relative">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="font-noto text-2xl font-bold text-primary">Study at ZIT</h2>
          <p className="mt-2 font-roboto text-dparacolor md:w-[37rem]  px-6">
            Unlock job-ready skills that open doors in today's tech landscape. No other program matches the depth and impact of our hands-on training in technology.
          </p>

          <div className="relative mt-8 md:w-[90%] max-w-full flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Image Display */}
            <img src={SideImg3} alt="Study at ZIT" className="w-full sm:w-[40rem] h-[22rem] mt-8 object-cover"
          />
            {/* Right Content (Moves Below on Small Screens) */}
            <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
              {/* Navigation Controls */}

              {/* Overlayed Content */}
              <div className="flex flex-col justify-center gap-4 px-10 py-8 lg:absolute lg:left-[50%] lg:top-[20%] bg-primary text-white w-full h-auto sm:w-[30rem]   shadow-lg mt-6 sm:mt-0">
                <h3 className="font-semibold font-noto text-lg">Personalized Support</h3>
                <p className="mt-2 font-roboto text-sm">
                  We provide tailored support to ensure every learner thrives. From one-on-one tutoring sessions to small-group discussions, our tutors are dedicated to helping you understand even the most complex topics.
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
