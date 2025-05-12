import React from 'react';
import { DollarSign, Zap, Globe } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border border-gray-100 hover:border-blue-100">
      <div className="rounded-full bg-blue-100 w-14 h-14 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign size={24} className="text-blue-600" />,
      title: "Earn Generously",
      description: "5% commission on every donation made through your link. Withdraw anytime."
    },
    {
      icon: <Zap size={24} className="text-blue-600" />,
      title: "Simple & Seamless",
      description: "Generate your unique referral link in seconds. Track results in real time."
    },
    {
      icon: <Globe size={24} className="text-blue-600" />,
      title: "Make an Impact",
      description: "Amplify causes you believe in while earning rewards."
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full mb-4">
            Benefits
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Why Become a Partner?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of partners who are earning passive income while supporting meaningful causes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-blue-50 rounded-full px-6 py-3 text-blue-700 font-medium">
            Your link = Your earnings. It's that simple.
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;