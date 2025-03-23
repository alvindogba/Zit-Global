// src/components/ProgramOverview.tsx
import React from "react";
import img from "../../asset/images/Student-in-tech-Class.jpg"

const ProgramOverview: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20 md:px-40">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start">
        {/* Text Section */}
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 md:mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What is the ICC Mentorship Program?
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            The Impact & Connect Center (ICC) Mentorship Program is designed to
            bridge the gap between learning and real-world success. Our mentors
            provide valuable support, industry knowledge, and career coaching to
            students eager to grow.
          </p>
        </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src={img}
            alt="ICC Mentorship Program"
            className="w-full max-w-md h-auto object-cover rounded shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;
