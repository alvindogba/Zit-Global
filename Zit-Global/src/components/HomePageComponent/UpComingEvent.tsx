import { Link } from 'react-router-dom';
import { BackgroundMesh } from '../BackgroundMesh';
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import CardImg1 from '../../asset/images/OT image .jpg';
import CardImg2 from '../../asset/images/Paulfina.jpg';
import CardImg3 from '../../asset/images/Student-in-tech-Class.jpg';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import * as variants from '../../animations/variants';

const UpComingEvent = () => {
  return (
    <Section
      id="upcoming-events"
      title="Upcoming Events"
      className="relative bg-gray-200 text-primary py-12"
    >
      <BackgroundMesh className="rotate-45 opacity-10" />
      <motion.div
        className="container mx-auto px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.staggerContainer}
      >
        {/* Section Heading */}
        <motion.div variants={variants.fadeInUp} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Our Upcoming Events
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Stay Informed: News & Insights from Zongea Institute of Technology
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
          {[
            {
              title: `ZIT’s Coding Bootcamp`,
              detail_title: "A Student’s Journey",
              description:
                "Follow a student’s experience through ZIT’s intensive coding bootcamp, learning how to build a real-world site.",
              img: CardImg1,
              href: '/upcoming-events',
              href_text: "Read More",
            },
            {
              title: `ZIT’s Design Summit`,
              detail_title: `UI/UX & Graphic Design Workshop`,
              description:
                "Learn from top designers in this hands-on workshop, exploring the latest trends in UI/UX and graphic design.",
              img: CardImg2,
              href: '/upcoming-events',
              href_text: "Read More",
            },
            {
              title: `Cybersecurity Training`,
              detail_title: `Ethical Hacking & Network Security`,
              description:
                "Join cybersecurity experts as they teach practical hacking techniques and security protocols to defend against cyber threats.",
              img: CardImg3,
              href: '/upcoming-events',
              href_text: "Read More",
            },
          ].map((Event, index) => (
            <motion.div
              key={index}
              variants={variants.fadeInUp}
              className="relative group transition-transform duration-300 hover:scale-105"
            >
              {/* Event Image */}
              <Link className="block rounded-lg overflow-hidden shadow-lg" to={Event.href}>
                <img
                  src={Event.img}
                  alt={Event.title}
                  className="w-full h-56 object-cover rounded-lg"
                />
              </Link>

              {/* Event Details - Glass Effect Card */}
              <GlassCard
                className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent rounded-lg transition-all duration-300 group-hover:backdrop-blur-md group-hover:bg-primary/80"
                glowColor={`from-primary-${(index + 4) * 100}/20`}
              >
                <h3 className="text-lg font-semibold text-white">{Event.title}</h3>
                <h4 className="text-md font-medium text-gray-300">{Event.detail_title}</h4>
                <p className="text-gray-200 text-sm mt-2">{Event.description}</p>
              </GlassCard>

              {/* Read More Button */}
              <div className="absolute bottom-4 left-4">
                <Link
                  className="inline-flex items-center text-white font-semibold hover:text-secondary-yellow transition-all"
                  to={Event.href}
                >
                  {Event.href_text} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default UpComingEvent;
