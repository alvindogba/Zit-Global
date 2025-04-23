import image1 from "../../asset/images/l am a mentor.jpg";
import image2 from "../../asset/images/l am a tutor.jpg";
import image3 from "../../asset/images/I am a.jpg";
import image4 from "../../asset/images/l am student copy.jpg";
import { Link } from "react-router-dom";

export default function TutorshipSection() {
  const imgCard = [
    {
      label: "I need a Tutor",
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
      label: "I’d Like to Tutor someone",
      linkText: "Get Started",
      img: image1,
      link: "/icc/tutor"

    },
  ];

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-28 py-16 bg-white">
      {/* Left Side - 2x2 Image Grid */}
        <div className="w-full md:w-1/2 md:pr-8  md:mt-0 md:pl-10  md:text-left">
            <h3 className="text-lg font-noto font-medium text-primary mb-4">Empower, Educate, Inspire</h3>
            <h2 className="text-xl font-noto md:text-2xl font-bold text-primary mt-2">
            Join Our Community of Educators and Learners
            </h2>
            <p className="text-dparacolor font-roboto my-4 leading-relaxed">
            We believe in the impact of teaching, tutoring, and mentoring to create meaningful learning experiences. Whether you're looking to receive guidance, share your knowledge, or support education, we welcome you to be part of our mission. 
            <br />Let us know how you'd like to get involved.
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
              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay with Text */}
            <div className="absolute inset-0 bg-primary/40 flex flex-col justify-end items-baseline pl-4  pb-4 text-center">
              <h3 className="text-sm font-semibold text-white">{card.label}</h3>
              <Link  to={card.link} className="mt-2 text-xs font-bold py-2 px-3 text-white bg-secondary rounded-md hover:bg-primary  transition">
                {card.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
