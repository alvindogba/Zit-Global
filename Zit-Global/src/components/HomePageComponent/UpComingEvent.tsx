import React from "react";
import CardImg1 from '../../asset/images/OT image .jpg';
import CardImg2 from '../../asset/images/Paulfina.jpg';
import CardImg3 from '../../asset/images/Student-in-tech-Class.jpg';

interface Event {
  image: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

const events: Event[] = [
  {
    image: CardImg1,
    date: "March 15, 2025",
    title: "ZIT’s Coding Bootcamp: A Student’s Journey",
    description:
      "Follow a student’s experience through ZIT’s intensive coding bootcamp, learning how to build a real-world app.",
    link: "#",
  },
  {
    image: CardImg2,
    date: "March 15, 2025",
    title: "ZIT’s Coding Bootcamp: A Student’s Journey",
    description:
      "Follow a student’s experience through ZIT’s intensive coding bootcamp, learning how to build a real-world app.",
    link: "#",
  },
  {
    image: CardImg3,
    date: "March 15, 2025",
    title: "ZIT’s Coding Bootcamp: A Student’s Journey",
    description:
      "Follow a student’s experience through ZIT’s intensive coding bootcamp, learning how to build a real-world app.",
    link: "#",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-left">
        <h2 className="text-3xl font-bold text-primary text-center">Our upcoming Events</h2>
        <p className="text-gray-600 mt-2 mb-8 text-center">
          Stay Informed: News & Insights from Zongea Institute of Technology
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:px-32">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-500 text-sm">{event.date}</p>
                <h3 className="text-lg  text-primary font-medium mt-1">
                  {event.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
                <a
                  href={event.link}
                  className="text-primary font-medium flex items-center gap-1 mt-3 hover:underline"
                >
                  Read More <span>&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
