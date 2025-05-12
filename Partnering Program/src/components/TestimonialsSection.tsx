import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "I've earned $2,400 this month sharing donations for climate initiatives. It's effortless!",
      name: "Alex M.",
      role: "Environmental Blogger",
      avatar: "https://images.pexels.com/photos/8353841/pexels-photo-8353841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      quote: "The dashboard makes tracking referrals super intuitive. Payouts are always on time.",
      name: "Sarah T.",
      role: "Nonprofit Advocate",
      avatar: "https://images.pexels.com/photos/8353750/pexels-photo-8353750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      quote: "I love that I can support causes I care about while earning a side income. Win-win!",
      name: "Mark J.",
      role: "Social Media Influencer",
      avatar: "https://images.pexels.com/photos/8353826/pexels-photo-8353826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">What Our Partners Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful partners who are making an impact and earning rewards.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full">
            <button 
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md text-blue-600 hover:bg-blue-50 transition-all -ml-3 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md text-blue-600 hover:bg-blue-50 transition-all -mr-3 z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-blue-100 flex-shrink-0">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xl text-gray-700 mb-4">"{testimonial.quote}"</p>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-16 gap-8 flex-wrap">
          <div className="bg-white px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-blue-600" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.79 5.13L9.25 7.25h-1.5V5.542a.67.67 0 0 1 1.04-.41z"/>
              <path d="M7 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-3.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1zm3.5 3a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m5 0a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5m-10 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5m10 3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5m-10 0a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5" />
            </svg>
            <span className="font-medium">10,000+ Partners Worldwide</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-blue-600" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <span className="font-medium">Secure Payouts via Stripe/PayPal</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-md flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-blue-600" viewBox="0 0 16 16">
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z"/>
              <path d="M15.608,15.432 L13.4,8.918 A0.587,0.587 0 0,0 12.863,8.529 L5.859,8.529 A0.587,0.587 0 0,0 5.322,8.918 L3.114,15.432 A0.586,0.586 0 0,0 3.7,16.188 L15.023,16.188 A0.586,0.586 0 0,0 15.608,15.432 Z"/>
              <path d="M14,5 L8.991,5 L8.991,0.599 A0.6,0.6 0 0,0 8.392,0 L7.608,0 A0.6,0.6 0 0,0 7.009,0.599 L7.009,5 L2,5 L2,6 L14,6 L14,5 Z"/>
            </svg>
            <span className="font-medium">24/7 Partner Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;