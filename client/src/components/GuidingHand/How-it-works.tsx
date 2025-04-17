import React from "react";
import img from "../../asset/images/Hero-guilding-hand.jpg";

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-40">
      {/* Two-column grid: left for text, right for illustration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Column */}
        <div>
          <h2 className="font-noto text-3xl md:text-4xl font-bold text-primary mb-8">
            How It Works?
          </h2>
          <p className="font-roboto text-dparacolor mb-8">
          The Impact and Connect Center (ICC) is the heartbeat of collaboration at Zongea Institute of Technology. Designed to bridge learning with real-world opportunities, the ICC empowers students, mentors, and industry leaders to connect, grow, and drive innovation together.
          <br />
          <br /><span>Here's how it works:</span>
          </p>

          {/* Four Steps (in two columns on medium screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                  <span className="flex items-center text-secondary justify-center w-full h-full">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-noto font-semibold text-primary">Apply</h3>
                <p className="font-roboto text-dparacolor text-sm">Fill out the application form.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                  <span className="flex items-center text-secondary justify-center w-full h-full">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-noto font-semibold text-primary">Get Matched</h3>
                <p className="font-roboto text-dparacolor text-sm">We pair you with a mentor, tutor, or course.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                  <span className="flex items-center text-secondary justify-center w-full h-full">3</span>
                </div>
              </div>
              <div>
                <h3 className="font-noto font-semibold text-primary">Connect</h3>
                <p className="font-roboto text-dparacolor text-sm">Schedule your first meeting and start your journey.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                  <span className="flex items-center text-secondary justify-center w-full h-full">4</span>
                </div>
              </div>
              <div>
                <h3 className="font-noto font-semibold text-primary">Start Learning</h3>
                <p className="font-roboto text-dparacolor text-sm">Begin your journey with personalized guidance.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="flex justify-center md:justify-end">
          <img
            src={img}
            alt="How It Works Illustration"
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;