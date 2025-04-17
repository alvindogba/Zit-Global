import { useState } from 'react';
import { Laptop, Clock, Award, ChevronDown, ChevronRight, Code, Database, Globe, Puzzle, Terminal, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBgImg from "../../asset/images/full-stack-development.jpeg";

export default function FullStackDetailPage() {
  const courseIncludes = [
    { icon: <Laptop className="w-5 h-5" />, text: "Access to Development Environment" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Access to Learning Resources" },
    { icon: <Award className="w-5 h-5" />, text: "Certificate of Completion" }
  ];

  const requirements = [
    "Basic understanding of HTML, CSS, and JavaScript",
    "Passion for problem-solving and logical thinking",
    "Commitment to learning and practicing regularly"
  ];

  const [expandedSections, setExpandedSections] = useState<number[]>([0, 3]);

  const curriculumSections = [
    {
      title: "Frontend Development Fundamentals",
      icon: <Globe className="w-5 h-5" />,
      subsections: [
        "Advanced HTML5 and CSS3",
        "Modern JavaScript (ES6+)",
        "React.js fundamentals and hooks",
        "State management with Redux"
      ]
    },
    {
      title: "Backend Development",
      icon: <Database className="w-5 h-5" />,
      subsections: [
        "Node.js and Express.js",
        "RESTful API design",
        "Database design and management",
        "Authentication and authorization"
      ]
    },
    {
      title: "Database Management",
      icon: <Terminal className="w-5 h-5" />,
      subsections: [
        "SQL fundamentals",
        "MongoDB and NoSQL",
        "Database optimization",
        "Data modeling"
      ]
    },
    {
      title: "Advanced Concepts",
      icon: <Code className="w-5 h-5" />,
      subsections: [
        "Cloud deployment",
        "Docker and containerization",
        "CI/CD pipelines",
        "Microservices architecture"
      ]
    },
    {
      title: "Project Development",
      icon: <Puzzle className="w-5 h-5" />,
      subsections: [
        "Full-stack application development",
        "Team collaboration",
        "Version control with Git",
        "Agile development practices"
      ]
    },
    {
      title: "Career Development",
      icon: <BookOpen className="w-5 h-5" />,
      subsections: [
        "Portfolio building",
        "Technical interview preparation",
        "Best practices and coding standards",
        "Industry trends and technologies"
      ]
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-primary">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${HeroBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
          <div className="absolute inset-0 bg-navy-700/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">Full Stack Development Course</h1>
          <p className="text-gray-200 text-lg">
            Master Both Frontend and Backend Development – Become a Complete Developer
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">About This Course</h2>
              <p className="text-dparacolor text-sm">
                Our Full Stack Development course provides comprehensive training in both frontend and backend technologies.
                Learn to build complete, scalable web applications from scratch. This course covers everything from user
                interfaces to server architecture, database management, and deployment strategies.
              </p>
            </section>

            {/* Certification Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Certification</h2>
              <p className="text-dparacolor text-sm">
                Upon completion, you'll receive a Full Stack Developer Certification from Zonges Institute of Technology,
                validating your ability to build complete web applications and manage the entire development stack.
              </p>
            </section>

            {/* Requirements Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Requirements</h2>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-dparacolor text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-6">Curriculum</h2>
              <div className="space-y-4">
                {curriculumSections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => toggleSection(index)}
                      className="bg-white w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-500 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-secondary">{section.icon}</span>
                        <span className="font-medium text-primary">{section.title}</span>
                      </div>
                      <div className="transform transition-transform duration-200">
                        {expandedSections.includes(index) ? (
                          <ChevronDown className="w-5 h-5 text-secondary" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-secondary" />
                        )}
                      </div>
                    </button>
                    <div 
                      className={`transition-all duration-200 ease-in-out ${
                        expandedSections.includes(index)
                          ? 'max-h-[500px] opacity-100'
                          : 'max-h-0 opacity-0'
                      } overflow-hidden`}
                    >
                      <div className="px-4 py-3 border-t border-gray-200">
                        <ul className="space-y-2">
                          {section.subsections.map((subsection, subIndex) => (
                            <li key={subIndex} className="flex items-center space-x-3 text-dparacolor">
                              <ChevronRight className="w-4 h-4 text-secondary" />
                              <span className="text-sm">{subsection}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Course Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-primary mb-6">This Course is Free</h3>
              <Link
              to="/admission"
              className="bg-secondary hover:bg-primary hover:font-bold text-xs text-white px-3 sm:px-6 py-2 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
              >
              Apply Now 
              </Link>
              
              <div className="space-y-6">
                <h4 className="font-semibold text-primary mt-4">This Course Includes</h4>
                <ul className="space-y-4">
                  {courseIncludes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-secondary">
                      {item.icon}
                      <span className="text-sm text-dparacolor">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}