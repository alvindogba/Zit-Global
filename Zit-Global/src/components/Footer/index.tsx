import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";
import Logo from "../../asset/images/zongea-logo.png";
import { Link, useLocation } from 'react-router-dom';
import images from '../../asset/images/basic_earth_map_continents_Basic Earth Map Continents.svg'

const Footer = () => {

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="text-white pt-10 px-5 md:px-20 text-xs md:text-sm"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.1), rgba(0, 0, 84, 0.1)), url(${images})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 1s ease-in',
    }}
    >
      {/* Top Section - Logo & Subscribe Form */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="">
            <img src={Logo} alt="" className="w-26 h-20" />
          </Link>
        </div>
        
        {/* Subscribe Section */}
        <div className="hidden md:flex items-center gap-2 w-full md:w-auto">
        <NewsletterForm />

        </div>
      </div>

      {/* Main Content - Logo Description, Links, and Buttons in One Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-8">
        {/* Logo Description */}
        <div className="col-span-2 flex flex-col items-center">
          <p className="mt-4 font-roboto">
            Zongea Institute of Technology is a free tech school in Liberia, providing
            accessible, high-quality education to empower students with the skills to
            succeed in the tech industry.
          </p>
          <p className="mt-2 font-roboto">
            Zongea Institute of Technology is a free tech school in Liberia, providing
            accessible, high-quality education.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:items-center ">
          <h3 className="font-extrabold font-noto text-base mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                  isActive('/') ? 'text-secondary-yellow' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/motivation"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                  isActive ('/motivation') ? 'text-secondary-yellow' : ''
                }`}
              >
               Motivation
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                  isActive ('/courses') ? 'text-secondary-yellow' : ''
                }`}
              >
               Courses
              </Link> 
            </li>
            <li>
              <Link
                to="/admission"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                 isActive ('/admission') ? 'text-secondary-yellow' : ''
                }`}
            >
             Admission
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                 isActive ('/contact') ? 'text-secondary-yellow' : ''
                }`}
            >
             Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/donate"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
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
          <h3 className="font-extrabold font-noto text-base mb-3 text-white">Our Courses</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/courses/ui-ux-design"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                  isActive ('/courses/ui-ux-design') ? 'text-secondary-yellow' : ''
                 }`}
              >
                UI/UX Design
              </Link>  
            </li>
            <li>
              <Link 
                to="/courses/graphic-design"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                  isActive ('/courses/graphic-design') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Graphic Design 
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/full-stack-development"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                  isActive ('/courses/full-stack-development') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Full Stack Development
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/cybersecurity"
                className={`block text-white font-roboto hover:text-secondary-yellow ${
                  isActive ('/courses/cybersecurity') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Cyber Security 
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/microsoft-office"
                className={`block text-white hover:text-secondary-yellow ${
                  isActive ('/courses/microsoft-office') ? 'text-secondary-yellow' : ''
                 }`}
              >
                Microsoft Office Seuite
              </Link>
            </li>
            <li>
              <Link 
                to="/courses/database-admin"
                className={`block text-white font-roboto hover:text-secondary ${
                  isActive ('/courses/database-admin') ? 'text-secondary' : ''
                 }`}
              >
                Database Administration
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex flex-col">
          <h3 className="font-extrabold font-noto text-base mb-3 text-white">Contact Us</h3>
          <p className="mb-2 font-roboto text-[14px]">Monrovia, Liberia RIA Rehab Community</p>
          <p className="mb-2 font-roboto text-[14px]">US Address: 300 Southtown Circle, Roseville NC 27571</p>
          <p className="mb-2 font-roboto text-[14px]">
            <a href="mailto:info@zongetech.com" className=" text-[14px] font-roboto hover:underline">
              Email: info@zongetech.com
            </a>
          </p>
          <p className="mb-2">
            <a href="tel:+231-888-761-501" className=" text-[14px] font-roboto hover:underline">
              Phone: +231-888-761-501
            </a>
          </p>
        </div>


{/* Buttons Section */}
      <div className="flex flex-col gap-1 text-primary">
        <Link
          to="/tutorship-program"
          className={`bg-secondary text-white hover:font-semibold text-center px-2 py-2 rounded-md hover:bg-white font-sans hover:text-primary transition-colors ${
            isActive('/tutorship-program') ? 'text-primary bg-white' : ''
          }`}
        >
          Tutorship
        </Link>
        
        <Link 
          to="/admission"
          className={`bg-secondary text-white hover:font-semibold text-center px-2 py-2 rounded-md hover:bg-white font-sans hover:text-primary transition-colors ${
            isActive('/admission') ? 'text-primary bg-white' : ''
          }`}
        >
          Application 
        </Link>
        
        <Link 
          to="/mentorship-program"
          className={`bg-secondary text-white hover:font-semibold text-center px-2 py-2 rounded-md hover:bg-white font-sans hover:text-primary transition-colors ${
            isActive('/mentorship-program') ? 'text-primary bg-white' : ''
          }`}
        >
          Mentorship
        </Link>
        
        <Link 
          to="/donate"
          className={`bg-secondary text-white hover:font-semibold text-center px-2 py-2 rounded-md hover:bg-white font-sans hover:text-primary transition-colors ${
            isActive('/donate') ? 'text-primary bg-white' : ''
          }`}
        > 
          Donate Today
        </Link>
      </div>
      </div>
      <div className="md:hidden flex items-center gap-2 w-full md:w-auto">
        <NewsletterForm />

        </div>

      {/* Social Media Icons & Copyright */}
      <div className=" flex flex-col gap-4 md:flex-row justify-between items-center bg-primary py-4">
        <p className="font-roboto text-[15px] text-white">Copyright Notice © {new Date().getFullYear()} Zongea Institute of Technology. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <p className="text-white">Follow Us On :</p>
          <Link to="#" className="w-6 h-6 rounded-full bg-white hover:bg-secondary hover:text-white flex justify-center items-center text-primary"><FaFacebookF className="cursor-pointer" size={16} /></Link>
          <Link to="#" className="w-6 h-6 rounded-full bg-white hover:bg-secondary hover:text-white flex justify-center items-center text-primary"><FaInstagram className=" cursor-pointer" size={16}  /></Link>
          <Link to="#" className="w-6 h-6 rounded-full bg-white hover:bg-secondary hover:text-white flex justify-center items-center text-primary"><FaLinkedinIn className=" cursor-pointer" size={16}  /></Link>
          <Link to="#" className="w-6 h-6 rounded-full bg-white hover:bg-secondary hover:text-white flex justify-center items-center text-primary"  ><FaGithub className=" cursor-pointer" size={16}  /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
