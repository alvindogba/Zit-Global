import { useState } from 'react';
import { Laptop, Clock, Award, ChevronDown, ChevronRight, Database, Server, FileKey, AlertCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTopButton from "../../components/ScrollToTopButton";

import HeroBgImg from "../../asset/images/database.jfif"; // Update with an actual image

export default function DatabaseAdminDetailPage() {
  const courseIncludes = [
    { icon: <Laptop className="w-5 h-5" />, text: "Hands-on Practice with SQL & NoSQL" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Lab Access" },
    { icon: <Award className="w-5 h-5" />, text: "Certificate of Completion" }
  ];

  const requirements = [
    "Basic computer knowledge",
    "Familiarity with database concepts is beneficial but not required"
  ];

  const [expandedSections, setExpandedSections] = useState<number[]>([0, 3]);

  const curriculumSections = [
    {
      title: "Introduction to Databases",
      icon: <Database className="w-5 h-5" />,
      subsections: [
        "Types of databases (SQL vs NoSQL)",
        "Database models & architecture",
        "Introduction to Relational Databases"
      ]
    },
    {
      title: "SQL & Query Optimization",
      icon: <Server className="w-5 h-5" />,
      subsections: [
        "Basic SQL commands",
        "Advanced Query Optimization",
        "Indexing & Performance Tuning"
      ]
    },
    {
      title: "Database Security & Backup",
      icon: <FileKey className="w-5 h-5" />,
      subsections: [
        "User Roles & Permissions",
        "Data Encryption & Security",
        "Backup & Disaster Recovery"
      ]
    },
    {
      title: "Incident Response & Risk Management",
      icon: <AlertCircle className="w-5 h-5" />,
      subsections: [
        "Handling Database Failures",
        "Security Threat Mitigation",
        "Risk Assessment"
      ]
    },
    {
      title: "More To Learn",
      icon: <BookOpen className="w-5 h-5" />,
      subsections: [
        "Cloud Database Management",
        "Big Data & Analytics",
        "NoSQL Database Technologies"
      ]
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
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
        }}>
          <div className="absolute inset-0 bg-navy-700/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">Database Administration Course</h1>
          <p className="text-gray-200 text-lg">
            Learn to design, manage, and optimize databases for high-performance applications.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary mb-4">About This Course</h2>
              <p className="text-gray-600 text-sm">
                This Database Administration course will teach students the fundamentals of database design, SQL optimization, security, and management. Ideal for those looking to build a career in data management and database engineering.
              </p>
            </section>

            {/* Requirements Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Requirements</h2>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <ChevronRight className="w-5 h-4 text-secondary-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum Section */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-primary mb-6">Curriculum</h2>
              <div className="space-y-4">
                {curriculumSections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => toggleSection(index)}
                      className="w-full px-4 py-3 flex items-center bg-white justify-between text-left hover:bg-gray-500 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-primary">{section.icon}</span>
                        <span className="font-medium text-primary text-md">{section.title}</span>
                      </div>
                      <div className="transform transition-transform duration-200">
                        {expandedSections.includes(index) ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
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
                            <li key={subIndex} className="flex items-center space-x-3 text-gray-600">
                              <ChevronRight className="w-4 h-4 text-secondary-yellow" />
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

          {/* Right Column - Course Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold text-primary mb-6">This Course is Free</h3>
              <Link
                to="/admission"
                className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-primary px-2 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
              >
                Apply Now
              </Link>
              <div className="space-y-6 mt-4">
                <h4 className="font-semibold text-primary">This Course Includes</h4>
                <ul className="space-y-4">
                  {courseIncludes.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-600">
                      {item.icon}
                      <span className="text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
}
