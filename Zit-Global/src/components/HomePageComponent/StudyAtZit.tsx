import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SideImg1 from "../../asset/images/support-1.jpg";
import SideImg2 from "../../asset/images/teaching-through-mentorring.jpg";
import SideImg3 from "../../asset/images/Support-classroom.jpg";

export default function StudyAtZit() {
  const images = [SideImg1, SideImg2, SideImg3];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className=" font-sans text-gray-900">
      <section className="py-16 md:px-32 px-2 bg-gray-100 relative">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h2 className="font-noto text-2xl font-bold text-primary">Study at ZIT</h2>
          <p className="mt-2 font-roboto text-gray-700 md:w-[37rem]  px-6">
            Unlock job-ready skills that open doors in today's tech landscape. No other program matches the depth and impact of our hands-on training in technology.
          </p>

          <div className="relative mt-8 md:w-[90%] max-w-full flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Image Display */}
            <img src={images[activeIndex]} alt="Study at ZIT" className="w-full sm:w-[40rem] h-[22rem] mt-8 object-cover"
          />
            {/* Right Content (Moves Below on Small Screens) */}
            <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
              {/* Navigation Controls */}
              <div className="flex w-full justify-center sm:justify-start gap-3 md:ml-52 md:mb-6">
                <ArrowLeft 
                  className="cursor-pointer text-black text-xl hover:text-gray-800 bg-gray-200 p-2 rounded-full shadow-lg"
                  onClick={prevImage}
                  size={35}

                />
                {/* Indicators */}
                <div className="flex mt-2 gap-2">
                  {images.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-6 h-[6px] rounded-full transition-all ${
                        index === activeIndex ? "bg-primary w-8" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
                <ArrowRight 
                  className="cursor-pointer text-black hover:text-gray-800 bg-gray-200 p-2 rounded-full shadow-lg"
                  onClick={nextImage}
                  size={35}
                />
              </div>

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
