import React from "react";
import { FaGlobeAmericas, FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";

const VisionSection: React.FC = () => {
  const visionCards = [
    {
      icon: <FaGlobeAmericas className="w-8 h-8 text-secondary" />,
      title: "Expanding Our Reach",
      description: "We aim to bring mentorship opportunities to underserved communities worldwide, breaking down barriers to education and professional development."
    },
    {
      icon: <FaUsers className="w-8 h-8 text-secondary" />,
      title: "Building Communities",
      description: "Creating lasting networks of educators that cross national identities and boundaries."
    },
    {
      icon: <FaLightbulb className="w-8 h-8 text-secondary" />,
      title: "Innovation in Learning",
      description: "Implementing cutting-edge technology to expand mentorship access through AI-powered matching and virtual reality sessions."
    },
    {
      icon: <FaHandshake className="w-8 h-8 text-secondary" />,
      title: "Global Impact",
      description: "Fostering cross-cultural exchange and understanding through international mentoring programs and cultural initiatives."
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-40">
      <div className="w-9xl mx-auto text-center">
        {/* Heading */}
        <h2 className="font-noto text-3xl md:text-4xl font-bold text-primary">
          Our Vision for the Future
        </h2>

        {/* Subheading */}
        <p className="font-roboto mt-2 text-dparacolor max-w-2xl mx-auto">
          The Impact & Connect Center - TTM Program is a free tech school initiative in Liberia that offers mentorship, tutorship, and teaching.
        </p>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {visionCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
              </div>
              <h3 className="font-noto text-lg font-bold text-primary">
                {card.title}
              </h3>
              <p className="font-roboto mt-2 text-sm text-dparacolor">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;