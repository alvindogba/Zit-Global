import { Link } from "react-router-dom";
import { FaPeopleArrows } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { GiTeacher } from "react-icons/gi";

const programs = [
  { 
    title: "Mentoring", 
    description: "One-on-one guidance from industry professionals to help you navigate your career path.", 
    icon: FaPeopleArrows, 
    link: "/mentorship-program" 
  },
  { 
    title: "Tutoring", 
    description: "Personalized academic support to help you master Tech skills and concepts.", 
    icon: FiBook,  // More specific icon for tutoring
    link: "/tutorship-program" 
  },
  { 
    title: "Teaching", 
    description: "Structured courses and workshops to build foundational and advanced Tech skills.", 
    icon: GiTeacher,  // More appropriate teaching icon
    link: "/teaching-at-zit" 
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-16 px-4 md:px-40 text-center bg-white">
      <h2 className="font-noto text-3xl font-bold max-w-[500px] mx-auto text-primary">
        The Three Pillars of the Impact & Connect Center - TTM
      </h2>
      <p className="font-roboto mt-4 text-dparacolor max-w-[500px] mx-auto">
        Our Impact and Connect Center operates through three key programs designed to support learning and professional growth.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <div key={index} className="p-6 border border-gray-100 bg-gray-200 rounded-lg flex flex-col items-center text-center">
            {program.icon && (
              <program.icon className="w-12 h-12 text-secondary mb-4" />
            )}
            <h3 className="font-noto mt-2 text-xl font-bold text-primary">{program.title}</h3>
            <p className="font-roboto mt-2 text-dparacolor">{program.description}</p>
            <Link to={program.link} className="font-sans mt-6 hover:font-semibold inline-block bg-secondary hover:bg-primary px-3 py-2 text-white rounded-md">
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}


// import { Link } from "react-router-dom";
// import { FaPeopleArrows, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
// import { FiBook } from "react-icons/fi";
// import { GiTeacher } from "react-icons/gi";

// const programs = [
//   { 
//     title: "Mentoring", 
//     description: "One-on-one guidance from industry professionals to help you navigate your career path.", 
//     icon: FaPeopleArrows, 
//     link: "/mentorship-program" 
//   },
//   { 
//     title: "Tutoring", 
//     description: "Personalized academic support to help you master Tech skills and concepts.", 
//     icon: FiBook,  // More specific icon for tutoring
//     link: "/tutorship-program" 
//   },
//   { 
//     title: "Teaching", 
//     description: "Structured courses and workshops to build foundational and advanced Tech skills.", 
//     icon: GiTeacher,  // More appropriate teaching icon
//     link: "/teaching-at-zit" 
//   },
// ];

// export default function ProgramsSection() {
//   return (
//     <section className="py-16 px-4 md:px-40 text-center bg-white">
//       <h2 className="font-noto text-3xl font-bold max-w-[500px] mx-auto">
//         The Three Pillars of the Impact & Connect Center - TTM
//       </h2>
//       <p className="font-roboto mt-4 text-gray-600 max-w-[500px] mx-auto">
//         Our Impact and Connect Center operates through three key programs designed to support learning and professional growth.
//       </p>
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {programs.map((program, index) => (
//           <div key={index} className="p-6 border border-gray-100 bg-secondary rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow">
//             {program.icon && (
//               <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
//                 <program.icon className="w-8 h-8 text-primary" />
//               </div>
//             )}
//             <h3 className="font-noto mt-2 text-xl font-bold text-gray-900">{program.title}</h3>
//             <p className="font-roboto mt-2 text-gray-600">{program.description}</p>
//             <Link 
//               to={program.link} 
//               className="font-sans mt-6 inline-block bg-primary hover:bg-primary-700 px-6 py-3 text-white rounded-lg transition-colors"
//             >
//               Learn More
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }