import { motion} from 'framer-motion';
import Footer from '../components/Footer/index'
import {
  ChartBarIcon,
  } from '@heroicons/react/24/outline';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { AnimatedStat } from '../components/AnimatedStat';
import { BackgroundMesh } from '../components/BackgroundMesh';
import { GradientText } from '../components/GradientText';
// import { FloatingElement } from '../components/FloatingElement';
// import { ArchitectureScene } from '../components/ArchitectureScene';
import LandingSection  from '../components/HomeComponent/LandingSection';
import * as variants from '../animations/variants';
import OurApproach from '../components/HomeComponent/OurApproach';
import HowWeTeach from '../components/HomeComponent/HowWeTeach';
import ProgramsWeOffer from '../components/HomeComponent/ProgramsWeOffer';
import Committment from '../components/HomeComponent/Committment';





const Home = () => {
  // const { scrollYProgress } = useScroll();
  // const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <main className="bg-gray-200 text-primary overflow-hidden w-full">
      <LandingSection />
      <OurApproach />
      <HowWeTeach />
      <ProgramsWeOffer />
      {/* Big Brother Model*/}
      {/* <Section
        id="technology"
        title='Big Brother Model '
        className="py-24 relative bg-primary text-white"
      >
        <BackgroundMesh className="-rotate-45" />
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={variants.staggerContainer}
        >
          <motion.div variants={variants.fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Building Stronger Futures Through the <GradientText className='text-white'>Big Brother Concept</GradientText>
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
            At Zongea Institute of Technology, we embrace Our Big Brother Concept to foster guidance, leadership, and support. By connecting students with inspiring role models, we help them build confidence, develop character, and navigate their educational and career journeys within a strong, supportive community.            </p>
          </motion.div>
          <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div variants={variants.slideInFromLeft}>
              <GlassCard
                className="p-8 h-full text-left bg-white/5 backdrop-blur-sm"
                variant="light"
                glowColor="from-primary-400/10"
              >
                
                <h3 className="text-2xl font-semibold mb-4 text-left">The Power of Role Models</h3>
                <ul className="space-y-4 text-white list-disc ">
                  {[
                    'Provides students with positive influences who guide them through academic and personal challenges.',
                    'Encourages goal setting and personal growth by learning from experienced individuals',
                    'Builds confidence and leadership skills through real-life experiences.',
                    'Strengthens a sense of belonging within a supportive community.',
                  ].map((tool) => (
                    <li key={tool} className="flex items-center text-white">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                     <span className="text-white mr-6">[➜]</span>   {tool}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
            <motion.div variants={variants.slideInFromRight}>
              <GlassCard
                className="h-full p-6 text-center bg-white/5 backdrop-blur-sm"
                variant="light"
                glowColor="from-primary-400/10"

              >
                <h3 className="text-2xl font-semibold mb-4">How We Foster Growth</h3>
                <p className="text-white mb-6">
                📌 Key Features:
                </p>
                <div className="grid grid-cols-2 gap-4 text-white">
                  {[
                    { label: 'One-on-One Guidance', value: 25, suffix: '+' },
                    { label: 'Leadership Development Programs', value: 12, suffix: '+' },
                    { label: 'Community Engagement', value: 45, suffix: '+' },
                    { label: 'Lifelong Networks', value: 30, suffix: '+' },
                  ].map((stat) => (
                    <AnimatedStat
                      key={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </Section> */}

      <Committment />
      {/* Enhanced CTA Section */}
      <Section
        id="cta"
        title='CTA'
        className="my-10 md:py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800" />
        <BackgroundMesh className="opacity-10" />
        <motion.div
          className="container mx-auto md:px-4 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={variants.staggerContainer}
        >
          <motion.div
            variants={variants.fadeInUp}
            className="w-full md:max-w-3xl mx-auto text-center text-white"
          >
            <GlassCard
 className="p-2 md:p-12 text-center w-full bg-white/5 backdrop-blur-sm" variant="light"
              glowColor="from-white/2"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Start Your <GradientText className="text-white">Career</GradientText>?
              </h2>
              <p className="text-xl text-white mb-8">
                Let's create something extraordinary together. Contact us today for a consultation.
              </p>
              <motion.div variants={variants.fadeInUp} className="flex flex-col md:flex-row justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center md:px-8 py-4 rounded-full border border-white text-white hover:bg-white/10 transition-colors shadow-glass"
                >
                  Get in Touch
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white text-white hover:bg-white/10 transition-colors"
                >
                  Register Now
                </a>
              </motion.div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Home;
