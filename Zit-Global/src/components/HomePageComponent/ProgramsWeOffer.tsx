import { motion } from "framer-motion";
import { Section } from "../Section";
import { GlassCard } from "../GlassCard";
import { BackgroundMesh } from "../BackgroundMesh";
import * as variants from "../../animations/variants";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import {
  FaServer,
  FaLayerGroup,
  FaPaintBrush,
  FaShieldAlt,
  FaPalette,
} from "react-icons/fa";

const ProgramsWeOffer = () => {
  const programs = [
    {
      title: "Graphic Design",
      description:
        "Transform your creative vision into professional designs. Master industry-standard tools and design principles.",
      icon: <FaPaintBrush className="w-10 h-10 text-primary-600 mb-4 group-hover:text-white" />,
      href: "/courses/graphic-design",
    },
    {
      title: "Web Development",
      description:
        "Master modern web technologies and frameworks with hands-on projects and expert mentorship.",
      icon: <FaLayerGroup className="w-10 h-10 text-primary-600 mb-4 group-hover:text-white" />,
      href: "/courses/full-stack-development",
    },
    {
      title: "CyberSecurity",
      description:
        "Learn to protect systems and data from cyber threats with hands-on training in security practices.",
      icon: <FaShieldAlt className="w-10 h-10 text-primary-600 mb-4 group-hover:text-white" />,
      href: "/courses/cybersecurity",
    },
    {
      title: "UI/UX Design",
      description:
        "Design intuitive and engaging user interfaces and experiences with modern tools and techniques.",
      icon: <FaPalette className="w-10 h-10 text-primary-600 mb-4 group-hover:text-white" />,
      href: "/courses/ui-ux-design",
    },
    {
      title: "Database Administration",
      description:
        "Learn how to design, manage, and optimize databases using SQL and NoSQL technologies.",
      icon: <FaServer className="w-10 h-10 text-primary-600 mb-4 group-hover:text-white" />,
      href: "/courses/database-admin",
    },
    {
      title: "Microsoft Office Suite",
      description:
        "Microsoft Word, Excel, PowerPoint, and Outlook for professional productivity.",
      icon: <DocumentTextIcon className="w-10 h-10 text-primary-600 mb-4 group-hover:text-white" />,
      href: "/courses/microsoft-office",
    },
  ];

  return (
    <Section id="programs" title="Programs section" className="relative bg-gray-200">
      <BackgroundMesh className="rotate-180 opacity-10" />
      <motion.div
        className="container mx-auto px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.staggerContainer}
      >
        {/* Heading */}
        <motion.div variants={variants.fadeInUp} className="text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-primary">
            Career Courses & Programs We Offer
          </h2>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Comprehensive tech education pathways for every aspiring individual
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {programs.map((program, index) => (
              <motion.div key={program.title} variants={variants.fadeInUp} className="relative">
                <Link className="text-primary" to={program.href}>
                  <GlassCard className="p-6 h-full w-72 bg-transparent backdrop-blur-md border border-gray-100 transition-all duration-300 hover:translate-y-1 hover:cursor-pointer hover:bg-primary group">
                    {program.icon}
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-white">
                      {program.title}
                    </h3>
                    <p className="text-gray-700 text-sm group-hover:text-white">
                      {program.description}
                    </p>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-right mt-8">
          <Link to="/courses" className="btn btn-primary text-primary hover:text-primary-600">
            View More Courses <ArrowRightIcon className="inline-block" size={20} />
          </Link>
        </div>
      </motion.div>
    </Section>
  );
};

export default ProgramsWeOffer;
