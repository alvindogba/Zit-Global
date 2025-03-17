import { motion} from 'framer-motion';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { BackgroundMesh } from '../components/BackgroundMesh';
import { GradientText } from '../components/GradientText';
import LandingSection  from '../components/HomeComponent/LandingSection';
import * as variants from '../animations/variants';
import OurApproach from '../components/HomeComponent/OurApproach';
import HowWeTeach from '../components/HomeComponent/HowWeTeach';
import ProgramsWeOffer from '../components/HomeComponent/ProgramsWeOffer';
import Committment from '../components/HomeComponent/Committment';





const Home = () => {

  return (
    <main className="bg-gray-200 text-primary overflow-hidden w-full">
      <LandingSection />
      <OurApproach />
      <HowWeTeach />
      <ProgramsWeOffer />
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
                  href="/admission"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white text-white hover:bg-white/10 transition-colors"
                >
                  Register Now
                </a>
              </motion.div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </Section>

   
    </main>
  );
};

export default Home;
