import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";
import Logo from "../../asset/images/zongea-logo.png";
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="bg-primary text-white py-10 px-5 md:px-20 text-xs md:text-sm">
      {/* Top Section - Logo & Subscribe Form */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="">
            <img src={Logo} alt="" className="w-26 h-20" />
          </Link>
        </div>
        
        {/* Subscribe Section */}
        <div className="flex items-center gap-2 w-full md:w-auto">
        <NewsletterForm />

        </div>
      </div>

      {/* Main Content - Logo Description, Links, and Buttons in One Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-8">
        {/* Logo Description */}
        <div className="flex flex-col items-center">
          <p className="mt-4">
            Zongea Institute of Technology is a free tech school in Liberia, providing
            accessible, high-quality education to empower students with the skills to
            succeed in the tech industry.
          </p>
          <p className="mt-2">
            Zongea Institute of Technology is a free tech school in Liberia, providing
            accessible, high-quality education.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:items-center">
          <h3 className="font-extrabold text-base mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive('/') ? 'text-secondary-yellow' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/motivation"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/motivation') ? 'text-secondary-yellow' : ''
                }`}
              >
               Motivation
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses') ? 'text-secondary-yellow' : ''
                }`}
              >
               Courses
              </Link> 
            </li>
            <li>
              <Link
                to="/admission"
                className={`block text-white hover:text-secondary-yellow ${
                 isActive ('/admission') ? 'text-secondary-yellow' : ''
                }`}
            >
             Admission
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block text-white hover:text-secondary-yellow ${
                 isActive ('/contact') ? 'text-secondary-yellow' : ''
                }`}
            >
             Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/donate"
                className={`block text-white hover:text-secondary-yellow ${
                 isActive ('/donate') ? 'text-secondary-yellow' : ''
                }`}
              >
                Donation
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Courses */}
        <div className="flex flex-col ">
          <h3 className="font-extrabold text-base mb-3 text-white">Our Courses</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/courses/ui-ux-design"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses/ui-ux-design') ? 'text-secondary-yellow' : ''
                 }`}
              >
                UI/UX Courses
              </Link>  
            </li>
            <li>
              <Link 
                to="/courses/graphic-design"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses/graphic-design') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Graphic Design Courses
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/full-stack-development"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses/full-stack-development') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Full Stack Courses
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/cybersecurity"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses/cybersecurity') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Cyber Security Courses
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/microsoft-office"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses/microsoft-office') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Microsoft Office Courses
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/database-admin"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses/database-admin') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Database Admin Courses
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col">
          <h3 className="font-extrabold text-base mb-3 text-white">Contact Us</h3>
          <p className="mb-2">Monrovia, Liberia RIA Rehab Community</p>
          <p className="mb-2">US Address: 300 Southtown Circle, Roseville NC 27571</p>
          <p className="mb-2">
            <a href="mailto:info@zongetech.com" className="hover:text-secondary-yellow hover:underline">
              Email: info@zongetech.com
            </a>
          </p>
          <p className="mb-2">
            <a href="tel:+231-888-761-501" className="hover:text-secondary-yellow hover:underline">
              Phone: +231-888-761-501
            </a>
          </p>
        </div>


        {/* Buttons Section */}
        <div className="flex flex-col gap-[4px] text-primary">
           <button className="bg-primary text-white border border-white border-r-0 px-2 py-2 rounded-md hover:bg-white">
            <Link
                to="/tutorship"
                className={`block text-white hover:text-primary ${
                 isActive ('/tutorship') ? 'text-text-primary' : ''
                }`}
              >
                Tutorship
            </Link>
          </button>
          <button className="bg-primary text-white border border-white border-r-0 px-2 py-2 rounded-md hover:bg-white">
            <Link 
              to="/admission"
              className={`block text-white hover:text-primary ${
                isActive ('/admission') ? 'text-primary' : ''
               }`}
            >
              Application 
            </Link>
            </button>
           <button className="bg-primary text-white border border-white border-r-0 px-2 py-2 rounded-md hover:bg-white">
            <Link 
              to="/mentorship"
              className={`block text-white hover:text-primary ${
                isActive ('/mentorship') ? 'text-primary' : ''
               }`}
              >
                Mentorship
            </Link>
            </button>
           <button className="bg-primary text-white border border-white border-r-0 px-2 py-2 rounded-md hover:bg-white">
            <Link 
              to="/donate"
              className={`block text-white hover:text-primary ${
                isActive ('/donate') ? 'text-primary' : ''
               }`}
              > 
              Donate Today
            </Link>
           </button>
        </div>
      </div>

      {/* Social Media Icons & Copyright */}
      <div className="mt-8  flex flex-col gap-4 md:flex-row justify-between items-center border-t border-white pt-4">
        <p>Copyright Notice © 2025 Zongea Institute of Technology. All rights reserved.</p>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaFacebookF className="text-white cursor-pointer" size={18} />
          <FaInstagram className="text-white cursor-pointer" size={18} />
          <FaLinkedinIn className="text-white cursor-pointer" size={18} />
          <FaGithub className="text-white cursor-pointer" size={18} />
        </div>
        
        <p>An Institution by Walamen</p>
      </div>
    </footer>
  );
};

export default Footer;
