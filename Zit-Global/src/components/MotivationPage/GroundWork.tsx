import { BackgroundMesh } from '../BackgroundMesh';
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import { FaUserGraduate, FaPeoplePulling, FaBriefcase } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import * as variants from '../../animations/variants';

export default function GroundWork() {
  const bgColors = ["bg-orange-200/40", "bg-white", "bg-green-200/40"]; 

  return (
    <Section id="approach" title="Our Approach" className="relative bg-gray-200 text-primary">
      <BackgroundMesh className="rotate-45 opacity-10" />
      <motion.div
        className="container mx-auto px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.staggerContainer}
      >
        <motion.div variants={variants.fadeInUp} className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary">
            Laying the Groundwork: Year One Highlights
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              title: 'Quality Education',
              description: 'Industry-aligned curriculum taught by experienced professionals.',
              icon: FaUserGraduate,
            },
            {
              title: 'Career Focus',
              description: 'Practical skills and guidance for your tech career journey.',
              icon: FaBriefcase,
            },
            {
              title: 'Supportive Community',
              description: 'Learn alongside passionate peers in a collaborative environment.',
              icon: FaPeoplePulling,
            },
          ].map((groundWork, index) => (
            <motion.div key={groundWork.title} variants={variants.fadeInUp} className="relative">
              <GlassCard
                className={`p-4 h-full w-full max-w-[18rem] ${bgColors[index]} rounded-none backdrop-blur-md `}
                glowColor={`from-primary-${(index + 4) * 100}/20`}
              >
                <div className="w-16 h-16 rounded-full flex justify-center items-center mb-2 bg-primary/10">
                  <groundWork.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{groundWork.title}</h3>
                <p className="text-gray-700 text-sm">{groundWork.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
