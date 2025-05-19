import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-50 text-primary">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-h2 font-noto mb-6">Ready to Start Earning While Making an Impact?</h2>
          <p className="text-h4 mb-8 text-primary font-roboto">
            Join a growing community of partners who are earning passive income while making a positive impact on meaningful causes.
          </p>
          
          <div className="bg-primary/10 backdrop-blur-sm p-8 rounded-xl mb-10 shadow-xl transform transition-all duration-300 hover:shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center transition-transform duration-300 hover:scale-105">
                <div className="text-4xl font-bold mb-2 font-sans">15%</div>
                <div className="text-primary font-roboto">Commission Rate</div>
              </div>
              <div className="text-center transition-transform duration-300 hover:scale-105">
                <div className="text-4xl font-bold mb-2 font-sans">$0</div>
                <div className="text-primary font-roboto">Cost to Join</div>
              </div>
              <div className="text-center transition-transform duration-300 hover:scale-105">
                <div className="text-4xl font-bold mb-2 font-sans">24/7</div>
                <div className="text-primary font-roboto">Support Available</div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/signup')}
            className="bg-white text-primary hover:scale-105 text-md font-semibold py-4 px-10 rounded-md transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            Start Earning Today <ArrowRight size={20} />
          </button>
          
          <div className="mt-6 text-sm text-primary font-roboto">
            By signing up, you agree to our <a href="#" className="underline hover:text-secondary transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-secondary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;