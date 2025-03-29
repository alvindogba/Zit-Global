// src/components/Hero.tsx
import React from "react";
import img from "../../asset/images/Hero-guilding-hand.jpg"
import { Link } from "react-router-dom"


const Hero: React.FC = () => {
  return (
    <section
      className="relative h-[500px] bg-cover bg-top flex items-center justify-startmd:px-20"
      // Replace this URL with the actual path to your background image
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* Overlay (darkens the background for better text visibility) */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="font-noto text-4xl md:text-5xl font-bold text-white mb-4 w-[50%]">
          Empowerment. Gaudiance. Inspiration
        </h1>
        <p className="font-roboto text-lg text-white mb-6 max-w-xl">
          Join our mentorship program and unlock your potential through
          personalized guidance from industry leaders.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link to='/icc/mentor'
            className="bg-secondary font-sans hover:bg-primary hover:font-semibold text-xs text-white px-3 sm:px-6 py-2 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
          >
            Become a Mentor
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
