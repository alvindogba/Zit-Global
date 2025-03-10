
import { motion } from 'framer-motion';
import { Section } from '../Section';
import { GlassCard } from '../GlassCard';
import { BackgroundMesh } from '../BackgroundMesh';
import * as variants from '../../animations/variants';
import { HomeIcon, HomeModernIcon, PaintBrushIcon, ChartBarIcon, ServerIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const ProgramsWeOffer = ()=>{
    return(
        <Section
        id="programs"
        title='Programs section'
        className=" relative bg-gray-200"
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
    )
}

export default ProgramsWeOffer
