import React from 'react';
import { DollarSign, Zap, Globe, Shield, LineChart, Users, Clock, Gift, Medal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8">
      <div className="rounded-full bg-blue-100 text-secondary w-14 h-14 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const BenefitsPage: React.FC = () => {
  const primaryBenefits = [
    {
      icon: <DollarSign size={24} className="text-secondary" />,
      title: "Earn Generously",
      description: "15% commission on every donation made through your link. Withdraw anytime your balance exceeds $50."
    },
    {
      icon: <Zap size={24} className="text-secondary" />,
      title: "Simple & Seamless",
      description: "Generate your unique referral link in seconds. Track results in real time with our intuitive dashboard."
    },
    {
      icon: <Globe size={24} className="text-secondary" />,
      title: "Make an Impact",
      description: "Amplify causes you believe in while earning rewards. Your influence becomes actual support for meaningful initiatives."
    }
  ];

  const additionalBenefits = [
    {
      icon: <Shield size={24} className="text-secondary" />,
      title: "Reliable Tracking",
      description: "Our 90-day cookie window ensures you get credit for referrals even if they don't donate immediately."
    },
    {
      icon: <LineChart size={24} className="text-secondary" />,
      title: "Detailed Analytics",
      description: "Access comprehensive statistics about your referrals, conversion rates, and earnings to optimize your strategy."
    },
    {
      icon: <Users size={24} className="text-secondary" />,
      title: "Community Support",
      description: "Join our community of partners to share strategies, tips, and success stories."
    },
    {
      icon: <Clock size={24} className="text-secondary" />,
      title: "Fast Payments",
      description: "Get your earnings quickly with multiple payment options including PayPal, direct deposit, and more."
    },
    {
      icon: <Gift size={24} className="text-secondary" />,
      title: "Bonus Incentives",
      description: "Earn special bonuses when you reach milestones or during promotional periods."
    },
    {
      icon: <Medal size={24} className="text-secondary" />,
      title: "Recognition Program",
      description: "Top partners receive special recognition, additional perks, and exclusive opportunities."
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-h1 font-bold mb-6">Partner Benefits</h1>
              <p className="text-h4 mb-8 opacity-90">
                Discover why becoming a partner is a rewarding experience, both financially and socially.
              </p>
              <Link 
                to="/signup" 
                className="bg-secondary hover:bg-white hover:text-primary text-white font-bold py-2 px-3 rounded-lg inline-flex items-center gap-2 transition-all shadow-lg"
              >
                Become a Partner <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Primary Benefits */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                Core Benefits
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">Why Become a Partner?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join a growing community of partners who are earning passive income while making a positive impact on meaningful causes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {primaryBenefits.map((benefit, index) => (
                <BenefitCard 
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <div className="inline-block bg-secondary rounded-full px-6 py-3 text-white font-medium">
                Your link = Your earnings. It's that simple.
              </div>
            </div>
          </div>
        </section>

        {/* Commission Breakdown */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                Earnings Potential
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">How Our Commission Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our transparent commission structure ensures you're rewarded fairly for your referrals.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Commission Structure</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                      <div>
                        <span className="font-medium">15% standard commission</span>
                        <p className="text-gray-600 text-sm mt-1">On all donations processed through your referral link</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                      <div>
                        <span className="font-medium">Recurring donations</span>
                        <p className="text-gray-600 text-sm mt-1">Earn commission on every payment, not just the first one</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                      <div>
                        <span className="font-medium">Performance bonuses</span>
                        <p className="text-gray-600 text-sm mt-1">Additional rewards for high-performing partners</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</span>
                      <div>
                        <span className="font-medium">Special promotions</span>
                        <p className="text-gray-600 text-sm mt-1">Periodic campaigns with increased commission rates</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Earnings Example</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="mb-4">
                      <p className="text-gray-700 mb-2"><strong>Scenario:</strong> You refer 20 donors who each contribute $100</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span>Total Donations:</span>
                        <span className="font-medium">$2,000</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span>Commission Rate:</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span>Your Earnings:</span>
                        <span className="text-secondary font-bold text-xl">$300</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Benefits */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                More Advantages
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">Additional Partner Benefits</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Beyond the commission structure, our partners enjoy many other advantages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalBenefits.map((benefit, index) => (
                <BenefitCard 
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {/* <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                Success Story
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">What Our Partners Say</h2>
            </div>

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl text-secondary mb-6">"</div>
              <p className="text-lg text-gray-700 italic mb-8">
                I joined the Partner Program six months ago and have already earned over $2,000 in commissions. The dashboard makes it easy to track my progress, and I love knowing my efforts are supporting meaningful causes.
              </p>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                <div className="text-left">
                  <div className="font-bold text-primary">Michael Chen</div>
                  <div className="text-gray-500">Community Organizer</div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-50 text-primary">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 font-bold mb-6">Ready to Start Earning?</h2>
              <p className="text-xl mb-8">
                Join our Partnering Program today and start enjoying all these benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup" 
                  className="bg-secondary hover:bg-white hover:text-primary text-white font-bold py-2 px-3 rounded-lg transition-all shadow-lg"
                >
                  Sign Up Now
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="bg-primary text-white hover:bg-white hover:text-primary font-bold py-2 px-3 rounded-lg transition-all"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BenefitsPage;