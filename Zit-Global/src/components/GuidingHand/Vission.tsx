import React from "react";

const VisionSection: React.FC = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-40">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Our Vision for the Future
        </h2>

        {/* Subheading */}
        <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
          The Guiding Hands Program is a free tech school initiative in Liberia that offers mentorship, tutorship, and teaching.
        </p>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            {/* Icon (placeholder) */}
            <div className="flex justify-center mb-4">
              {/* Replace this SVG with your own icon or image */}
              <svg
                className="w-10 h-10 text-blue-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C18.627 0 24 5.372 24 12S18.627 24 12 24 0 18.628 0 12 5.372 0 12 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">
              Expanding Our Reach
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              We aim to bring mentorship opportunities to underserved
              communities worldwide, breaking down barriers to education
              and professional development.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex justify-center mb-4">
              {/* Icon placeholder */}
              <svg
                className="w-10 h-10 text-blue-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C18.627 0 24 5.372 24 12S18.627 24 12 24 0 18.628 0 12 5.372 0 12 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">
              Building Communities
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Creating lasting networks of educators that cross national 
              identities and boundaries.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex justify-center mb-4">
              {/* Icon placeholder */}
              <svg
                className="w-10 h-10 text-blue-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C18.627 0 24 5.372 24 12S18.627 24 12 24 0 18.628 0 12 5.372 0 12 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">
              Innovation in Learning
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Implementing cutting-edge technology to expand mentorship 
              access through AI-powered matching and virtual reality sessions.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              {/* Icon placeholder */}
              <svg
                className="w-10 h-10 text-blue-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C18.627 0 24 5.372 24 12S18.627 24 12 24 0 18.628 0 12 5.372 0 12 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Global Impact</h3>
            <p className="mt-2 text-sm text-gray-600">
              Fostering cross-cultural exchange and understanding through 
              international mentoring programs and cultural initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
