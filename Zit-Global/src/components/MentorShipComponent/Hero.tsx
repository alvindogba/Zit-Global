// src/components/Hero.tsx
import React from "react";
import img from "../../asset/images/Hero-guilding-hand.jpg"
const Hero: React.FC = () => {
  return (
    <section
      className="
        relative 
        h-[500px] 
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
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 w-[50%]">
          Empowerment. Gaudiance. Inspiration
        </h1>
        <p className="text-lg text-white mb-6 max-w-xl">
          Join our mentorship program and unlock your potential through
          personalized guidance from industry leaders.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            className="
              bg-transparent
              border-2
              border-white 
              text-white
              font-semibold 
              px-6 
              py-3 
              rounded 
              hover:bg-white
              hover:text-primary
            "
          >
            Become a Mentor
          </button>
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
            Find a Mentor
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
