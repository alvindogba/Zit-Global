import { Link } from 'react-router-dom';
import { BackgroundMesh } from '../BackgroundMesh';
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import {
    ChatBubbleBottomCenterTextIcon,
    AcademicCapIcon,
    BeakerIcon,
  } from '@heroicons/react/24/outline'; 
import { motion } from 'framer-motion';
import * as variants from '../../animations/variants';

const OurApproach = ()=>{
    return(
      <Section
      id="approach"
      title='Our Approach'
      className="relative bg-gray-200 text-primary "
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
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary">
            Our Educational Approach
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Transforming tech education through mentorship and practical experience
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              title: 'Project Based Learning (PBL)',
              description: 'Learn by doing',
              icon: AcademicCapIcon,
              href: '/ttm-model'
            },
            {
              title: 'Competency Based Learning (CBL)',
              description: 'Master before moving on',
              icon: ChatBubbleBottomCenterTextIcon,
              href: '/guiding-hands-program'
            },
            {
              title: 'Mentorship and Industry Collaboration',
              description: 'Learn from experts.',
              icon: BeakerIcon,
              href: '/projects'
            },
          ].map((approach, index) => (
            <motion.div
              key={approach.title}
              variants={variants.fadeInUp}
              className="relative  "
            > 
              <Link className="text-primary" to={approach.href}>
              <GlassCard
                className="p-4 h-full w-72 bg-transparent backdrop-blur-md border border-gray-400 transition-all duration-300 hover:translate-y-1 hover:cursor-pointer hover:bg-primary group"
                glowColor={`from-primary-${(index + 4) * 100}/20`}
              >
                <approach.icon className="w-10 h-10 text-primary-600 mb-4 group-hover:text-white" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-white">{approach.title}</h3>
                <p className="text-gray-700 text-sm group-hover:text-white">{approach.description}</p>
              </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
    )
}

export default OurApproach
