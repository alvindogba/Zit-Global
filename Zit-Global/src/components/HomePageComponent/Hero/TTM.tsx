import { useState } from "react";
import mentorImage from "../../../asset/images/alvin-dogba.jpg"
import tutorImage from "../../../asset/images/Paulfina.jpg"
import teachImage from "../../../asset/images/evelyna-sawah.jpg"
export default function TTM() {
  const [activeTab, setActiveTab] = useState<"Teach" | "Tutor" | "Mentor">("Tutor");

  // Tab Content Data
  const tabContent = {
    Teach: {
        title: "Teach - Laying A Strong Foundation",
        description: "Learning starts with structured lessons led by experience instructors. we focus on delibering hands-on, practical training in technology, ensuring students gain in-depth knowledge of essential tools and concepts, Each course is designed to be interactive, engaging, and aligned with industry standards, preparing ststudents for real-world applications",
        image: teachImage,
        primaryBtn: "Become a Teacher",
    },
    Tutor: {
      title: "Tutor – Strengthening Understanding",
      description:
        "We recognize that every student learns at their own pace. That's why we provide personalized tutoring sessions to reinforce difficult concepts and address individual challenges. Whether through one-on-one guidance or small group discussions, our tutors ensure that students fully grasp each topic, building their confidence and skill set.",
      image: tutorImage,
      primaryBtn: "Become a Tutor",
    },
    Mentor: {
      title: "Mentor – Guiding the Future",
      description:
        "Our mentors play a crucial role in shaping the next generation by providing career advice, personal development support, and industry insights. Through one-on-one mentoring and group sessions, we ensure that students are prepared for real-world challenges and opportunities.",
      image: mentorImage,
      primaryBtn: "Become a Mentor",
    },
  };

  return (
    <section className="bg-white h-auto px-4 md:px-28 py-20">
      {/* Heading Section */}
      <h2 className="text-2xl font-bold text-primary">
        Empowering Minds, Transforming Futures
      </h2>
      <p className="md:w-[60%] text-gray-700 mt-6">
        At Zongea Institute of Technology, we believe learning goes beyond the classroom. 
        Our unique approach ensures that every student not only gains knowledge but also 
        receives the guidance and mentorship needed to excel in the real world. Our model 
        is built on three core pillars:
      </p>

    

      {/* Content Section - Dynamic Update */}
      <div className="flex flex-col gap-[1.5rem] md:flex-row items-center justify-between mt-10 transition-opacity duration-300 ease-in-out">
        {/* Left - Image */}
        <img
          src={tabContent[activeTab].image}
          alt={`${activeTab} Image`}
          className="w-full  max-h-[55vh] md:w-1/3 rounded-lg shadow-md"
        />

        {/* Right - Text */}
        <div className=" flex flex-col justify-between gap-4  w-full md:w-2/3 md:pl-10  ">
          {/* Tabs Section */}
      <div className="flex items-center  md:space-x-6  ">
        {["Teach", "Tutor", "Mentor"].map((tab) => (
          <button
            key={tab}
            className={`border-r-2 border-r-blue-900 px-4 md:px-6  py-1 md:py-2 outline-none text-center  transition-all 
    
                
            }`}
            onClick={() => setActiveTab(tab as 'Teach' | "Tutor" | "Mentor")}
          >
           <span className={`w-full px-2 py-2 ${activeTab === tab
           ? "border-b-2 border-primary font-bold text-primary"
           : "text-gray-500"

           }`}> {tab}</span>
          </button>
        ))}
      </div>
          <h3 className=" mt-6 text-xl font-bold text-blue-900">
            {tabContent[activeTab].title}
          </h3>
          <p className="text-gray-700 mt-4">{tabContent[activeTab].description}</p>

          {/* Buttons */}
          <div className=" mt-6  w-full flex flex-col md:flex-row gap-4  items-center md:w-[80%] space-x-4">
            <button className="w-full md:w-fit px-4 py-1 border border-primary bg-white text-primary rounded-lg hover:font-bold transition-all">
              {tabContent[activeTab].primaryBtn}
            </button>
            <button className="w-full md:w-fit px-4 py-1  bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary hover:font-bold transition-all">
              Donate Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
