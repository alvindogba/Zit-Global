// src/components/ProgramsSection.tsx
const programs = [
    { title: "Mentorship", description: "One-on-one guidance from industry professionals.", icon: "👨‍🏫" },
    { title: "Tutorship", description: "Personalized academic support.", icon: "📖" },
    { title: "Teaching", description: "Structured courses and workshops.", icon: "🎓" },
  ];
  
  export default function ProgramsSection() {
    return (
      <section className="py-16 text-center bg-white text-center">
        <h2 className="text-3xl font-bold">Our Programs</h2>
        <p className="mt-4 text-gray-600 max-w-[400px] mx-auto">Join Zongea's Guiding Hands program and Unlock your pontential with personalized guidance and support.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 px-6 md:px-12 lg:px-32 gap-2">
          {programs.map((program, index) => (
            <div key={index} className="p-6 border border-gray-100 bg-secondary  rounded-lg ">
              <div className="text-4xl">{program.icon}</div>
              <h3 className="mt-4 text-xl font-bold">{program.title}</h3>
              <p className="mt-2 text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  