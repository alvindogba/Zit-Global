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
          <h2 className="font-noto text-3xl font-bold text-primary mb-6">
            Start Tutoring in Just 4 Steps
          </h2>

          {/* Steps List */}
          <div className="space-y-6 text-dparacolor">
            <div>
              <h3 className="font-noto font-semibold text-lg text-primary mb-1">
                <span className="text-secondary">1.</span> Apply Online
              </h3>
              <p className="font-roboto text-dparacolor">
                Complete a quick application to share your experience, skills,
                and interests.
              </p>
            </div>

            <div>
              <h3 className="font-noto font-semibold text-lg text-primary mb-1">
                <span className="text-secondary">2.</span> Show Your Expertise
              </h3>
              <p className="font-roboto text-dparacolor">
                Participate in a short interview and verify your qualifications.
              </p>
            </div>

            <div>
              <h3 className="font-noto font-semibold text-lg text-primary mb-1">
                <span className="text-secondary">3.</span> Create Your Profile
              </h3>
              <p className="font-roboto text-dparacolor">
                Build a profile that highlights your expertise and availability
                for students to find you.
              </p>
            </div>

            <div>
              <h3 className="font-noto font-semibold text-lg text-primary mb-1">
                <span className="text-secondary">4.</span> Start Mentoring
              </h3>
              <p className="font-roboto text-dparacolor">
                Get matched with students and begin earning while making a
                difference.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link to="/icc/mentor" className="font-sans mt-8 px-3 py-2 bg-secondary text-white hover:font-semibold rounded-md hover:bg-primary transition">
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
            className="w-full max-w-sm rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default TutorSteps;
