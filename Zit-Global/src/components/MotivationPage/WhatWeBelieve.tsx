import { GraduationCap, Users, Target, Backpack } from 'lucide-react';

export default function WhatWeBelieve() {
  const beliefs = [
    {
      icon: GraduationCap,
      title: "Be a Teacher Today and Impact the Future Now!",
      description: "At Zongea Institute of Technology, we offer a wide array of courses designed to empower learners with the skills and knowledge needed for success. Our courses are tailored to meet the needs of students in Liberia, ensuring a comprehensive and inclusive educational experience."
    },
    {
      icon: Users,
      title: "Join a Community of Learners",
      description: "Our programs foster collaboration and mentorship, ensuring that every student gets the guidance they need to thrive in a technology-driven world."
    },
    {
      icon: Backpack,
      title: "Equipping the Next Generation",
      description: "We provide learners with the tools and resources they need to build careers in the ever-evolving tech industry, from coding to cybersecurity."
    },
    {
      icon: Target,
      title: "Focused on Success",
      description: "We don't just teach skills; we help students develop career strategies to ensure they can secure opportunities in Liberia and beyond."
    }
  ];

  return (
    <section className="px-4 md:px-20 pt-20 pb-4 md:pb-6 bg-white">
      <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-6">
        {beliefs.map((belief, index) => (
          <div
            key={index}
            className={`w-full lg:w-[45%] flex flex-col md:flex-row justify-between 
            ${index === 0 || index === 2 ? 'bg-gray-200' : 'bg-white'} 
            md:${index % 2 === 0 ? 'bg-white' : 'bg-gray-200'} 
            p-6 rounded-lg`}
          >
            {/* Icon Container */}
            <div className="w-16 h-16 flex justify-center items-center bg-primary/10 rounded-full">
              <belief.icon className="w-8 h-8 text-primary-600" />
            </div>

            {/* Text Content */}
            <div className="md:ml-4 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-primary w-[90%] mt-2">
                {belief.title}
              </h2>
              <p className="text-gray-700 mt-5 leading-relaxed md:w-[80%]">
                {belief.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
