import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from "../asset/images/zongea-logo.png";

const navigation = [
  {
    name: 'Academics',
    href: '/cohorts',
    dropdown: [
      { name: 'Cohort', href: '/cohorts' },
      { name: 'Students', href: '/students' },
    ],
  },
  {
    name: 'Make Impact',
    href: '/guilding-hands-program',
    dropdown: [
      { name: 'Guiding Hands Program', href: '/guilding-hands-program' },
      { name: 'Mentorship Program', href: '/mentorship-program' },
      { name: 'Tutorship Program', href: '/tutorship-program' },

      { name: 'Be A Donor', href: '/be-a-donor' },
    ],
  },
  {
    name: 'Admission',
    href: '/admission',
    dropdown: [
      { name: 'How To Apply', href: '/how-to-apply' },
      { name: 'Application Form', href: '/admission' },
    ],
  },

  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <header className="h-fit  fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-primary shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-2 px-6" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="">
            <img src={Logo} alt="" className="w-26 h-20" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:text-primary-600"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {!isHomePage && (
            <Link
              to="/"
              className="text-md leading-6  hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            // the moltivation link

          )}

          <Link
            to="/motivation"
            className="text-md leading-6 text-white hover:text-primary-600 transition-colors"
          >
            Motivation
          </Link>
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.href}
                className={`text-md font-semibold leading-6 transition-colors ${isActive(item.href) ? 'text-primary-600' : 'text-white  hover:text-primary-600'
                  }`}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="absolute left-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.href}
                      className={`block px-4 py-2 text-sm transition-colors ${isActive(dropdownItem.href)
                          ? 'bg-primary-50 text-primary'
                          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/donate"
            className="rounded-full bg-primary border border-white px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
          >
            Make A Donation
          </Link>
        </div>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog as="div" className="lg:hidden" static open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="text-2xl font-bold text-primary-600">RuizArch</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {!isHomePage && (
                      <Link
                        to="/"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                    )}
                    {navigation.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <Link
                            to={item.href}
                            className={`-mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors ${isActive(item.href)
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-gray-900 hover:bg-primary-50 hover:text-primary-600'
                              }`}
                            onClick={() => {
                              if (!item.dropdown) setMobileMenuOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                          {item.dropdown && (
                            <button
                              onClick={() => toggleDropdown(item.name)}
                              className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              <motion.div
                                animate={{ rotate: openDropdowns.includes(item.name) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDownIcon className="h-5 w-5" />
                              </motion.div>
                            </button>
                          )}
                        </div>
                        {item.dropdown && (
                          <motion.div
                            initial="collapsed"
                            animate={openDropdowns.includes(item.name) ? "expanded" : "collapsed"}
                            variants={{
                              expanded: { height: "auto", opacity: 1 },
                              collapsed: { height: 0, opacity: 0 }
                            }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 overflow-hidden"
                          >
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.href}
                                className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${isActive(dropdownItem.href)
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                                  }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ))}
                    <div className="mt-4 px-3">
                      <Link
                        to="/contact"
                        className="w-full inline-flex justify-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
};
