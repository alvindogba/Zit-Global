import React from "react";
import { Link } from "react-router-dom";
import img from "../../asset/images/Mentor Sample.png";

const Steps: React.FC = () => {
  const stepsData = [
    {
      number: "1",
      title: "Apply Online",
      description: "Complete a quick application to share your experience, skills, and interests."
    },
    {
      number: "2",
      title: "Show Your Expertise",
      description: "Participate in a short interview and verify your qualifications."
    },
    {
      number: "3",
      title: "Create Your Profile",
      description: "Build a profile that highlights your expertise and availability for students to find you."
    },
    {
      number: "4",
      title: "Start Mentoring",
      description: "Get matched with students and begin earning while making a difference."
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left Side: Steps */}
        <div className="md:w-1/2">
          <h2 className="font-noto text-3xl font-bold text-gray-900 mb-6">
            Start Mentoring in Just 4 Steps
          </h2>

          {/* Steps List */}
          <div className="space-y-6 text-gray-800">
            {stepsData.map((step, index) => (
              <div key={index}>
                <h3 className="font-noto font-semibold text-lg text-gray-900 mb-1">
                  {step.number}. {step.title}
                </h3>
                <p className="font-roboto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link 
              to='/icc/mentor' 
              className="mt-8 md:mt-16 px-6 py-3 bg-primary text-white hover:font-semibold rounded-sm hover:border hover:border-primary hover:bg-white hover:text-primary transition"
            >
              Get Started Now
            </Link>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 flex justify-center mt-4 md:mt-16">
          <img
            src={img}
            alt="Mentoring illustration"
            className="w-full max-w-md rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default Steps;