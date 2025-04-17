import heroImage from "../../asset/images/ICC hero image.jpg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="relative flex items-end text-white py-10 px-6 md:px-40"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-primary/40 "></div>

      {/* Content */}
      <div className="relative z-10 max-w-[600px]">
        <h1 className="font-noto md:text-3xl text-2xl font-bold mb-10" >
          Empowering Futures Through Mentorship, Tutoring, and Teaching
        </h1>
        <p className="font-roboto mb-10 text-lg">
          Join the Guiding Hands Program and unlock your potential with personalized guidance and support.
        </p>
        <div className="flex mt-6 mb-8 space-x-4">
      
          <Link to="/icc/mentor" className="bg-secondary px-4 md:px-3 py-2 rounded-md text-white hover:bg-white hover:text-primary hover:font-semibold ">
            Get Involved 
          </Link>
        </div>
      </div>
    </section>
  );
}
