import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import MotivationBgImg from "../../asset/images/Student in tech Class.jpg"; // Ensure you provide the correct path

const LandingSection = () => {
  return (
    // Hero Section
    <div className="relative bg-navy-600 text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Join Our Community of Future Tech Leaders
        </h1>
        <p className="text-md text-gray-200 max-w-2xl mb-8">
          Transform your passion for technology into a successful career. Learn, grow, and connect with like-minded individuals in our supportive learning environment.
        </p>
        <Link
          to="/admission"
          className=" font-bold text-xs hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
        >
          Start Your Journey <ArrowRight className="ml-2" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default LandingSection;
