import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-secondary bg-clip-text text-transparent">
            Partnership Program
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#benefits" className="text-primary hover:text-secondary font-bold">Benefits</a>
          <a href="#how-it-works" className="text-primary hover:text-secondary font-bold">How It Works</a>
          <a href="#testimonials" className="text-primary hover:text-secondary font-bold">Testimonials</a>
          <a href="#faq" className="text-primary hover:text-secondary font-bold">FAQ</a>
          <Link to="/dashboard" className="text-primary hover:text-secondary font-bold">Dashboard</Link>
        </nav>

        <div className="hidden md:block">
          <button 
            onClick={() => navigate('/signup')} 
            className="bg-secondary hover:bg-primary text-white font-bold py-2 px-6 rounded-full transition-all"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#benefits" 
              className="text-primary py-2 border-b" 
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </a>
            <a 
              href="#how-it-works" 
              className="text-primary py-2 border-b" 
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="text-primary py-2 border-b" 
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#faq" 
              className="text-primary py-2 border-b" 
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <Link 
              to="/dashboard" 
              className="text-primary py-2 border-b"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/signup');
              }} 
              className="bg-secondary hover:bg-primary text-white font-bold py-2 px-6 rounded-full transition-all w-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;