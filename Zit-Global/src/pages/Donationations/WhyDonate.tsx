 import image from "../../asset/images/OT image .jpg"
import { FaLock, FaUsers, FaBriefcase, FaGlobe } from "react-icons/fa";

const WhyDonate = () => {
  return (
    <section className=" h-[85vh] flex flex-col md:flex-row justify-between bg-secondary  px-4 md:px-36 py-10 md:py-20 rounded-lg ">
      {/* Left Content */}
      <div className=" h-full md:w-[70%] ">
        <h2 className="text-2xl font-bold text-primary mb-5 ">Why Your Donation Matters</h2>
        <p className="text-gray-600 md:w-[80%]">
          Your support helps provide free education, mentorship, and career-focused training to every student.
          By donating, you help by:
        </p>
        
        {/* Impact Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 md:gap-6">
          <ImpactItem
            icon={<FaLock className="text-blue-800 text-2xl" />}
            title="Removing Financial Barriers:"
            description="Supporting students who cannot afford tuition."
          />
          <ImpactItem
            icon={<FaUsers className="text-blue-800 text-2xl" />}
            title="Sustaining the Teach, Tutor, Mentor (TTM) Model:"
            description="Ensuring ongoing mentorship and academic support."
          />
          <ImpactItem
            icon={<FaBriefcase className="text-blue-800 text-2xl" />}
            title="Building a Skilled Workforce:"
            description="Preparing students for careers in tech, business, and innovation."
          />
          <ImpactItem
            icon={<FaGlobe className="text-blue-800 text-2xl" />}
            title="Expanding Our Reach:"
            description="Establishing more learning hubs and digital access for students."
          />
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:w-[40%] h-full  md:flex justify-end items-end md:mt-0">
        <img
          src={image} // Replace with actual image URL
          alt="Student Learning"
          className="rounded-lg w-[65%] max-w-sm h-[85%] shadow-lg"
        />
      </div>
    </section>
  );
};

const ImpactItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="bg-[#E0E0E0] p-4 rounded-full">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default WhyDonate;
