import { motion, useScroll, useTransform } from 'framer-motion';
import {
  HomeModernIcon,
  PaintBrushIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  LightBulbIcon,
  AcademicCapIcon,
  BeakerIcon,
  HomeIcon,
  ServerIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Section } from '../components/Section';
import { GlassCard } from '../components/GlassCard';
import { AnimatedStat } from '../components/AnimatedStat';
import { ParallaxSection } from '../components/ParallaxSection';
import { BackgroundMesh } from '../components/BackgroundMesh';
import { GradientText } from '../components/GradientText';
import { FloatingElement } from '../components/FloatingElement';
import { ArchitectureScene } from '../components/ArchitectureScene';
import Footer from "../components/Footer/index"
import { Carousel } from '../components/Carousel';
import * as variants from '../animations/variants';
import img1 from "../asset/images/Technology - Digital.jpg"
import img2 from "../asset/images/herobg2.jpg"
import img3 from "../asset/images/bigBrother.jpg"

// Courses Icons 

const carouselSlides = [
  {
    title: "Global Tech Education",
    subtitle: "Empowering Future Tech Leaders Worldwide",
    description: "Welcome to our International Computer School, where we provide world-class technology education through our innovative Teaching Through Mentorship (TTM) model and Big Brother program, preparing students for global tech leadership.",
    image: img1,
    ctaText: "Explore Programs",
    ctaLink: "/programs"
  },
  {
    title: "Teaching Through Mentorship",
    subtitle: "A Revolutionary Learning Approach",
    description: "Our unique TTM model pairs students with industry professionals and experienced mentors worldwide, creating a practical, hands-on learning environment that bridges the gap between education and industry demands.",
    image: img2,
    ctaText: "Learn About TTM",
    ctaLink: "/ttm"
  },
  {
    title: "Big Brother Program",
    subtitle: "Building Global Tech Communities",
    description: "Experience our innovative Big Brother program, where senior students mentor juniors, fostering a supportive global community of tech enthusiasts and future innovators across cultures and borders.",
    image: img3,
    ctaText: "Join Our Community",
    ctaLink: "/community"
  }
];

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <main className="bg-gray-200 text-primary overflow-hidden w-full">
      {/* Hero Section with Carousel */}
      <Section
        id="hero"
        className="bg-primary-900 min-h-screen relative flex items-center justify-center overflow-hidden w-full"
      >

        <div className="text-white bg-primary-900 absolute inset-0 " />
        <Carousel slides={carouselSlides} />
      
      </Section>

      {/* Our Approach Section */}
      <Section
        id="approach"
        className="py-24 relative bg-gray-200 text-primary "
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
              },
              {

                title: 'Big Brother Program',
                description: 'Experience peer-to-peer learning in our global community of tech enthusiasts.',
                icon: ChatBubbleBottomCenterTextIcon,
              },
              {

                title: 'Practical Projects',
                description: 'Work on real-world projects with guidance from industry experts.',
                icon: BeakerIcon,
              },
            ].map((approach, index) => (
              <motion.div
                key={approach.title}
                variants={variants.fadeInUp}
                className="relative"
              >
          
                <GlassCard
                  className="p-8 h-full bg-transparent backdrop-blur-md border border-gray-100"
                  hover={true}
                  glowColor={`from-primary-${(index + 4) * 100}/20`}
                > 

                  <approach.icon className="w-12 h-12 text-primary-600 mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{approach.title}</h3>
                  <p className="text-gray-700">{approach.description}</p>
                </GlassCard>
    
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* How the TTM model works */}
      <Section
        id="impact"
        className="py-24 relative bg-primary text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-mesh bg-mesh opacity-10" />
        <motion.div
          className="container mx-auto px-4 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={variants.staggerContainer}
        >
          <motion.div variants={variants.fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How We <GradientText className='text-white'>Teach, Tutor & Mentor</GradientText>
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Education Beyond the Classroom, from Learning to Mastery - A Guided Approach
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stat: 'Step 1',
                label: 'Teach',
                description: 'Learn from Experts, Master the Basics',
              },
              {
                stat: 'Step 2',
                label: 'Tutor',
                description: 'One-on-One Support to Strengthen Your Skills',
              },
              {
                stat: 'Step 3',
                label: 'Mentor',
                description: ' Guidance from Professionals Who’ve Been There',
              },
              {
                stat: 'Step 4',
                label: 'Apply & Grow',
                description: 'Career placement',
              },
            ].map((stat, index) => (
              <ParallaxSection
                key={stat.label}
                offset={30}
                className="relative"
              >
                <GlassCard
                  className="p-6 h-[15rem] text-center bg-white/5 backdrop-blur-sm"
                  variant="light"
                  glowColor="from-primary-400/10"
                >
                  <motion.div
                    className="text-3xl font-bold text-primary-300 mb-2"
                    variants={variants.bounceIn}
                  >
                    {stat.stat}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 mt-8 text-white">{stat.label}</h3>
                  <p className="text-primary-200">{stat.description}</p>
                </GlassCard>
              </ParallaxSection>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Programs Section */}
      <Section
        id="programs"
        className="py-24 relative bg-gray-200"
      >
        <BackgroundMesh className="rotate-180 opacity-10" />
        <motion.div
          className="container mx-auto px-4"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={variants.staggerContainer}
        >
          <motion.div variants={variants.fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Career Courses & Programs We Offer
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Comprehensive tech education pathways for every aspiring individual
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Graphic Design",
                description: "Transform your creative vision into professional designs. Master industry-standard tools and design principles",
                icon: HomeIcon,
              },

              {
                title: 'Web Development',
                description: 'Master modern web technologies and frameworks with hands-on projects and expert mentorship.',
                icon: HomeModernIcon,
              },
              {
                title: 'CyberSecurity',
                description: "Learn to protect systems and data from cyber threats with hands-on training in security practices.",
                icon: PaintBrushIcon,
              },
              {
                title: 'UI/UX Design',
                description: 'Design intuitive and engaging user interfaces and experiences with modern tools and techniques.',
                icon: ChartBarIcon,
              },
              {
                title: 'Database Administration',
                description: 'Learn how to design, manage, and optimize databases using SQL and NoSQL technologies.',
                icon: ServerIcon,
              },
              {
                title: 'Microsoft Office Suite',
                description: ' Microsoft Word, Excel, PowerPoint, and Outlook for professional productivity.',
                icon: DocumentTextIcon,
              },
            ].map((program, index) => (
              <motion.div
                key={program.title}
                variants={variants.fadeInUp}
                className="relative"
              >
                <GlassCard
                  className="p-8 bg-transparent backdrop-blur-md border border-gray-100"
                  hover={true}
                  glowColor={`from-primary-${(index + 4) * 100}/20`}
                >
                  <program.icon className="w-12 h-12 text-primary-600 mb-6" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{program.title}</h3>
                  <p className="text-gray-700">{program.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Technology & Innovation */}
      <Section
        id="technology"
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
      </Section>

      {/* Sustainability Commitment */}
      <Section
        id="sustainability"
        className="py-24 relative bg-primary text-white"
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
                  className="p-6 text-center bg-white/5 backdrop-blur-sm"
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

      {/* Enhanced CTA Section */}
      <Section
        id="cta"
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
