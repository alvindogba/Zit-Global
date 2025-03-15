
import { motion } from 'framer-motion';
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import { AnimatedStat } from '../AnimatedStat';
import { GradientText } from '../GradientText';
import * as variants from '../../animations/variants';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const commitment = ()=>{
    return(
<Section
        id="sustainability"
        title='Sustainability commitment'
        className="relative bg-primary text-white"
      >
        <div className="absolute inset-0 bg-gradient-mesh bg-mesh opacity-10" />
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={variants.staggerContainer}
        >
          <motion.div variants={variants.fadeInUp} className="text-center mb-16">
            <ChartBarIcon className="w-16 h-16 text-primary-300 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Commitment to <GradientText className="text-white">Sustainability</GradientText>
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            We prioritize sustainability by integrating eco-friendly practices into our education, operations, and community initiatives. Through responsible innovation, resource efficiency, and environmental awareness, we strive to create a greener future.


            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: ' Green Campus & Eco-Friendly Practices',
                description: 'We’ve incorporated sustainable practices into our daily operations to reduce environmental impact. From energy-saving technologies to waste management and recycling programs, our campus is designed to be environmentally friendly.',
                stats: { value: 85, suffix: '%', label: 'Recycling Rate' },
              },
              {
                title: 'Sustainable Education & Research',
                description: 'Sustainability is woven into our curriculum, with research projects and courses that empower students to make a positive impact on the planet. We encourage innovation through green projects and promote sustainable business practices.',
                stats: { value: 60, suffix: '%', label: 'Student Participation in Green Research' },
              },
              {
                title: 'Community Engagement & Impact',
                description: 'We believe in the power of community involvement to drive real change. Our awareness campaigns and collaborations with local organizations aim to create a sustainable impact beyond the campus.',
                stats: { value: 40, suffix: '%', label: 'Volunteer Participation' },
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={variants.fadeInUp}
              >
                <GlassCard
                  className="h-full p-6 text-center bg-white/5 backdrop-blur-sm"
                  variant="light"
                  glowColor="from-primary-400/10"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                  <p className="text-primary-100 mb-6">{item.description}</p>
                  <AnimatedStat
                    value={item.stats.value}
                    suffix={item.stats.suffix}
                    label={item.stats.label}
                  />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

    )
}

export default commitment