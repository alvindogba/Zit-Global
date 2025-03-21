import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../asset/images/zongea-logo.png"; // Fixed path

const navigation = [
  {
    name: "Academics",
    href: "/cohorts",
    dropdown: [
      { name: "Cohort", href: "/cohorts" },
      { name: "Students", href: "/students" },
    ],
  },
  {
    name: "Make Impact",
    href: "/guiding-hand",
    dropdown: [
      { name: "Guiding Hand Program", href: "/guiding-hand" }, // Fixed typo
      { name: "Mentorship Program", href: "/mentorship-program" },
      // { name: "Tutorship Program", href: "/tutorship-program" }, // Fixed typo
      { name: "Be A Donor", href: "/be-a-donor" },
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
  { name: "Contact", href: "/contact" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState(new Set());
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Function to toggle dropdown state
  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => {
      const updated = new Set(prev);
      updated.has(name) ? updated.delete(name) : updated.add(name);
      return updated;
    });
  };

  // Function to check active route
  const isActive = (href: string) => location.pathname.startsWith(href);

  return (
    <header className="h-fit fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-primary shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-2 px-6">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" aria-label="Home">
            <img src={Logo} alt="Zongea Logo" className="w-26 h-20" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="p-1 text-white hover:text-primary-600"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
          >
            <Bars3Icon className="h-12 w-12" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {!isHomePage && (
            <Link to="/" className="text-md hover:text-primary-600 transition-colors">
              Home
            </Link>
          )}

          <Link to="/motivation" className="text-md text-white hover:text-primary-600 transition-colors">
            Motivation
          </Link>

          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.href}
                className={`text-md font-semibold transition-colors ${
                  isActive(item.href) ? "text-primary-600" : "text-white hover:text-primary-600"
                }`}
              >
                {item.name}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.href}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(dropdownItem.href)
                          ? "bg-primary-50 text-primary"
                          : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                      }`}
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Donation Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/donate" className="rounded-full bg-primary px-4 py-2 text-sm border border-white font-semibold text-white shadow-sm hover:bg-primary-600 transition">
            Make A Donation
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
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
                <Link to="/" className="-m-1.5 p-1" onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-2xl font-bold text-primary">Zit-Global</span>
                </Link>
                <button className="p-1 bg-white text-primary hover:text-blue-600 outline-none " onClick={() => setMobileMenuOpen(false)}>
                  <XMarkIcon className="h-12 w-12" />
                </button>
              </div>

              <div className="mt-6">
                {!isHomePage && (
                  <Link to="/" className="block py-2 text-base font-semibold text-primary hover:bg-primary-50 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                )}
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Link to={item.href} className="py-2 text-lg font-semibold text-gray-900 hover:text-primary" onClick={() => !item.dropdown && setMobileMenuOpen(false)}>
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <button onClick={() => toggleDropdown(item.name)} className="p-2 hover:text-primary bg-white">
                          <ChevronDownIcon className={`h-5 w-5 font-bold text-primary ${openDropdowns.has(item.name) ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>

                    {item.dropdown && openDropdowns.has(item.name) && (
                      <div className="ml-4">
                        {item.dropdown.map((dropdownItem) => (
                          <Link key={dropdownItem.name} to={dropdownItem.href} className="block py-1.5 text-sm text-gray-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-4 px-3">
                      <Link
                         to="/donate"
                        className="w-full inline-flex justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                         onClick={() => setMobileMenuOpen(false)}
                       >
                         Make A Donation
                       </Link>
                     </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
};

