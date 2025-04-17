// src/components/Hero.tsx
import React from "react";
import teachingHero from "../../asset/images/OT image .jpg";
import { Link } from 'react-router-dom';

const TeachingHero: React.FC = () => {
  return (
    <section
      className="relative h-[500px] bg-cover bg-center flex items-center justify-start md:px-20"
      style={{
        backgroundImage: `url(${teachingHero})`,
      }}
    >
      {/* Overlay (darkens the background for better text visibility) */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="font-noto text-4xl md:text-5xl font-bold text-white mb-6 md:w-[60%] leading-tight">
          Shape the Future of Education at ZIT
        </h1>
        
        <p className="text-white text-lg md:text-xl mb-8 md:w-[50%]">
          Join our network of exceptional educators and make a lasting impact in students' lives through innovative teaching.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link 
            to='/icc/teacher'
            className="font-sans bg-primary text-white font-medium px-8 py-3 rounded-md hover:bg-primary-dark transition-colors text-lg"
          >
            Apply to Teach
          </Link>
          {/* <Link 
            to='/school-partnership'
            className="font-sans bg-white text-primary font-medium px-8 py-3 rounded-md hover:bg-gray-100 transition-colors text-lg"
          >
            School Partnerships
          </Link> */}
        </div>
      </div>
    </section>
  );
};

export default TeachingHero;