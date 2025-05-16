import React, { useState } from 'react';
import { Link, ChevronRight, Share2, BarChart } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Create Your referral Link",
      description: "Sign up for free and instantly generate your unique referral link from your dashboard.",
      icon: <Link size={24} className="text-secondary" />,
      image: "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "Share Your Link",
      description: "Share your personalized link on social media, email, or your website to reach your audience.",
      icon: <Share2 size={24} className="text-secondary" />,
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Track & Earn",
      description: "Watch your earnings grow in real-time as people donate through your referral link.",
      icon: <BarChart size={24} className="text-secondary" />,
      image: "https://images.pexels.com/photos/7681661/pexels-photo-7681661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
            Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Start Earning in 3 Easy Steps</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                      ? 'bg-white text-primary' 
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
                    {step.id === 1 && (
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-sm font-mono mb-2 text-gray-500">Your unique referral link:</div>
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
                      <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                          </svg>
                          Twitter
                        </button>
                        <button className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                          </svg>
                          Facebook
                        </button>
                        <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                          </svg>
                          Instagram
                        </button>
                        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                          </svg>
                          WhatsApp
                        </button>
                      </div>
                    )}
                    {step.id === 3 && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-800 font-semibold mb-2">Live Earnings Example:</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded p-3 text-center border border-blue-100">
                            <div className="text-gray-500 text-sm">Total Referrals</div>
                            <div className="text-2xl font-bold text-blue-800">128</div>
                          </div>
                          <div className="bg-white rounded p-3 text-center border border-blue-100">
                            <div className="text-gray-500 text-sm">Total Earned</div>
                            <div className="text-2xl font-bold text-green-600">$950</div>
                          </div>
                          <div className="bg-white rounded p-3 text-center border border-blue-100">
                            <div className="text-gray-500 text-sm">Conversion Rate</div>
                            <div className="text-2xl font-bold text-blue-800">8.2%</div>
                          </div>
                          <div className="bg-white rounded p-3 text-center border border-blue-100">
                            <div className="text-gray-500 text-sm">Available to Withdraw</div>
                            <div className="text-2xl font-bold text-green-600">$725</div>
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
  );
};

export default HowItWorks;