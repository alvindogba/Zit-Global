import { JSX, useState } from 'react';
import ContactImg from '../asset/images/OT image .jpg';
import { Link } from 'react-router-dom'

// Import Icons
import { FaLaptopCode, FaServer, FaLayerGroup, FaPaintBrush, FaShieldAlt, FaPalette } from "react-icons/fa";

interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  enrolledStudents: number;
  instructor: string;
  skills: string[];
  icon: JSX.Element; // Store icon as a JSX element
}

interface Cohort {
  id: string;
  name: string;
  year: string;
  status: 'current' | 'completed';
  startDate: string;
  endDate: string;
  programs: Record<string, Program>;
}

// Define icons in variables
const frontendIcon = <FaLaptopCode />;
const backendIcon = <FaServer />;
const fullstackIcon = <FaLayerGroup />;
const graphicsIcon = <FaPaintBrush />;
const securityIcon = <FaShieldAlt />;
const uiuxIcon = <FaPalette />;

const CohortPage = () => {
  const [activeCohort, setActiveCohort] = useState('cohort-2025-1');
  const [activeTrack, setActiveTrack] = useState('frontend');

  const cohorts: Record<string, Cohort> = {
    'cohort-2025-1': {
      id: 'cohort-2025-1',
      name: 'Cohort 2025.1',
      year: '2025',
      status: 'current',
      startDate: '2025-04-01',
      endDate: '2025-09-30',
      programs: {
        frontend: {
          id: 'frontend',
          name: 'Front-End Development',
          description: 'Master modern web development with React, TypeScript, and responsive design principles.',
          duration: '6 months',
          startDate: '2025-04-01',
          endDate: '2025-09-30',
          maxStudents: 30,
          enrolledStudents: 25,
          instructor: 'Alfred Jallah',
          skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Responsive Design', 'Web Performance'],
          icon: frontendIcon,
        },
        backend: {
          id: 'backend',
          name: 'Back-End Development',
          description: 'Build robust server-side applications using Node.js, Express, and modern databases.',
          duration: '6 months',
          startDate: '2025-04-01',
          endDate: '2025-09-30',
          maxStudents: 30,
          enrolledStudents: 22,
          instructor: 'Hilton Jackson',
          skills: ['Node.js', 'Express', 'PostgreSQL', 'API Design', 'Authentication', 'Cloud Services'],
          icon: backendIcon,
        },
        fullstack: {
          id: 'fullstack',
          name: 'Full-Stack Development',
          description: 'Comprehensive training in both front-end and back-end technologies for end-to-end development.',
          duration: '6 months',
          startDate: '2025-04-01',
          endDate: '2025-09-30',
          maxStudents: 25,
          enrolledStudents: 20,
          instructor: 'Sharderd Mechard',
          skills: ['React', 'Node.js', 'Full-Stack Architecture', 'Database Design', 'DevOps', 'System Design'],
          icon: fullstackIcon,
        },
        graphics: {
          id: 'graphics',
          name: 'Graphic Design',
          description: 'Learn professional graphic design using industry-standard tools and creative principles.',
          duration: '6 months',
          startDate: '2025-04-01',
          endDate: '2025-09-30',
          maxStudents: 25,
          enrolledStudents: 18,
          instructor: 'Tarr Zlan',
          skills: ['Adobe Creative Suite', 'Typography', 'Brand Design', 'Digital Illustration', 'Print Design', 'Color Theory'],
          icon: graphicsIcon,
        },
        security: {
          id: 'security',
          name: 'Cyber Security',
          description: 'Develop expertise in network security, ethical hacking, and cyber threat prevention.',
          duration: '6 months',
          startDate: '2025-04-01',
          endDate: '2025-09-30',
          maxStudents: 20,
          enrolledStudents: 15,
          instructor: 'Jonathan Williams',
          skills: ['Network Security', 'Ethical Hacking', 'Security Protocols', 'Risk Assessment', 'Incident Response', 'Security Tools'],
          icon: securityIcon,
        },
        uiux: {
          id: 'uiux',
          name: 'UI/UX Design',
          description: 'Create beautiful and functional user interfaces with modern design principles.',
          duration: '6 months',
          startDate: '2025-04-01',
          endDate: '2025-09-30',
          maxStudents: 25,
          enrolledStudents: 20,
          instructor: 'Sarah Chen',
          skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Design Systems', 'Usability Testing'],
          icon: uiuxIcon,
        }
      }
    },
    'cohort-2024-2': {
      id: 'cohort-2024-2',
      name: 'Cohort 2024.2',
      year: '2024',
      status: 'completed',
      startDate: '2024-10-01',
      endDate: '2025-03-30',
      programs: {
        frontend: {
          id: 'frontend',
          name: 'Front-End Development',
          description: 'Master modern web development with React, TypeScript, and responsive design principles.',
          duration: '6 months',
          startDate: '2024-10-01',
          endDate: '2025-03-30',
          maxStudents: 30,
          enrolledStudents: 28,
          instructor: 'Alfred Jallah',
          skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Responsive Design', 'Web Performance'],
          icon: frontendIcon,
        },
        backend: {
          id: 'backend',
          name: 'Back-End Development',
          description: 'Build robust server-side applications using Node.js, Express, and modern databases.',
          duration: '6 months',
          startDate: '2024-10-01',
          endDate: '2025-03-30',
          maxStudents: 30,
          enrolledStudents: 25,
          instructor: 'Hilton Jackson',
          skills: ['Node.js', 'Express', 'PostgreSQL', 'API Design', 'Authentication', 'Cloud Services'],
          icon: backendIcon,
        }
      }
    },
    'cohort-2024-1': {
      id: 'cohort-2024-1',
      name: 'Cohort 2024.1',
      year: '2024',
      status: 'completed',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      programs: {
        frontend: {
          id: 'frontend',
          name: 'Front-End Development',
          description: 'Master modern web development with React, TypeScript, and responsive design principles.',
          duration: '6 months',
          startDate: '2024-04-01',
          endDate: '2024-09-30',
          maxStudents: 25,
          enrolledStudents: 25,
          instructor: 'Alfred Jallah',
          skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Responsive Design'],
          icon: frontendIcon,
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-navy-600 text-white">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.7), rgba(0, 0, 90, 0.7)), url(${ContactImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-noto text-2xl md:text-3xl font-bold mb-6">
            Transform Your Future with ZIT
          </h1>
          <p className="font-roboto text-lg text-gray-200 max-w-3xl mb-8">
            Join our intensive 6-month programs and earn a certificate in your chosen field. 
            Expert-led training, hands-on projects, and career-ready skills.
          </p>
        </div>
      </div>

      {/* Cohort Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="font-noto text-2xl font-bold mb-6">Select Cohort</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(cohorts).map((cohort) => (
              <button
                key={cohort.id}
                onClick={() => {
                  setActiveCohort(cohort.id);
                  setActiveTrack(Object.keys(cohort.programs)[0]);
                }}
                className={`p-6 rounded-xl transition-all text-left ${
                  activeCohort === cohort.id
                    ? 'bg-white text-primary shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <h3 className="font-noto text-xl font-bold mb-2">{cohort.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-roboto">
                    {cohort.startDate} - {cohort.endDate}
                  </span>
                  <span className={`text-sm font-semibold font-roboto px-2 py-1 rounded ${
                    cohort.status === 'current' ? 'bg-green-100 text-green-700' : 'bg-primary text-white'
                  }`}>
                    {cohort.status === 'current' ? 'Current' : 'Completed'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Program Track Selection */}
        {cohorts[activeCohort] && (
          <div>
            <h2 className="font-noto text-2xl font-bold mb-6">Available Programs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {Object.values(cohorts[activeCohort].programs).map((program) => (
                <button
                  key={program.id}
                  onClick={() => setActiveTrack(program.id)}
                  className={`p-4 rounded-xl transition-all ${
                    activeTrack === program.id
                      ? 'bg-white text-primary shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-3xl mb-2 text-secondary">{program.icon}</div>
                  <div className="text-sm font-noto font-semibold text-primary">{program.name}</div>
                </button>
              ))}
            </div>

            {/* Active Program Details */}
            {cohorts[activeCohort].programs[activeTrack] && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl mb-4 text-secondary">{cohorts[activeCohort].programs[activeTrack].icon}</div>
                    <h2 className="font-noto text-2xl font-bold mb-4 text-primary">{cohorts[activeCohort].programs[activeTrack].name}</h2>
                    <p className="font-roboto text-dparacolor mb-6">{cohorts[activeCohort].programs[activeTrack].description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex font-roboto items-center">
                        <span className="w-32  font-semibold text-primary">Duration:</span>
                        <span>{cohorts[activeCohort].programs[activeTrack].duration}</span>
                      </div>
                      <div className="flex font-roboto items-center">
                        <span className="w-32 font-semibold text-primary">Start Date:</span>
                        <span>{cohorts[activeCohort].programs[activeTrack].startDate}</span>
                      </div>
                      <div className="flex font-roboto items-center">
                        <span className="w-32 font-semibold text-primary">End Date:</span>
                        <span>{cohorts[activeCohort].programs[activeTrack].endDate}</span>
                      </div>
                      {/* <div className="flex font-roboto items-center">
                        <span className="w-32 font-semibold text-primary">Instructor:</span>
                        <span>{cohorts[activeCohort].programs[activeTrack].instructor}</span>
                      </div> */}
                    </div>
                  </div>

                  <div>
                    {/* <div className="mb-6">
                      <h3 className="text-xl font-noto font-semibold mb-4">Enrollment Status</h3>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <div className="flex font-roboto justify-between mb-2">
                          <span>Available Seats</span>
                          <span className="font-semibold">
                            {cohorts[activeCohort].programs[activeTrack].maxStudents - 
                             cohorts[activeCohort].programs[activeTrack].enrolledStudents} of {cohorts[activeCohort].programs[activeTrack].maxStudents}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-secondary-yellow h-2 rounded-full"
                            style={{
                              width: `${(cohorts[activeCohort].programs[activeTrack].enrolledStudents / 
                                      cohorts[activeCohort].programs[activeTrack].maxStudents) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div> */}

                    <div>
                      <h3 className="font-noto text-xl font-semibold mb-4 text-primary">Skills You'll Learn</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {cohorts[activeCohort].programs[activeTrack].skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 rounded-lg px-4 py-2 text-sm"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {cohorts[activeCohort].status === 'current' && (
                  <div className="font-sans mt-8 flex justify-center">
                    <Link to='/admission' className="bg-secondary font-sans hover:bg-primary text-white hover:font-semibold py-2 px-3 rounded-md transition-colors">
                      Apply Now
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CohortPage;
