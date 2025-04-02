import React from "react";
import CardImg1 from '../../asset/images/OT image .jpg';
import CardImg2 from '../../asset/images/Support-classroom.jpg';
import CardImg3 from '../../asset/images/support-1.jpg';

interface Event {
  image: string;
  date: string;
  month: string;
  title: string;
  description: string;
  link: string;
}

const events: Event[] = [
  {
    image: CardImg1,
    date: "22",
    month: 'Nov',
    title: "Coding Bootcamp Journey",
    description:
      "From novice to developer in 6 Months! Follow our students' bootcamp journey as they build real-world projects using industry tools. Our project-based curriculum gives students the skills employers demand.",
    link: "#",
  },
  {
    image: CardImg2,
    date: "24",
    month: "20",
    title: "A Record-breaking Year for Zongea Institute of Technology",
    description:
      "ZIT continues to break new ground, empowering professionals through high-quality training and capacity-building programs. With record enrollment ...",
    link: "#",
  },
  {
    image: CardImg3,
    date: "going",
    month: "On",
    title: "Join the Next Generation of Innovators",
    description:
      "We are now accepting applications for our upcoming cohort! Gain hands-on training and real-world experience in Web Development, UI/UX Design, and Microsoft Office Suite.",
    link: "#",
  },
];

const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-left">
        <h2 className="text-3xl font-noto font-bold text-primary text-center">Our News & Events</h2>
        <p className="text-dparacolor font-roboto mt-2 mb-8 text-center">
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
                <div className="mb-2 relative bottom-14 text-dparacolor flex flex-col rounded-md justify-center items-center font-roboto text-sm shadow-lg w-12 h-14 bg-white">
                  <p>{event.month}</p>
                  <p className="text-secondary font-semibold">{event.date}</p>
                </div>
                <h3 className="text-lg font-noto text-primary font-medium mt-1">
                  {event.title}
                </h3>
                <p className="text-dparacolor font-roboto mt-2 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
