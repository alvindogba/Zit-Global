import { useState } from 'react';
import { Laptop, Clock, Award, ChevronDown, ChevronRight, Shield, Network, Terminal, FileKey, AlertCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

import HeroBgImg from "../../asset/images/cyber-security.jpeg";


export default function CyberSecurityDetailPage() {
  const courseIncludes = [
    { icon: <Laptop className="w-5 h-5" />, text: "Access to desktop and Laptop For Practices" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Access to Internet" },
    { icon: <Award className="w-5 h-5" />, text: "Certificate of Completion" }
  ];

  const requirements = [
    "Basic computer knowledge",
    "Interest in design and technology",
    "No prior cybersecurity experience required, though familiarity with networks and operating systems will be beneficial."
  ];

  const [expandedSections, setExpandedSections] = useState<number[]>([0, 3]); // Initially expand first and fourth sections

  const curriculumSections = [
    {
      title: "Introduction To Cybersecurity",
      icon: <Shield className="w-5 h-5" />,
      subsections: [
        "Basic cybersecurity concepts and terminologies",
        "Types of cyber threats and attacks",
        "Understanding cybersecurity landscape",
        "Common attack vectors and vulnerabilities"
      ]
    },
    {
      title: "Network Security",
      icon: <Network className="w-5 h-5" />,
      subsections: [
        "Network protocols and architecture",
        "Firewall configuration and management",
        "VPN and secure communication",
        "Network monitoring and analysis"
      ]
    },
    {
      title: "Ethical Hacking & Penetration Testing",
      icon: <Terminal className="w-5 h-5" />,
      subsections: [
        "Penetration testing methodology",
        "Vulnerability assessment",
        "Common exploitation techniques",
        "Security tools and frameworks"
      ]
    },
    {
      title: "Cybersecurity Policies & Risk Management",
      icon: <FileKey className="w-5 h-5" />,
      subsections: [
        "Developing security policies",
        "Risk analysis and mitigation",
        "Compliance and regulations",
        "Security awareness training"
      ]
    },
    {
      title: "Incident Response & Recovery",
      icon: <AlertCircle className="w-5 h-5" />,
      subsections: [
        "Incident response planning",
        "Digital forensics basics",
        "System recovery procedures",
        "Post-incident analysis"
      ]
    },
    {
      title: "More To Learn",
      icon: <BookOpen className="w-5 h-5" />,
      subsections: [
        "Advanced security topics",
        "Cloud security",
        "Mobile security",
        "IoT security considerations"
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
          <h1 className="text-3xl font-noto font-bold text-white mb-4">Cybersecurity Course</h1>
          <p className="text-gray-200 font-roboto text-lg">
            Protect the Digital World – Get Free Training in Cybersecurity and Ethical Hacking
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
              <h2 className="text-xl font-noto font-bold text-primary mb-4">About This Course</h2>
              <p className="text-dparacolor font-roboto text-sm">
                The Cybersecurity course at Zonges Institute of Technology provides a comprehensive introduction to protecting
                computer systems, networks, and data from cyber threats. This course will teach students how to secure systems,
                manage risk, and defend against cyberattacks. Ideal for those who are passionate about technology and want to
                protect data and infrastructures from malicious activities.
              </p>
            </section>

            {/* Certification Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-noto font-bold text-primary mb-4">Certification</h2>
              <p className="text-dparacolor font-roboto text-sm">
                Upon completion, students will receive a Cybersecurity Certification from Zonges Institute of Technology,
                demonstrating their ability to implement security measures and protect against modern cyber threats.
              </p>
            </section>

            {/* Requirements Section */}
            <section className="bg-white rounded-lg  p-6">
              <h2 className="text-xl font-bold font-noto text-primary mb-4">Requirements</h2>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-dparacolor font-roboto text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold font-noto text-primary mb-6">Curriculum</h2>
              <div className="space-y-4">
                {curriculumSections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => toggleSection(index)}
                      className="bg-white w-full font-sans px-4 py-3 flex items-center justify-between text-left hover:bg-gray-200 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-secondary">{section.icon}</span>
                        <span className="font-medium text-primary font-noto text-md">{section.title}</span>
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
                              <span className="text-sm font-noto">{subsection}</span>
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
              <h3 className="text-xl font-bold font-noto text-primary mb-6">This Course is Free</h3>
             
              <Link
              to="/admission"
              className="bg-secondary font-bold text-xs font-sans hover:px-6 hover:py-2 text-white px-2 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
              >
              Apply Now 
              </Link>
              
              <div className="space-y-6">
                <h4 className="font-semibold font-noto text-primary mt-4">This Course Includes</h4>
                <ul className="space-y-4">
                  {courseIncludes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-dparacolor">
                      {item.icon}
                      <span className='text-sm font-roboto'>{item.text}</span>
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