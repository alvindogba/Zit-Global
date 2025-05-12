import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="mb-4 inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Affiliate Program
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Earn Commissions by Supporting Causes You Care About
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-xl mx-auto md:mx-0">
              Join Our Affiliate Program. Turn Your Influence into Impact. Get Paid for Every Donation You Refer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Get Started for Free
              </button>
              <button 
                className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 text-lg font-medium py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2"
                onClick={() => scrollToSection('how-it-works')}
              >
                See How It Works <ChevronDown size={18} />
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="rounded-lg overflow-hidden shadow-2xl relative bg-white p-2">
              <img 
                src="https://images.pexels.com/photos/7821702/pexels-photo-7821702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Dashboard Preview" 
                className="rounded-lg w-full"
              />
              
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-blue-900/60 rounded-lg flex items-end">
                <div className="p-6 text-white">
                  <div className="text-xl font-bold mb-2">Your Analytics Dashboard</div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm">Referrals: 128</div>
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm">Earnings: $950</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-green-100 text-green-800 rounded-full px-5 py-2 shadow-lg animate-pulse">
              +$45.00 earned today
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => scrollToSection('benefits')} 
            className="animate-bounce bg-white rounded-full p-2 shadow-md"
          >
            <ChevronDown className="text-blue-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;