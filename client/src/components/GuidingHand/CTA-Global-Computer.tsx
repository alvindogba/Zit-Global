// import img from "../../asset/images/Vector 17.png"
import { Link } from "react-router-dom";

// src/components/CallToAction.tsx
export default function CallToAction() {
    return (
      <section className="py-20 text-center flex flex-col items-center bg-gray-200">
        {/* <img src={img} alt="" className="mb-4" /> */}
        <h2 className="text-3xl font-bold text-primary mb-4">Join Our Global Community of Educators Today.</h2>
     
        <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Link to="/mentorship-program"> 
        <button className="bg-secondary px-3 py-2 rounded-md text-white hover:bg-primary hover:font-semibold">Become a Mentor</button>
        </Link>
        <Link to="/contact">
          <button className="bg-white px-3 py-2 rounded-md text-primary border border-primary hover:bg-primary hover:text-white hover:font-semibold">Contact Us</button>
        </Link>
        </div>
      </section>
    );
  }
  