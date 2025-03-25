// src/components/Benefits.tsx
import React from "react";
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";

const Benefits: React.FC = () => {
  return (
    <section className="bg-white py-20 md:px-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          {/* Left Side: Heading */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <h2 className="font-noto text-3xl font-bold text-black mb-4">
              Why Join the ICC Mentorship Program?
            </h2>
          </div>

          {/* Right Side: Two Cards */}
          <div className="md:w-[60%] flex flex-col md:flex-row gap-4">
            {/* Card: For Students */}
            <div className="flex-1 bg-yellow-50 p-6 rounded shadow">
            <FaGraduationCap className="text-6xl text-primary mx-auto mb-2" />

              <h3 className="font-noto text-xl font-semibold text-primary text-center mb-4">
                For Students
              </h3>
              <div className="space-y-2 text-black">
                <p className="font-roboto mb-2">Learn directly from industry experts</p>
                <p className="font-roboto mb-2">Get career advice and networking opportunities</p>
                <p className="font-roboto mb-2">Gain confidence and clarity about your future</p>
              </div>
            </div>

            {/* Card: For Mentor */}
            <div className="flex-1 bg-green-50 p-6 rounded shadow">
            <FaChalkboardTeacher className="text-6xl text-primary text-center mx-auto mb-2" />

              <h3 className="font-noto text-xl font-semibold text-primary text-center mb-4">
                For Mentor
              </h3>
              <div className="space-y-2 text-black">
                <p className="font-roboto mb-2">Make an impact by guiding young professionals</p>
                <p className="font-roboto mb-2">Expand your leadership and coaching skills</p>
                <p className="font-roboto mb-2">Give back to the next generation of talent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
