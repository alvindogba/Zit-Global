import { Link } from "react-router-dom";
import { FaPeopleArrows, FaBookOpen } from "react-icons/fa6";

const programs = [
  { 
    title: "Mentoring", 
    description: "One-on-one guidance from industry professionals to help you navigate your career path.", 
    icon: FaPeopleArrows, 
    link: "/mentor-ship" 
  },
  { 
    title: "Tutoring", 
    description: "Personalized academic support to help you master Tech skills and concepts.", 
    icon: FaBookOpen, 
    link: "/tutorship" 
  },
  { 
    title: "Teaching", 
    description: "Structured courses and workshops to build foundational and advanced Tech skills.", 
    icon: FaBookOpen, 
    link: "/teaching" 
  },
];

export default function ProgramsSection() {
  return (
    <section className="py-16 px-4 md:px-40 text-center bg-white">
      <h2 className="font-noto text-3xl font-bold max-w-[500px] mx-auto">
        The Three Pillars of the Impact & Connect Center - TTM
      </h2>
      <p className="font-roboto mt-4 text-gray-600 max-w-[500px] mx-auto">
        Our Impact and Connect Center operates through three key programs designed to support learning and professional growth.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <div key={index} className="p-6 border border-gray-100 bg-secondary rounded-lg flex flex-col items-center text-center">
            {program.icon && (
              <program.icon className="w-12 h-12 text-primary-600 mb-4" />
            )}
            <h3 className="font-noto mt-2 text-xl font-bold">{program.title}</h3>
            <p className="font-roboto mt-2 text-gray-600">{program.description}</p>
            <Link to={program.link} className="font-sans mt-6 inline-block bg-primary px-4 py-2 text-white rounded-lg">
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
