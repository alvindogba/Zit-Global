
import { useState } from "react";
import mentorImage from "../../asset/images/medium-shot-smiley-father-kid-home.jpg";
import tutorImage from "../../asset/images/tutoing.jpg";
import teachImage from "../../asset/images/A teacher.jpg";
import { Link } from "react-router-dom";

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
      btnHref: "/teaching-at-zit",
    },
    Tutor: {
      title: "Become a Tutor – Empower Students & Elevate Your Skills",
      description:
        " Take your expertise to the next level by guiding students through their learning journey. Set your own schedule, gain hands-on experience, and shape the future—one lesson at a time.",
      image: tutorImage,
      primaryBtn: "Become a Tutor",
      btnHref: "/tutorship-program",
    },
    Mentor: {
      title: "Become a Mentor – Inspire, Lead & Make a Difference",
      description:
        " Your guidance can change lives! Help students navigate their academic and career paths while growing your leadership skills and expanding your professional network.",
      image: mentorImage,
      primaryBtn: "Become a Mentor",
      btnHref: "/mentorship-program",
    },
  };

  return (
    <section className=" bg-gray-100 h-auto px-4 md:px-28 py-20">
      {/* Heading Section */}
      <h2 className="text-2xl font-bold font-noto text-primary">
        Opportunities to Educate, Inspire, and Lead      
      </h2>
      <p className="md:w-[60%] text-dparacolor font-roboto mt-6">
        Join a dynamic community where you can enhance your skills, make a tangible impact, and inspire future leaders. Shape minds, foster growth, and lead with purpose.
      </p>

      {/* Content Section - Dynamic Update */}
      <div className="flex flex-col md:flex-row items-center mt-10 gap-6">
        {/* Left - Image */}
        <div className=" h-[40vh] w-full md:h-[55vh]  md:w-[40%] ">
          <img
            src={tabContent[activeTab].image}
            alt={`${activeTab} Image`}
            className="w-full  h-[100%]  rounded-lg shadow-md object-cover"
          />
        </div>


        {/* Right - Text */}
        <div className="h-[50vh] md:h-[55vh] max-h-[60vh] flex px-4 flex-col  md:gap-4 bg-gray-200 rounded-tr-lg rounded-br-lg pb-4 w-full md:w-2/3 md:pl-10 relative md:-ml-6">

          {/* Tabs Section */}
          <div className="flex items-center transition-opacity duration-300 ease-in-out bg-white">
            {["Teach", "Tutor", "Mentor"].map((tab) => (
              <p
                key={tab}
                className={`px-1 md:px-3 py-1 md:py-2 font-roboto outline-none border-none active-none text-center cursor-pointer transition-all w-full rounded-none ${activeTab === tab
                  ? "bg-gray-200 font-bold  border-none outline-none text-gray-800"
                  : "text-gray-500 bg-white border-none outline-none font-light "
                  }`}
                onClick={() => setActiveTab(tab as "Teach" | "Tutor" | "Mentor")}
              >
                {tab}
              </p>
            ))}
          </div>

          <h3 className="mt-4 text-xl md:w-[60%] font-noto font-bold text-gray-800">
            {tabContent[activeTab].title}
          </h3>
          <p className="text-gray-600 mt-4 md:mt-3 font-roboto sm:w-[60%]">{tabContent[activeTab].description}</p>

          {/* Buttons */}
          <div className="mt-4 md:mt-2 w-full flex flex-col md:flex-row gap-4 items-center md:w-[80%] space-x-4">
            <Link to={tabContent[activeTab].btnHref} className="w-full md:w-fit font-sans sm:w-fit px-3 py-2 hover:bg-primary text-white bg-secondary rounded-md hover:font-semibold transition-all">
              {tabContent[activeTab].primaryBtn}
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
