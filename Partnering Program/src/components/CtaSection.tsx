import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CtaSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Earning While Making an Impact?</h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Join thousands of partners who are supporting causes they care about and earning rewards.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">5%</div>
                <div className="text-blue-100">Commission Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$0</div>
                <div className="text-blue-100">Cost to Join</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-700 hover:bg-blue-50 text-lg font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            Start Earning Today <ArrowRight size={20} />
          </button>
          
          <div className="mt-6 text-sm text-blue-200">
            By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;