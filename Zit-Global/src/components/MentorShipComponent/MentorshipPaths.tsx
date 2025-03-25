// src/components/MentorshipPaths.tsx
import React from "react";
import img from "../../asset/images/Mentor Session image.png"
const MentorshipPaths: React.FC = () => {
  return (
    <section className="bg-white py-12 min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Left Side: Image */}
        <div className="md:w-1/2 h-auto flex justify-center md:justify-end">
        {/* Replace the src with your actual image URL */}
          <img
            src={img}
            alt="Mentorship Speaker"
            className="w-full max-w-md  object-cover rounded shadow"
          />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="font-noto text-3xl font-bold text-gray-900 ">
            Find the Best Mentorship Path for You
          </h2>

          {/* 1-on-1 Mentorship */}
          <div className="mb-6">
            <h3 className="font-noto text-xl font-semibold text-primary ">
              1-on-1 Mentorship
            </h3>
            <p className="font-roboto text-gray-700">
              Get personalized guidance to help you navigate your career path.
            </p>
          </div>

          {/* Group Mentorship */}
          <div className="mb-6">
            <h3 className="font-noto text-xl font-semibold text-primary ">
              Group Mentorship
            </h3>
            <p className="font-roboto text-gray-700">
              Join a community of learners, engage in discussions, and gain
              insights from multiple mentors.
            </p>
          </div>

          {/* Career Development Sessions */}
          <div>
            <h3 className="font-noto text-xl font-semibold text-primary ">
              Career Development Sessions
            </h3>
            <p className="font-roboto text-gray-700">
              Access workshops, resume reviews, and career coaching sessions to
              level up your skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipPaths;
