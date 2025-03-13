
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
        <motion.div variants={variants.fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-900">
            Our Educational Approach
          </h2>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto">
            Transforming tech education through mentorship and practical experience
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {

              title: 'TTM Model',
              description: 'Learn directly from industry professionals through our Teaching Tutoring Mentorship approach.',
              icon: AcademicCapIcon,
              href: '/mentorship-program'
            },
            {

              title: 'Guiding Hands Program',
              description: 'Experience peer-to-peer learning in our global community of tech enthusiasts.',
              icon: ChatBubbleBottomCenterTextIcon,
              href: '/guilding-hands-program'
            },
            {

              title: 'Practical Projects',
              description: 'Work on real-world projects with guidance from industry experts.',
              icon: BeakerIcon,
              href: '/students'
            },
          ].map((approach, index) => (
            <motion.div
              key={approach.title}
              variants={variants.fadeInUp}
              className="relative"
            > 
              <Link className="text-primary" to={approach.href}>

        
              <GlassCard
                className="p-8 h-full bg-transparent backdrop-blur-md border border-gray-100 hover:translate-y-1 hover:cursor-pointer"
                glowColor={`from-primary-${(index + 4) * 100}/20`}
                hover={true}
              >

                <approach.icon className="w-12 h-12 text-primary-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 hover:translate-y-1">{approach.title}</h3>
                <p className="text-gray-700">{approach.description}</p>
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
