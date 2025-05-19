// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import ZitLogo from "../../../client/src/asset/images/zongea-logo.png";

interface NavigationItem {
  name: string;
  href: string;
}

const navigation: NavigationItem[] = [
  { name: "Benefits", href: "/benefits" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "FAQ", href: "/faq" },
  { name: "Partners", href: "/partners" },
  { name: "Dashboard", href: "/dashboard" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHashActive = (href: string) => href.startsWith('/') && location.hash === href;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-md py-2' : 'bg-primary py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-2xl font-bold">
            <img src={ZitLogo} alt="Zit Logo" className="w-32 h-16 object-contain" />
          </NavLink>
        </div>

        <nav className="hidden md:flex space-x-6 items-center">
          {navigation.map((item) => (
            <NavLink 
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `text-md font-roboto transition-colors ${
                  isActive || isHashActive(item.href)
                    ? 'text-secondary font-semibold'
                    : 'text-white hover:text-secondary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-secondary hover:bg-white hover:text-primary text-white font-sans text-sm font-semibold py-2 px-6 rounded-md transition-all shadow-sm"
          >
            Sign Up
          </button>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col divide-y divide-gray-100">
            {navigation.map((item) => (
              <NavLink 
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `py-2 text-base font-medium ${
                    isActive || isHashActive(item.href)
                      ? 'text-secondary font-semibold'
                      : 'text-primary hover:text-secondary'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-4 mt-2">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/signup');
                }} 
                className="bg-secondary hover:bg-primary text-white font-semibold py-2 px-6 rounded-md transition-all w-full shadow-sm"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
