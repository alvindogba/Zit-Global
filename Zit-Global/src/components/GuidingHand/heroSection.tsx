import heroImage from "../../asset/images/Hero-guilding-hand.jpg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="relative h-[70vh] md:h-[85vh] flex items-end text-white pb-10 px-6 md:px-40"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-primary bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[600px]">
        <h1 className="font-noto md:text-4xl text-3xl font-bold mb-10" >
          Empowering Futures Through Mentorship, Tutoring, and Teaching
        </h1>
        <p className="font-roboto mb-10 text-lg">
          Join the Guiding Hands Program and unlock your potential with personalized guidance and support.
        </p>
        <div className="flex mt-6 mb-8 space-x-4">
      
          <Link to="/icc/mentor" className="bg-primary px-4 md:px-6 py-2 rounded-sm text-white border border-primary ">
            Get Involved 
          </Link>
        </div>
      </div>
    </section>
  );
}
