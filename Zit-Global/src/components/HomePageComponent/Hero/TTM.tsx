// import { useState } from "react";
// import mentorImage from "../../../asset/images/alvin-dogba.jpg"
// import tutorImage from "../../../asset/images/Paulfina.jpg"
// import teachImage from "../../../asset/images/evelyna-sawah.jpg"
// export default function TTM() {
//   const [activeTab, setActiveTab] = useState<"Teach" | "Tutor" | "Mentor">("Tutor");

//   // Tab Content Data
//   const tabContent = {
//     Teach: {
//         title: "Teach - Laying A Strong Foundation",
//         description: "Learning starts with structured lessons led by experience instructors. we focus on delibering hands-on, practical training in technology, ensuring students gain in-depth knowledge of essential tools and concepts, Each course is designed to be interactive, engaging, and aligned with industry standards, preparing ststudents for real-world applications",
//         image: teachImage,
//         primaryBtn: "Become a Teacher",
//     },
//     Tutor: {
//       title: "Tutor – Strengthening Understanding",
//       description:
//         "We recognize that every student learns at their own pace. That's why we provide personalized tutoring sessions to reinforce difficult concepts and address individual challenges. Whether through one-on-one guidance or small group discussions, our tutors ensure that students fully grasp each topic, building their confidence and skill set.",
//       image: tutorImage,
//       primaryBtn: "Become a Tutor",
//     },
//     Mentor: {
//       title: "Mentor – Guiding the Future",
//       description:
//         "Our mentors play a crucial role in shaping the next generation by providing career advice, personal development support, and industry insights. Through one-on-one mentoring and group sessions, we ensure that students are prepared for real-world challenges and opportunities.",
//       image: mentorImage,
//       primaryBtn: "Become a Mentor",
//     },
//   };

//   return (
//     <section className="bg-white h-auto px-4 md:px-28 py-20">
//       {/* Heading Section */}
//       <h2 className="text-2xl font-bold text-primary">
//         Empowering Minds, Transforming Futures
//       </h2>
//       <p className="md:w-[60%] text-gray-700 mt-6">
//         At Zongea Institute of Technology, we believe learning goes beyond the classroom. 
//         Our unique approach ensures that every student not only gains knowledge but also 
//         receives the guidance and mentorship needed to excel in the real world. Our model 
//         is built on three core pillars:
//       </p>

    

//       {/* Content Section - Dynamic Update */}
//       <div className="flex flex-col md:flex-row">
//         {/* Left - Image */}
//         <img
//           src={tabContent[activeTab].image}
//           alt={`${activeTab} Image`}
//           className="w-full max-h-[55vh] md:w-1/3 rounded-lg shadow-md"
//         />

//         {/* Right - Text */}
//         <div className="flex flex-col justify-between gap-4 bg-primary rounded-tr-lg rounded-br-lg pb-4 w-full md:w-2/3 md:pl-10 relative -ml-6">
//           {/* Carve Effect */}
//           <div
//             className="absolute -left-6 top-0 w-6 h-10 bg-primary" // Top-left carve
//             style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
//           ></div>
//           <div
//             className="absolute -left-6 bottom-0 w-6 h-10 bg-primary" // Bottom-left carve
//             style={{ clipPath: "polygon(0 0, 50% 20%, 100% 0, 100% 100%, 0 100%)" }}
//           ></div>

//           {/* Tabs Section */}
//           <div className="flex items-center transition-opacity duration-300 ease-in-out bg-white">
//             {["Teach", "Tutor", "Mentor"].map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-1 md:px-3 py-1 md:py-2 outline-none active-none text-center transition-all w-full rounded-none ${
//                   activeTab === tab
//                     ? "bg-primary font-bold text-white"
//                     : "text-gray-500"
//                 }`}
//                 onClick={() => setActiveTab(tab as 'Teach' | 'Tutor' | 'Mentor')}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <h3 className="mt-6 text-xl font-bold text-white">
//             {tabContent[activeTab].title}
//           </h3>
//           <p className="text-white mt-4">{tabContent[activeTab].description}</p>

//           {/* Buttons */}
//           <div className="mt-6 w-full flex flex-col md:flex-row gap-4 items-center md:w-[80%] space-x-4">
//             <button className="w-full md:w-fit px-4 py-1 border border-white text-white bg-primary rounded-lg hover:font-bold transition-all">
//               {tabContent[activeTab].primaryBtn}
//             </button>
//             <button className="w-full md:w-fit px-4 py-1 bg-white text-primary rounded-lg hover:bg-primary hover:text-white border border-primary hover:font-bold transition-all">
//               Donate Today
//             </button>
//           </div>
//         </div>
//     </div>
//     </section>
//   );
// }

import { useState } from "react";
import mentorImage from "../../../asset/images/alvin-dogba.jpg";
import tutorImage from "../../../asset/images/Paulfina.jpg";
import teachImage from "../../../asset/images/evelyna-sawah.jpg";

export default function TTM() {
  const [activeTab, setActiveTab] = useState<"Teach" | "Tutor" | "Mentor">("Tutor");

  // Tab Content Data
  const tabContent = {
    Teach: {
      title: "Teach - Laying A Strong Foundation",
      description:
        "Learning starts with structured lessons led by experienced instructors. We focus on delivering hands-on, practical training in technology, ensuring students gain in-depth knowledge of essential tools and concepts, Each course is designed to be interactive, engaging, and aligned with industry standards, preparing students for real-world applications.",
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
    <section className="bg-gray-100 h-auto px-4 md:px-28 py-20">
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
      <div className="flex flex-col md:flex-row items-center mt-10 gap-6">
        {/* Left - Image */}
        <img
          src={tabContent[activeTab].image}
          alt={`${activeTab} Image`}
          className="w-full max-h-[50vh] md:w-1/3 rounded-lg shadow-md object-cover"
        />

        {/* Right - Text */}
        <div className="flex px-4 flex-col justify-between gap-4 bg-primary rounded-tr-lg rounded-br-lg pb-4 w-full md:w-2/3 md:pl-10 relative md:-ml-6">
          {/* Carve Effect */}
          {/* <div
            className="absolute -left-6 top-0 w-6 h-10 bg-primary hidden md:block" // Top-left carve
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }}
          ></div> */}
          {/* <div
            className="absolute -left-6 bottom-0 w-6 h-10 bg-primary hidden md:block" // Bottom-left carve
            style={{ clipPath: "polygon(0 0, 50% 20%, 100% 0, 100% 100%, 0 100%)" }}
          ></div> */}

          {/* Tabs Section */}
          <div className="flex items-center transition-opacity duration-300 ease-in-out bg-white">
            {["Teach", "Tutor", "Mentor"].map((tab) => (
              <button
                key={tab}
                className={`px-1 md:px-3 py-1 md:py-2 outline-none active-none text-center transition-all w-full rounded-none ${
                  activeTab === tab
                    ? "bg-primary font-bold text-white"
                    : "text-gray-500 bg-white"
                }`}
                onClick={() => setActiveTab(tab as "Teach" | "Tutor" | "Mentor")}
              >
                {tab}
              </button>
            ))}
          </div>

          <h3 className="mt-6 text-xl sm:ml-6 font-bold text-white">
            {tabContent[activeTab].title}
          </h3>
          <p className="text-white mt-4 sm:w-[60%] sm:ml-6">{tabContent[activeTab].description}</p>

          {/* Buttons */}
          <div className="mt-6 w-full flex flex-col md:flex-row gap-4 items-center md:w-[80%] space-x-4">
            <button className="w-full md:w-fit sm:w-fit px-4 py-1 border border-white text-white bg-primary rounded-lg hover:font-bold transition-all">
              {tabContent[activeTab].primaryBtn}
            </button>
            <button className="w-full md:w-fit sm:w-fit px-4 py-1 border border-white text-primary bg-white rounded-lg hover:font-bold transition-all">
              Donate Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
