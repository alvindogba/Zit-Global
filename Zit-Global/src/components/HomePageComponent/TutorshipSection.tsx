import image1 from "../../asset/images/a mentor.jpg";
import image2 from "../../asset/images/a parent.jpg";
import image3 from "../../asset/images/a school amdin.jpg";
import image4 from "../../asset/images/a student.jpg";
import { Link } from "react-router-dom";

export default function TutorshipSection() {
  const imgCard = [
    {
      label: "I am a Student",
      linkText: "Get Started",
      img: image4,
      link: "/icc-student"
    },
    {
      label: "I am a Parent or Guardian",
      linkText: "Get Started",
      img: image2,
      link: "/icc/parent-guardian"

    },
    {
      label: "I am a School Administrator",
      linkText: "Get Started",
      img: image3,
      link: "/icc/administration"

    },
    {
      label: "I’d Like to Mentor Someone",
      linkText: "Get Started",
      img: image1,
      link: "/icc/mentor"

    },
  ];

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-28 py-16 bg-white">
      {/* Left Side - 2x2 Image Grid */}
        <div className="w-full md:w-1/2 md:pr-8  md:mt-0 md:pl-10  md:text-left">
            <h3 className="text-lg font-medium text-primary mb-4">Explore Our Tutorship Program</h3>
            <h2 className="text-xl md:text-2xl font-bold text-primary mt-2">
            At ZIT, we provide a supportive learning experience that gets results.
            </h2>
            <p className="text-gray-700 my-4 leading-relaxed">
            Are you looking to explore and learn more? Tell us about who is requesting tutoring.
            </p>
        </div>

      {/* Right Side - Text Content */}

      <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
        {imgCard.map((card, index) => (
          <div key={index} className="relative rounded-lg shadow-lg group transition-transform duration-300">
            {/* Image */}
            <img
              src={card.img}
              alt={card.label}
              className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay with Text */}
            <div className="absolute inset-0 bg-primary/50 flex flex-col justify-center items-center p-2 text-center">
              <h3 className="text-sm font-semibold text-white">{card.label}</h3>
              <Link  to={card.link} className="mt-2 text-xs font-bold border-l-white border-b-white text-white px-3 py-1 bg-transparent hover:bg-white hover:text-primary  transition">
                {card.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
