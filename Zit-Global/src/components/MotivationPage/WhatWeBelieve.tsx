import { GraduationCap, Users, Target, Backpack } from 'lucide-react';

export default function WhatWeBelieve() {
  return (
    <section className="px-4 md:px-20 pt-20 pb-4 md:pb-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First Belief */}
        <div className="flex flex-col md:flex-row p-6 rounded-lg md:bg-gray-100 lg:bg-gray-100 transition-all duration-300">
          <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-secondary" />
            </div>
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h2 className="font-noto text-xl font-bold text-primary mt-2">
              Be a Teacher Today and Impact the Future Now!
            </h2>
            <p className="font-roboto text-dparacolor mt-4 leading-relaxed">
              At Zongea Institute of Technology, we offer a wide array of courses designed to empower learners with the skills and knowledge needed for success. Our courses are tailored to meet the needs of students in Liberia, ensuring a comprehensive and inclusive educational experience.
            </p>
          </div>
        </div>

        {/* Second Belief */}
        <div className="flex flex-col md:flex-row p-6 bg-white rounded-lg md:shadow-md lg:shadow-md transition-all duration-300">
          <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-secondary" />
            </div>
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h2 className="font-noto text-xl font-bold text-primary mt-2">
              Join a Community of Learners
            </h2>
            <p className="font-roboto text-dparacolor mt-4 leading-relaxed">
              Our programs foster collaboration and mentorship, ensuring that every student gets the guidance they need to thrive in a technology-driven world.
            </p>
          </div>
        </div>

        {/* Third Belief */}
        <div className="flex flex-col md:flex-row p-6 rounded-lg md:bg-gray-100 lg:bg-white lg:shadow-md transition-all duration-300">
          <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Backpack className="w-7 h-7 text-secondary" />
            </div>
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h2 className="font-noto text-xl font-bold text-primary mt-2">
              Equipping the Next Generation
            </h2>
            <p className="font-roboto text-dparacolor mt-4 leading-relaxed">
              We provide learners with the tools and resources they need to build careers in the ever-evolving tech industry, from coding to cybersecurity.
            </p>
          </div>
        </div>

        {/* Fourth Belief */}
        <div className="flex flex-col md:flex-row p-6 rounded-lg md:shadow-md  lg:bg-gray-100 transition-all duration-300">
          <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="w-7 h-7 text-secondary" />
            </div>
          </div>
          <div className="md:ml-6 text-center md:text-left">
            <h2 className="font-noto text-xl font-bold text-primary mt-2">
              Focused on Success
            </h2>
            <p className="font-roboto text-dparacolor mt-4 leading-relaxed">
              We don't just teach skills; we help students develop career strategies to ensure they can secure opportunities in Tech.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}