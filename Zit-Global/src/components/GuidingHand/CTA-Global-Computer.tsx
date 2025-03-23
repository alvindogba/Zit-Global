import img from "../../asset/images/Vector 17.png"
import { Link } from "react-router-dom";

// src/components/CallToAction.tsx
export default function CallToAction() {
    return (
      <section className="py-20 text-center flex flex-col items-center bg-secondary">
        <img src={img} alt="" className="mb-4" />
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Join Our Global Community of Educators Today.</h2>
     
        <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Link to="/mentorship-program"> 
        <button className="bg-primary px-6 py-2 rounded-lg text-white hover:bg-lightBlue">Become a Mentor</button>
        </Link>
        <Link to="/Admission">
          <button className="bg-white px-6 py-2 rounded-lg text-primary border border-primary hover:bg-gray-100">Apply Now</button>
        </Link>
        <Link to="/contact">
          <button className="bg-white px-6 py-2 rounded-lg text-primary border border-primary hover:bg-gray-100">Contact Us</button>
        </Link>
        </div>
      </section>
    );
  }
  