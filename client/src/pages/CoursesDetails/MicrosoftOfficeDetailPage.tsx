import { useState } from "react";
import { Laptop, Clock, Award, ChevronDown, ChevronRight, FileText, File, BarChart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import HeroBgImg from "../../asset/images/microsoft-365.jpeg"; // Update with actual image

export default function MicrosoftOfficeDetailPage() {
  const courseIncludes = [
    { icon: <Laptop className="w-5 h-5" />, text: "Hands-on Training with Microsoft Office Tools" },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Access to Learning Resources" },
    { icon: <Award className="w-5 h-5" />, text: "Certificate of Completion" }
  ];

  const requirements = [
    "Basic computer knowledge",
    "No prior Microsoft Office experience required",
    "A willingness to learn and improve productivity skills"
  ];

  const [expandedSections, setExpandedSections] = useState<number[]>([0, 3]); // Initially expand first and fourth sections

  const curriculumSections = [
    {
      title: "Introduction to Microsoft Office",
      icon: <FileText className="w-5 h-5" />,
      subsections: [
        "Overview of Microsoft Office Suite",
        "Choosing the right Office tool for tasks",
        "Understanding cloud-based Office tools"
      ]
    },
    {
      title: "Microsoft Word - Document Creation",
      icon: <File className="w-5 h-5" />,
      subsections: [
        "Formatting documents professionally",
        "Using templates and styles",
        "Collaboration and review tools"
      ]
    },
    {
      title: "Microsoft Excel - Data Analysis",
      icon: <BarChart className="w-5 h-5" />,
      subsections: [
        "Introduction to Excel formulas and functions",
        "Data visualization with charts and pivot tables",
        "Advanced data sorting and filtering"
      ]
    },
    {
      title: "Microsoft PowerPoint - Presentations",
      icon: <FileText className="w-5 h-5" />,
      subsections: [
        "Designing effective slides",
        "Adding animations and transitions",
        "Presentation best practices"
      ]
    },
    {
      title: "More To Learn",
      icon: <BookOpen className="w-5 h-5" />,
      subsections: [
        "Microsoft Outlook - Email Management",
        "OneDrive - Cloud Storage and Collaboration",
        "Microsoft Teams - Remote Work and Meetings"
      ]
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-primary">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${HeroBgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-navy-700/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-4">Microsoft Office Suite Course</h1>
          <p className="text-gray-200 text-lg">
            Master Microsoft Word, Excel, PowerPoint, and more – Boost your productivity and efficiency.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold text-primary mb-4">About This Course</h2>
              <p className="text-dparacolor text-sm">
                The Microsoft Office Suite course is designed to provide learners with essential skills in using Microsoft Word, Excel, PowerPoint, and other tools. This course is perfect for students, professionals, and business users who want to enhance their productivity and efficiency.
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
                        expandedSections.includes(index) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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

          {/* Right Column - Course Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-primary mb-6">This Course is Free</h3>
              <Link
                to="/admission"
                className="bg-secondary hover:bg-primary hover:font-bold text-xs text-white px-2 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
              >
                Apply Now
              </Link>
              <div className="space-y-6 mt-4">
                <h4 className="font-semibold text-primary">This Course Includes</h4>
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
