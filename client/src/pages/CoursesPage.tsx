import HeroBgImg from '../asset/images/Courses Hero.jpg';
import { Link } from 'react-router-dom';
import { Code, Palette, Shield, Layout, Database, FileText } from "lucide-react";
import FullStack from '../asset/images/full-stack-development.jpeg';
import CyberSecurity from '../asset/images/cyber-security.jpeg';
import GraphicDesign from '../asset/images/graphic-design.jpeg';
import UIUXDesign from '../asset/images/ui-ux-design.jpeg';
import Microsoft from '../asset/images/microsoft-365.jpeg'
import DatabaseImg from '../asset/images/database.jfif'
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function Courses() {
  const courses = [
    {
      title: "Full Stack Development",
      description:
        "Master both frontend and backend development. Learn to build complete, scalable web applications from scratch with modern technologies.",
      icon: <Code className="w-10 h-10 text-secondary" />,
      image: FullStack,
      path: "/courses/full-stack-development",
      highlights: [
        "Frontend & Backend Development",
        "Database Basic",
        "API Design",
        "Cloud Deployment",
      ],
    },
    {
      title: "UI/UX Design",
      description:
        "Create beautiful and user-friendly digital experiences. Learn design principles, prototyping, and user research methods.",
      icon: <Layout className="w-10 h-10 text-secondary" />,
      image: UIUXDesign,
      path: "/courses/ui-ux-design",
      highlights: [
        "User Interface Design",
        "User Experience Research",
        "Prototyping",
        "Design Systems",
      ],
    },
    {
      title: "Cybersecurity",
      description:
        "Protect the digital world. Learn cybersecurity fundamentals, ethical hacking, and defense strategies against cyber threats.",
      icon: <Shield className="w-10 h-10 text-secondary" />,
      image: CyberSecurity,
      path: "/courses/cybersecurity",
      highlights: [
        "Network Security",
        "Ethical Hacking",
        "Security Policies",
        "Incident Response",
      ],
    },
    {
      title: "Graphic Design",
      description:
        "Transform your creative vision into professional designs. Master industry-standard tools and design principles.",
      icon: <Palette className="w-10 h-10 text-secondary" />,
      image: GraphicDesign,
      path: "/courses/graphic-design",
      highlights: [
        "Digital Design Tools",
        "Brand Identity",
        "Visual Communication",
        "Print & Digital Media",
      ],
    },
    {
      title: "Database Administration",
      description:
        "Manage and optimize databases efficiently. Learn SQL, data security, and performance tuning to ensure database reliability.",
      icon: <Database className="w-10 h-10 text-secondary" />,
      image: DatabaseImg, // Unsplash image for Database
      path: "/courses/database-admin",
      highlights: [
        "SQL & NoSQL Databases",
        "Data Security",
        "Performance Optimization",
        "Backup & Recovery Strategies",
      ],
    },
    {
      title: "Microsoft Office Suite",
      description:
        "Master essential Microsoft Office tools like Word, Excel, and PowerPoint. Gain efficiency in document creation, data analysis, and presentations.",
      icon: <FileText className="w-10 h-10 text-secondary" />,
      image: Microsoft,
      path: "/courses/microsoft-office",
      highlights: [
        "Microsoft Word",
        "Microsoft Excel",
        "Microsoft PowerPoint",
        "Office Productivity Tips",
      ],
    },
  ];
  

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <div className="relative text-white"   style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.4), rgba(0, 0, 90, 0.4)), url(${HeroBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <h1 className="text-3xl font-noto md:text-3xl text-white font-bold mb-6">
            Transform Your Future with Our Free Courses
          </h1>
          <p className="text-md font-roboto text-gray-200 max-w-2xl">
            Choose from our professionally designed courses and start your journey in technology and design. All courses are free and taught by industry experts.
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-9xl  px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-4">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1">
              <div className="relative h-48">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-3">
                    {course.icon}
                    <h3 className="text-xl font-noto font-bold">{course.title}</h3>
                  </div>
                </div>
              </div>

              <div className="px-4 py-2">
                <p className="text-dparacolor font-roboto mb-4">
                  {course.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3">COURSE HIGHLIGHTS</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {course.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center font-roboto text-sm text-dparacolor">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  to={course.path}
                  className="inline-flex items-center font-sans justify-center w-max bg-secondary text-white py-2 px-3 rounded-md hover:bg-primary transition-colors hover:font-semibold"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-white py-16"   style={{backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.8), rgba(0, 0, 90, 0.8)), url(${HeroBgImg})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-noto font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-md font-roboto mb-8 max-w-2xl mx-auto">
            Join our community of learners and kickstart your career in technology and design.
            All courses are free and designed to help you succeed.
          </p>
            <Link to="/admission" className="bg-secondary text-white py-2 px-3 rounded-md hover:text-primary hover:bg-white transition-colors hover:font-semibold">
             Apply Now
            </Link>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}