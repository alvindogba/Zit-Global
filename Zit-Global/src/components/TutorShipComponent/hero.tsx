// src/components/Hero.tsx
import React from "react";
import img from "../../asset/images/Hero-guilding-hand.jpg"
const Hero: React.FC = () => {
  return (
    <section
      className="
        relative 
        h-[400px] 
        bg-cover 
        bg-top 
        flex 
        items-center 
        justify-start
        md:px-20
      "
      // Replace this URL with the actual path to your background image
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {/* Overlay (darkens the background for better text visibility) */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 md:w-[50%]">
          Empower Learners Through Personalized Tutoring
        </h1>
        

        <div className="flex flex-wrap gap-4">
    
          <button
            className="
              bg-primary
              text-white 
              font-semibold 
              px-6 
              py-3 
              rounded 
              hover:bg-white
              hover:text-primary
            "
          >
            Apply Now and Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
