import { useState } from "react";
import { href, NavLink, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../asset/images/zongea-logo.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import axios from "axios";

const navigation = [
  {
    name: "Academics",
    href: "/cohorts",
    dropdown: [
      { name: "Cohort", href: "/cohorts" },
      { name: "Courses", href: "/courses" },
    ],
  },
  {
    name: "Make Impact",
    href: "/impact-connect-center",
    dropdown: [
      { name: "Impact & Connect Center", href: "/impact-connect-center" }, 
      { name: "Mentoring Program", href: "/mentorship-program" },
      { name: "Tutoring Program", href: "/tutorship-program" },
    ],
  },
  {
    name: "Admission",
    href: "/admission",
    dropdown: [
      { name: "How To Apply", href: "/how-to-apply" },
      { name: "Application Form", href: "/admission" },
    ],
  },
  {
    name: "Portal",
    href: "http://localhost:5000/api/portal/auth",
    dropdown: [
      {name: "Tutor Portal", href: "http://localhost:5000/api/portal/tutor"},
      {name: "Tutee Portal", href: "http://localhost:5000/api/portal/tutee"},

    ],
  },

  { name: "Contact", href: "/contact" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [leftModalOpen, setLeftModalOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Form state for the contact form in the side panel
  const [formState, setFormState] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
    submitted: false,
    error: null as string | null
  });

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => {
      const updated = new Set(prev);
      updated.has(name) ? updated.delete(name) : updated.add(name);
      return updated;
    });
  };

  const isActive = (href: string) => location.pathname.startsWith(href);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      error: null
    }));
  };


  const handleFormSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
         // Simple validation
    if (!formState.fullName || !formState.email || !formState.message) {
      setFormState(prev => ({
        ...prev,
        error: "Please fill in all required fields"
      }));
      return;
    }

      // Here you would typically send the form data to your backend
   const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact/submit`, formState)
    // Reset form after submission
    console.log("Form submitted successfully:", response.data);
    setFormState({
      fullName: "",
      phone: "",
      email: "",
      message: "",
      submitted: true,
      error: null
    });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormState(prev => ({ ...prev, error: "An error occurred while submitting the form" }));
    }
    finally {
      const timeout = setTimeout(() => {
        setFormState(prev => ({ ...prev, submitted: false }));
      }, 3000); // Reset submitted state after 3 seconds

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  };

  return (
    <header className="h-fit fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-primary shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-2 px-6">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <NavLink to="/" aria-label="Home">
            <img src={Logo} alt="Zongea Logo" className="w-26 h-20" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="p-1 text-white hover:text-secondary"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
          >
            <Bars3Icon className="h-12 w-12" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-4 items-center">
          {!isHomePage && (
            <NavLink 
            to="/"
            className={({ isActive }) => 
              `text-md font-roboto transition-colors ${
                isActive ? "text-white font-semibold" : "text-white hover:text-secondary"
              }`
            }
          >
            Home
          </NavLink> 
          )}

          <NavLink 
            to="/motivation" 
            className={`text-md font-roboto transition-colors ${
              isActive("/motivation") ? "text-secondary font-semibold" : "text-white hover:text-secondary"
            }`}
          >
            Motivation
          </NavLink>

          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <div className="flex items-center">
                <NavLink
                  to={item.href}
                  className={`text-md font-roboto transition-colors ${
                    isActive(item.href) 
                      ? "text-secondary font-semibold" 
                      : "text-white hover:text-secondary"
                  }`}
                >
                  {item.name}
                </NavLink>
                {item.dropdown && (
                  <ChevronDownIcon 
                    className={`ml-1 h-4 w-4 transition-transform ${
                      isActive(item.href) || openDropdowns.has(item.name) 
                        ? "text-secondary rotate-180" 
                        : "text-white group-hover:text-secondary"
                    }`}
                  />
                )}
              </div>

              {item.dropdown && (
                <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {item.dropdown.map((dropdownItem) => (
                    <NavLink
                      key={dropdownItem.name}
                      to={dropdownItem.href}
                      className={`block px-4 py-2 font-roboto text-sm transition-colors ${
                        isActive(dropdownItem.href)
                          ? "bg-primary/10 text-secondary font-semibold"
                          : "text-dparacolor hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {dropdownItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Donation Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink 
            to="/donate" 
            className="font-sans rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-primary shadow-sm transition"
          >
            Make A Donation
          </NavLink>
        </div>

        {/* Side Panel Trigger */}
        <button 
          className="hidden lg:block p-1 md:pl-8 text-white hover:text-secondary"
          onClick={() => setLeftModalOpen(true)}
          aria-label="Open side panel"
        >
          <Bars3BottomLeftIcon className="h-8 w-8" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog 
            as="div" 
            className="lg:hidden" 
            open={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)}
            static
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm"
            >
              <div className="flex items-center justify-between">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src={Logo} alt="Zongea Logo" className="h-16" />
                </NavLink>
                <button 
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-8 w-8" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {!isHomePage && (
                      <NavLink
                        to="/"
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                          isActive("/") 
                            ? "bg-primary/10 text-secondary" 
                            : "text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </NavLink>
                    )}

                    <NavLink
                      to="/motivation"
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        isActive("/motivation")
                          ? "bg-primary/10 text-secondary"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Motivation
                    </NavLink>

                    {navigation.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <NavLink
                            to={item.href}
                            className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                              isActive(item.href)
                                ? "bg-primary/10 text-secondary"
                                : "text-gray-900 hover:bg-gray-50"
                            }`}
                            onClick={() => !item.dropdown && setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </NavLink>
                          {item.dropdown && (
                            <button 
                              onClick={() => toggleDropdown(item.name)}
                              className="p-2 rounded-md hover:bg-gray-100"
                            >
                              <ChevronDownIcon 
                                className={`h-5 w-5 text-gray-500 transition-transform ${
                                  openDropdowns.has(item.name) ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {item.dropdown && openDropdowns.has(item.name) && (
                          <div className="ml-4 space-y-1">
                            {item.dropdown.map((dropdownItem) => (
                              <NavLink
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                                  isActive(dropdownItem.href)
                                    ? "bg-primary/10 text-secondary"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dropdownItem.name}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="py-6">
                    <div className="flex flex-col space-y-4">
                      <NavLink
                        to="mailto:info@zongeatech.com"
                        className="flex items-center gap-x-2 text-sm font-medium text-gray-900 hover:text-primary"
                      >
                        <span className="text-gray-500">✉️</span>
                        info@zongeatech.com
                      </NavLink>
                      {/* <NavLink
                        to="tel:+231886761501"
                        className="flex items-center gap-x-2 text-sm font-medium text-gray-900 hover:text-primary"
                      >
                        <span className="text-gray-500"><FaPhone /></span>
                        +231 886 761 501
                      </NavLink> */}
                    </div>

                    <div className="mt-6">
                      <NavLink
                        to="/donate"
                        className="w-full flex justify-center rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Make A Donation
                      </NavLink>
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                      <NavLink to="#" className="text-secondary hover:text-primary">
                        <FaFacebookF className="h-5 w-5" />
                      </NavLink>
                      <NavLink to="#" className="text-secondary hover:text-primary">
                        <FaLinkedinIn className="h-5 w-5" />
                      </NavLink>
                      <NavLink to="#" className="text-secondary hover:text-primary">
                        <FaInstagram className="h-5 w-5" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Left Side Panel */}
      <AnimatePresence>
        {leftModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setLeftModalOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 h-screen overflow-y-auto w-full sm:w-96 bg-white shadow-lg z-50"
            >
              <div className="bg-primary text-white p-4 flex justify-between items-center">
                <img src={Logo} alt="Logo" className="h-10" />
                <button 
                  onClick={() => setLeftModalOpen(false)}
                  className="p-1 text-white hover:text-secondary"
                >
                  <XMarkIcon className="h-8 w-8" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-primary">About ZIT</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Tech careers within reach. Whether you're in high school or have some college, 
                    we'll get you job-ready—fast. All it takes is your drive to succeed.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <NavLink
                    to="/teaching-at-zit"
                    className="text-center bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    onClick={() => setLeftModalOpen(false)}
                  >
                    Teach
                  </NavLink>
                  <NavLink
                    to="/tutorship-program"
                    className="text-center bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    onClick={() => setLeftModalOpen(false)}
                  >
                    Tutor
                  </NavLink>
                  <NavLink
                    to="/mentorship-program"
                    className="text-center bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
                    onClick={() => setLeftModalOpen(false)}
                  >
                    Mentor
                  </NavLink>
                </div>

                {/* <div>
                  <h3 className="text-lg font-bold text-primary">Contact Information</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <NavLink href='' className="flex items-center gap-2 text-gray-600">
                      <span><FaPhone /></span>
                      <span>+231 886 761 501</span>
                    </NavLink>
                    <NavLink
                      to="mailto:info@zongeatech.com"
                      className="flex items-center gap-x-2 text-sm font-medium text-gray-900 hover:text-primary"
                      >
                      <span className="text-gray-500">✉️</span>
                      info@zongeatech.com
                    </NavLink>
                    <p className="text-gray-600">
                      Rehab Community Opposite Rehab Mansion
                    </p>
                  </div>
                </div> */}

                <div>
                  <h3 className="text-lg font-bold text-primary">Follow Us</h3>
                  <div className="mt-2 flex gap-4">
                    <NavLink to="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <FaFacebookF className="h-5 w-5 text-gray-700" />
                    </NavLink>
                    <NavLink to="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <FaInstagram className="h-5 w-5 text-gray-700" />
                    </NavLink>
                    <NavLink to="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <FaLinkedinIn className="h-5 w-5 text-gray-700" />
                    </NavLink>
                  </div>
                </div>

                <div>
            <h3 className="text-lg font-bold text-primary">Leave A Message</h3>
            {formState.submitted ? (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                Thank you for your message! We'll get back to you soon via email.
              </div>
            ) : (
              <form className="mt-2 space-y-3" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name*"
                  value={formState.fullName}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formState.phone}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  value={formState.email}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message*"
                  rows={3}
                  value={formState.message}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  required
                />
                {formState.error && (
                  <p className="text-red-500 text-sm">{formState.error}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary py-2 text-sm font-medium text-white rounded-md hover:bg-primary/90"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;