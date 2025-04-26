// src/components/CTA.tsx
import React from "react";
import { Link } from "react-router-dom";

const CTA: React.FC = () => {
  return (
    <div className="bg-gray-200 w-full">
       <div className=" container mx-auto text-center  py-12">
      <h2 className="font-noto text-3xl md:text-4xl font-bold mb-4">
        Ready to Make an Impact?
      </h2>
      <p className="font-roboto text-dparacolor text-lg mb-8">
        Join us today and start your journey as a tutor.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link to="/icc/tutor" className="bg-secondary text-white hover:font-semibold px-3 py-2 rounded-md hover:bg-primary">
          Apply as a Tutor
        </Link>
        
      </div>
    </div>
    </div>
   
  );
};

export default CTA;
