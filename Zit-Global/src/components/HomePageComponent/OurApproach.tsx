import { BackgroundMesh } from '../BackgroundMesh';
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { FaPeoplePulling } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";



import { motion } from 'framer-motion';
import * as variants from '../../animations/variants';

const OurApproach = ()=>{
    return(
      <Section
      id="approach"
      title='Our Approach'
      className="relative bg-gray-200 text-primary"
    >
      <BackgroundMesh className="rotate-45 opacity-10" />
      <motion.div
        className="container mx-auto px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.staggerContainer}
      >
        <motion.div variants={variants.fadeInUp} className="text-center mb-12">
          <h2 className="text-xl font-noto md:text-2xl font-bold mb-4 text-primary">
            Our Educational Approach
          </h2>
          <p className="text-lg font-roboto text-dparacolor max-w-2xl mx-auto">
          Revolutionizing tech education through mentorship, experiential learning, and a community-driven approach to impact.
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              title: 'Teach',
              description: 'Lay a Strong Foundation',
              note: "Deliver structured, high-quality tech education that empowers students with essential knowledge, critical thinking skills, and hands-on experience to excel in the digital world.",
              icon: GiTeacher,
            },
            {
              title: 'Tutor',
              description: 'Reinforce and Support',
              icon: FaPeoplePulling,
              note: "Provide personalized guidance and hands-on support to help students master concepts, overcome challenges, and confidently apply their knowledge",

            },
            {
              title: 'Mentor',
              description: ' Inspire and Give Back',
              icon: FaArrowsDownToPeople,
              note: "Equip students to guide and uplift others, fostering a culture of continuous learning, leadership, and community transformation.",

            },
          ].map((approach, index) => (
            <motion.div
              key={approach.title}
              variants={variants.fadeInUp}
              className="relative "
            > 
              <GlassCard
                className="p-4 h-full w-80 bg-transparent backdrop-blur-md border  transition-all duration-300 hover:translate-y-1 "
                glowColor={`from-primary-${(index + 4) * 100}/20`}
              >
                <approach.icon className="w-10 h-10 text-secondary mb-4 group-hover:text-white" />
                <h3 className="text-lg font-noto font-semibold mb-2 text-primary group-hover:text-white">{approach.title}</h3>
                <h4 className="text-gray-900 font-noto text-md font-bold group-hover:text-white">{approach.description}</h4>
                <p className='text-gray-700 font-roboto mt-4'>{approach.note}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
    )
}

export default OurApproach
