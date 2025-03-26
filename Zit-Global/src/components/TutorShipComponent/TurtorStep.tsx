// src/components/Steps.tsx
import React from "react";
import { Link } from 'react-router-dom'
import img from "../../asset/images/Tutor Sample.png"

const TutorSteps: React.FC = () => {
  return (
    <section className="bg-white py-12 md:px-40">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left Side: Steps */}
        <div className="md:w-1/2">
          <h2 className="font-noto text-3xl font-bold text-gray-900 mb-6">
            Start Tutoring in Just 4 Steps
          </h2>

          {/* Steps List */}
          <div className="space-y-6 text-gray-800">
            <div>
              <h3 className="font-noto font-semibold text-lg text-gray-900 mb-1">
                1. Apply Online
              </h3>
              <p className="font-roboto">
                Complete a quick application to share your experience, skills,
                and interests.
              </p>
            </div>

            <div>
              <h3 className="font-noto font-semibold text-lg text-gray-900 mb-1">
                2. Show Your Expertise
              </h3>
              <p className="font-roboto">
                Participate in a short interview and verify your qualifications.
              </p>
            </div>

            <div>
              <h3 className="font-noto font-semibold text-lg text-gray-900 mb-1">
                3. Create Your Profile
              </h3>
              <p className="font-roboto">
                Build a profile that highlights your expertise and availability
                for students to find you.
              </p>
            </div>

            <div>
              <h3 className="font-noto font-semibold text-lg text-gray-900 mb-1">
                4. Start Mentoring
              </h3>
              <p className="font-roboto">
                Get matched with students and begin earning while making a
                difference.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link to="/icc/mentor" className="font-sans mt-8 px-6 py-3 bg-primary text-white font-semibold rounded hover:bg-indigo-700 transition">
              Get Started Now
            </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 flex justify-center mt-4  ">
          {/* Replace with your actual image */}
          <img
            src={img}
            alt="Mentoring illustration"
            className="w-full max-w-sm rounded "
          />
        </div>
      </div>
    </section>
  );
};

export default TutorSteps;
