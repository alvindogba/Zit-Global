// src/components/ProgramsSection.tsx
import { Link } from "react-router-dom";

const programs = [
    { title: "Mentoring", description: "One-on-one guidance from industry professionals to help you navigate your career path.", icon: "👨‍🏫", link: "/mentor-ship" },
    { title: "Tutoring", description: "Personalized academic support to help you master Tech skills and Concepts", icon: "📖", link: "/tutorship" },
    { title: "Teaching", description: "Structured courses and workshops to build foundational and advanced Tech Skills ", icon: "🎓", link: "/teaching" },

  ];
  
  export default function ProgramsSection() {
    return (
      <section className="py-16 px-4 md:px-40 text-center bg-white text-center">
        <h2 className="text-3xl font-bold max-w-[500px] m-auto">The Three Pillars of the Impact & Connect Center-TTM</h2>
        <p className="mt-4 text-gray-600 max-w-[500px] mx-auto">Our Impact and Connect Center operates through through three key programs designed to suppoprt learning and professional growth</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3  gap-6">
          {programs.map((program, index) => (
            <div key={index} className="p-6 border border-gray-100 bg-secondary  rounded-lg ">
              <div className="text-4xl">{program.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{program.title}</h3>
              <p className="mt-2 text-gray-600">{program.description}</p>
              <Link to={program.link} className="mt-6 inline-block bg-primary px-4 py-2 text-white rounded-lg">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>
    );
  }
  