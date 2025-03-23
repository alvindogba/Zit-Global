// src/components/CTA.tsx
import React from "react";

const CTA: React.FC = () => {
  return (
    <div className="container mx-auto text-center bg-secondary  py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Make an Impact, or Learn?
      </h2>
      <p className="text-lg mb-8">
        Join us today and start your journey as a mentor or mentee.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button className="bg-transparent border border-2 border-primary  text-primary font-semibold px-6 py-3 rounded hover:bg-white hover:text-primary">
          Apply as a Mentor
        </button>
        <button className="bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-white hover:text-primary">
          Join as a Mentee
        </button>
      </div>
    </div>
  );
};

export default CTA;
