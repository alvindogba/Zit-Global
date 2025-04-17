import { useState } from 'react';
import { Laptop, Clock, Award, ChevronDown, ChevronRight, Palette, Layout, Users, Lightbulb, Layers, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBgImg from '../../asset/images/ui-ux-design.jpeg';

export default function UIUXDetailPage() {
  const courseIncludes = [
    { icon: <Laptop className="w-5 h-5" />, text: "Access to Design Software" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Access to Resources" },
    { icon: <Award className="w-5 h-5" />, text: "Certificate of Completion" }
  ];

  const requirements = [
    "Basic computer skills",
    "Interest in design and user experience",
    "No prior design experience needed, but creativity is a plus"
  ];

  const [expandedSections, setExpandedSections] = useState<number[]>([0, 3]);

  const curriculumSections = [
    {
      title: "Design Fundamentals",
      icon: <Palette className="w-5 h-5" />,
      subsections: [
        "Color theory and typography",
        "Layout principles",
        "Visual hierarchy",
        "Design systems"
      ]
    },
    {
      title: "User Interface Design",
      icon: <Layout className="w-5 h-5" />,
      subsections: [
        "Interface elements and components",
        "Responsive design",
        "Mobile-first approach",
        "Design patterns"
      ]
    },
    {
      title: "User Experience Design",
      icon: <Users className="w-5 h-5" />,
      subsections: [
        "User research methods",
        "Information architecture",
        "Usability principles",
        "User journey mapping"
      ]
    },
    {
      title: "Design Process",
      icon: <Lightbulb className="w-5 h-5" />,
      subsections: [
        "Design thinking methodology",
        "Wireframing and prototyping",
        "User testing",
        "Iterative design"
      ]
    },
    {
      title: "Design Tools",
      icon: <Layers className="w-5 h-5" />,
      subsections: [
        "Figma mastery",
        "Prototyping tools",
        "Design collaboration",
        "Version control for designers"
      ]
    },
    {
      title: "Professional Practice",
      icon: <BookOpen className="w-5 h-5" />,
      subsections: [
        "Building a design portfolio",
        "Design presentation skills",
        "Working with developers",
        "Design handoff best practices"
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
        <div className="absolute inset-0"   style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.5), rgba(0, 0, 90, 0.5)), url(${HeroBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
          <div className="absolute inset-0 bg-navy-700/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">UI/UX Design Course</h1>
          <p className="text-gray-200 text-xl">
            Create Beautiful and User-Friendly Digital Experiences
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
                Our UI/UX Design course teaches you to create intuitive and engaging digital experiences. Learn the principles
                of user-centered design, master industry-standard tools, and develop the skills to design products that users love.
                Perfect for aspiring designers who want to shape the future of digital interfaces.
              </p>
            </section>

            {/* Certification Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Certification</h2>
              <p className="text-dparacolor text-sm">
                Earn a UI/UX Design Certification from Zonges Institute of Technology, demonstrating your ability to create
                user-centered designs and implement modern design principles in digital products.
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
                      className="bg-white w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-secondary">{section.icon}</span>
                        <span className="font-medium text-primary text-md">{section.title}</span>
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