import React from "react";
import CardImg1 from '../../asset/images/OT image .jpg';
import CardImg2 from '../../asset/images/Support-classroom.jpg';
import CardImg3 from '../../asset/images/support-1.jpg';

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
    date: "November 22, 2025",
    title: "A Record-Breaking Year For Zongea Institute of Technology",
    description:
      "At ZIT, we are dedicated to empowering professionals through high-quality training and capacity-building programs....",
    link: "#",
  },
  {
    image: CardImg2,
    date: "June 28, 2025",
    title: "ZIT’s Coding Bootcamp: A Student’s Journey",
    description:
      "Follow a student’s experience through ZIT’s intensive coding bootcamp, learning how to build a real-world app.",
    link: "#",
  },
  {
    image: CardImg3,
    date: "April 21, 2025",
    title: "Spotlight on Madam Williams: Inspiring LeaderShip at ZIT Cohort 4 Graduation Ceremony",
    description:
      "At ZIT, we are dedicated to empowering professionals through high-quality training and capacity-building programs....",
    link: "#",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-left">
        <h2 className="text-3xl font-noto font-bold text-primary text-center">Our upcoming Events</h2>
        <p className="text-gray-600 font-roboto mt-2 mb-8 text-center">
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
                <p className="text-gray-500 font-roboto text-sm">{event.date}</p>
                <h3 className="text-lg font-noto text-primary font-medium mt-1">
                  {event.title}
                </h3>
                <p className="text-gray-600 font-roboto mt-2 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
