
import { useState } from "react";
import mentorImage from "../../../asset/images/tutoring-1.jpg";
import tutorImage from "../../../asset/images/female-doctor-consoling-afro-american-patient.jpg";
import teachImage from "../../../asset/images/close-up-happy-man-clapping.jpg";

export default function TTM() {
  const [activeTab, setActiveTab] = useState<"Teach" | "Tutor" | "Mentor">("Tutor");

  // Tab Content Data
  const tabContent = {
    Teach: {
      title: "Become a Teacher – Educate, Innovate & Transform",
      description:
        " Be a part of the movement to revolutionize education. Gain access to specialized training, collaborate with top educators, and equip the next generation with the skills they need to succeed.",
      image: teachImage,
      primaryBtn: "Become a Teacher",
    },
    Tutor: {
      title: "Become a Tutor – Empower Students & Elevate Your Skills",
      description:
        " Take your expertise to the next level by guiding students through their learning journey. Set your own schedule, gain hands-on experience, and shape the future—one lesson at a time.",
      image: tutorImage,
      primaryBtn: "Become a Tutor",
    },
    Mentor: {
      title: "Become a Mentor – Inspire, Lead & Make a Difference",
      description:
        " Your guidance can change lives! Help students navigate their academic and career paths while growing your leadership skills and expanding your professional network.",
      image: mentorImage,
      primaryBtn: "Become a Mentor",
    },
  };

  return (
    <section className=" bg-gray-100 h-auto px-4 md:px-28 py-20">
      {/* Heading Section */}
      <h2 className="text-2xl font-bold text-primary">
        Opportunities to Educate, Inspire, and Lead      
        </h2>
      <p className="md:w-[60%] text-gray-700 mt-6">
      Join a dynamic community where you can enhance your skills, make a tangible impact, and inspire future leaders. Shape minds, foster growth, and lead with purpose.
      </p>

      {/* Content Section - Dynamic Update */}
      <div className="flex flex-col md:flex-row items-center mt-10 gap-6">
        {/* Left - Image */}
        <div className=" h-[50vh] w-full md:h-[68vh] max-h-[75vh] md:w-[40%] ">
          <img
            src={tabContent[activeTab].image}
            alt={`${activeTab} Image`}
            className="w-full  h-full  rounded-lg shadow-md object-cover"
          />
        </div>


        {/* Right - Text */}
        <div className="h-[68vh] max-h-[75vh] flex px-4 flex-col justify-between md:gap-4 bg-gray-200 rounded-tr-lg rounded-br-lg pb-4 w-full md:w-2/3 md:pl-10 relative md:-ml-6">

          {/* Tabs Section */}
          <div className="flex items-center transition-opacity duration-300 ease-in-out bg-white">
            {["Teach", "Tutor", "Mentor"].map((tab) => (
              <p
                key={tab}
                className={`px-1 md:px-3 py-1 md:py-2 outline-none border-none active-none text-center transition-all w-full rounded-none ${activeTab === tab
                  ? "bg-gray-200 font-bold  border-none outline-none text-gray-800"
                  : "text-gray-500 bg-white border-none outline-none font-light "
                  }`}
                onClick={() => setActiveTab(tab as "Teach" | "Tutor" | "Mentor")}
              >
                {tab}
              </p>
            ))}
          </div>

          <h3 className="mt-4 text-xl  font-bold text-gray-800">
            {tabContent[activeTab].title}
          </h3>
          <p className="text-gray-600 mt-4 sm:w-[60%]">{tabContent[activeTab].description}</p>

          {/* Buttons */}
          <div className="mt-4 w-full flex flex-col md:flex-row gap-4 items-center md:w-[80%] space-x-4">
            <button className="w-full md:w-fit sm:w-fit px-4 py-1 border border-white text-white bg-primary rounded-lg hover:font-bold transition-all">
              {tabContent[activeTab].primaryBtn}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
