import React, { useState } from 'react';
import { Link as LinkIcon, ChevronRight, Share2, BarChart, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HowItWorksPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Create Your Referral Link",
      description: "Sign up for free and instantly generate your unique referral link from your dashboard.",
      icon: <LinkIcon size={24} className="text-secondary" />,
      image: "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      details: "Once you create your account, you'll have immediate access to your personalized dashboard. Your unique referral link is automatically generated and ready to use. This link contains a special tracking code that identifies you as the referrer, ensuring you get credit for every donation made through your link.",
      features: ["Instant link generation", "No technical setup required", "Custom link options available", "Works on all platforms and devices"]
    },
    {
      id: 2,
      title: "Share Your Link",
      description: "Share your personalized link on social media, email, or your website to reach your audience.",
      icon: <Share2 size={24} className="text-secondary" />,
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      details: "Effective sharing is the key to maximizing your earnings. You can share your link through social media posts, email newsletters, your website or blog, or even in person. We provide ready-made promotional materials to help you communicate the value of donating through your link.",
      features: ["Pre-designed promotional materials", "Social media integration", "Email templates", "Shareable QR codes"]
    },
    {
      id: 3,
      title: "Track & Earn",
      description: "Watch your earnings grow in real-time as people donate through your referral link.",
      icon: <BarChart size={24} className="text-secondary" />,
      image: "https://images.pexels.com/photos/7681661/pexels-photo-7681661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      details: "Your dashboard provides detailed analytics on all your referrals. You can track click-through rates, conversion rates, donation amounts, and your commission earnings in real-time. We process payments monthly for all earnings that meet the minimum threshold of $50.",
      features: ["Real-time tracking dashboard", "Detailed performance metrics", "Monthly payments", "Multiple payout options"]
    }
  ];

  const faqs = [
    {
      question: "How much can I earn with the Partnering Program?",
      answer: "Partners earn a competitive 15% commission on all donations made through their referral links. There's no cap on your earnings – the more people you refer, the more you can earn."
    },
    {
      question: "When and how do I get paid?",
      answer: "Payments are processed monthly for all earnings that meet the minimum threshold of $50. You can choose to receive payment via bank transfer, PayPal, or donate your earnings back to charity."
    },
    {
      question: "Is there a cost to join the program?",
      answer: "No, joining our Partnering Program is completely free. There are no hidden fees or charges – we only succeed when you do."
    },
    {
      question: "How do I track my referrals and earnings?",
      answer: "Your partner dashboard provides real-time analytics on clicks, conversions, and earnings. You can track performance over custom date ranges and export reports as needed."
    },
    {
      question: "Can I promote the program on social media?",
      answer: "Absolutely! Social media is one of the most effective channels for sharing your referral link. We provide social media-friendly assets and suggested copy to help you create engaging posts."
    },
    {
      question: "Are there any restrictions on how I can promote my link?",
      answer: "While we encourage creativity in your promotional efforts, we do have guidelines to ensure ethical marketing. These include being transparent about the affiliate relationship, avoiding spam tactics, and not making unrealistic claims about donations or impact."
    }
  ];

  // const testimonials = [
  //   {
  //     name: "Sarah Johnson",
  //     role: "Social Media Influencer",
  //     quote: "I've been part of many affiliate programs, but this one stands out for its mission and the way they support partners. I've been able to generate consistent income while supporting causes I care about.",
  //     image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   },
  //   {
  //     name: "Michael Chen",
  //     role: "Nonprofit Director",
  //     quote: "The partnering program has been a game-changer for our organization. We've been able to tap into new donor networks and significantly increase our funding through partner referrals.",
  //     image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   },
  //   {
  //     name: "Aisha Williams",
  //     role: "Community Organizer",
  //     quote: "The detailed analytics and user-friendly dashboard make it easy to track my impact. I've been able to direct over $10,000 in donations to important causes while earning a nice side income.",
  //     image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  //   }
  // ];

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-h1 font-bold mb-6">How Our Partnering Program Works</h1>
              <p className="text-h4 mb-8 opacity-90">
                Join a growing community of partners who are earning passive income while making a positive impact on meaningful causes.
              </p>
              <Link 
                to="/signup" 
                className="bg-secondary hover:bg-white hover:text-primary text-white font-bold py-2 px-3 rounded-lg inline-flex items-center gap-2 transition-all shadow-lg"
              >
                Get Started For Free <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Steps Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                The Process
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">Start Earning in 3 Easy Steps</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our Partnership program is designed to be simple and rewarding. Here's how you can get started.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-4">
              {/* Steps Navigation */}
              <div className="md:w-1/3">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                  {steps.map(step => (
                    <button 
                      key={step.id}
                      className={`flex items-center w-full text-left p-4 mb-2 rounded-lg transition-all ${
                        activeStep === step.id 
                          ? 'bg-white shadow-md text-primary' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveStep(step.id)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        activeStep === step.id ? 'bg-secondary text-white' : 'bg-gray-200 text-secondary'
                      }`}>
                        {step.id}
                      </div>
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-sm text-gray-500 hidden md:block">{step.description.substring(0, 30)}...</div>
                      </div>
                      <ChevronRight size={16} className="ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Step Content */}
              <div className="md:w-2/3">
                {steps.map(step => (
                  activeStep === step.id && (
                    <div key={step.id} className="bg-white rounded-xl overflow-hidden shadow-lg animate-fadeIn">
                      <div className="relative h-64 md:h-80 bg-secondary">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-6 text-white">
                            <h3 className="text-2xl font-bold flex items-center gap-2 mb-2">
                              {step.icon} {step.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-lg text-gray-700 mb-4">{step.description}</p>
                        <div className="mb-6">
                          <h4 className="font-bold text-primary mb-2">What to Expect:</h4>
                          <p className="text-gray-700">{step.details}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-bold text-primary mb-2">Key Features:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {step.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check size={16} className="text-secondary mt-1 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {step.id === 1 && (
                          <div className="bg-gray-100 p-4 rounded-lg mt-4">
                            <div className="text-sm font-mono mb-2 text-gray-500">Your unique referral link will look like this:</div>
                            <div className="flex items-center">
                              <code className="bg-white text-secondary px-3 py-2 rounded border border-gray-300 flex-grow truncate">
                                https://yourplatform.com/donate?ref=YOUR_USERNAME
                              </code>
                              <button className="ml-2 bg-secondary text-white px-3 py-2 rounded font-medium text-sm">
                                Copy
                              </button>
                            </div>
                          </div>
                        )}
                        {step.id === 2 && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                              <div className="font-medium mb-1">Social Media</div>
                              <div className="text-sm text-gray-600">Share with your followers</div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                              <div className="font-medium mb-1">Email</div>
                              <div className="text-sm text-gray-600">Send to your contacts</div>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg text-center">
                              <div className="font-medium mb-1">Website</div>
                              <div className="text-sm text-gray-600">Embed on your site</div>
                            </div>
                          </div>
                        )}
                        {step.id === 3 && (
                          <div className="mt-4">
                            <h4 className="font-bold text-primary mb-2">Earnings Example:</h4>
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <p className="text-sm text-gray-700 mb-2">If you refer 10 people who each donate $100:</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="font-medium">Total Donations:</div>
                                <div>$1,000</div>
                                <div className="font-medium">Your Commission (15%):</div>
                                <div className="text-secondary font-bold">$150</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                Success Stories
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">Hear From Our Partners</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join these successful partners who are making a difference while earning rewards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-bold text-primary">{testimonial.name}</div>
                      <div className="text-secondary text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                Common Questions
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about our Partnering Program? Find answers to common questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-h4 font-bold mb-3 text-primary">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-50 text-primary">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 font-bold mb-6">Ready to Start Your Partner Journey?</h2>
              <p className="text-xl mb-8">
                Join our Partnering Program today and start earning while supporting causes you care about.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup" 
                  className="bg-secondary hover:bg-white hover:text-primary text-white font-bold py-2 px-3 rounded-lg transition-all shadow-lg"
                >
                  Sign Up Now
                </Link>
                <Link 
                  to="/login" 
                  className="bg-primary text-white hover:bg-white hover:text-primary font-bold py-2 px-3 rounded-lg transition-all"
                >
                  Partner Login
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

export default HowItWorksPage;