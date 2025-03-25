import React from "react";
import img from "../../asset/images/Hero-guilding-hand.jpg"

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
          <p className="font-roboto text-gray-600 mb-8">
            The Guiding Hands Program is a free tech school initiative in Liberia 
            that offers mentorship, tutorship, and teaching.
          </p>

          {/* Four Steps (in two columns on medium screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Step 1 */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                1
              </div>
              <div>
                <h3 className="font-noto font-semibold text-gray-800">Apply</h3>
                <p className="font-roboto text-gray-600 text-sm">
                  Fill out the application form.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
            2
              </div>
              <div>
                <h3 className="font-noto font-semibold text-gray-800">Get Matched</h3>
                <p className="font-roboto text-gray-600 text-sm">
                  We pair you with a mentor, tutor, or course.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
            3
              </div>
              <div>
                <h3 className="font-noto font-semibold text-gray-800">Connect</h3>
                <p className="font-roboto text-gray-600 text-sm">
                  Schedule your first meeting and start your journey.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
            4
              </div>
              <div>
                <h3 className="font-noto font-semibold text-gray-800">Start Learning</h3>
                <p className="font-roboto text-gray-600 text-sm">
                  Begin your journey with personalized guidance.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="flex h-full justify-center">
          <img
            src={img}
            alt="How It Works Illustration"
            className="md:w-60 h-full md:w-80"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
