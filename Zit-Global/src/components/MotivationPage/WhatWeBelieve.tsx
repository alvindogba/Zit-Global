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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {beliefs.map((belief, index) => (
          <div
            key={index}
            className={`
              flex flex-col md:flex-row p-6 rounded-lg
              ${index === 0 || index === 3 ? 'lg:bg-gray-100' : 'lg:shadow-md'}
              ${index % 2 === 0 ? 'md:bg-gray-100' : 'md:shadow-md'}
              ${index % 2 !== 0 ? 'lg:shadow-md' : ''}
              transition-all duration-300
            `}
          >
            {/* Perfect Circle Icon Container */}
            <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <belief.icon className="w-7 h-7 text-secondary" />
              </div>
            </div>

            {/* Text Content */}
            <div className="md:ml-6 text-center md:text-left">
              <h2 className="font-noto text-xl font-bold text-primary mt-2">
                {belief.title}
              </h2>
              <p className="font-roboto text-dparacolor mt-4 leading-relaxed">
                {belief.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}