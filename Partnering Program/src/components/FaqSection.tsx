import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const faqs: FaqItem[] = [
    {
      question: "How often can I withdraw earnings?",
      answer: "You can withdraw your earnings instantly, anytime your balance exceeds $25. We support multiple payment methods including PayPal, Stripe, and bank transfers for your convenience."
    },
    {
      question: "Is there a cost to join?",
      answer: "No, joining our Partnership program is completely free! There are no hidden fees or charges. We believe in providing value first and only earn when you do."
    },
    {
      question: "How do I track my referrals?",
      answer: "Our easy-to-use dashboard provides real-time tracking of all your referrals, conversions, and earnings. You'll see exactly where your traffic is coming from and which campaigns are performing best."
    },
    {
      question: "What's the commission rate?",
      answer: "We offer a generous 5% commission on all donations made through your referral link. This rate applies to both one-time and recurring donations, meaning you can build a sustainable income stream."
    },
    {
      question: "How long are referrals tracked?",
      answer: "We use a 90-day cookie window, which means you'll earn commissions on any donations made within 90 days of someone clicking your link, even if they don't donate immediately."
    },
    {
      question: "Can I promote multiple causes?",
      answer: "Absolutely! You can create unique referral links for different causes or campaigns, allowing you to track which ones resonate most with your audience and optimize your promotion strategy."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 text-sm font-semibold bg-primary/10 text-secondary rounded-full mb-4">
            FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We've got answers. If you don't see what you're looking for, reach out to our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'border-primary/10 bg-primary/5' : 'border-gray-200'
                }`}
              >
                <button 
                  className="flex justify-between items-center w-full p-5 text-left font-medium"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg">{faq.question}</span>
                  {openIndex === index ? 
                    <Minus size={20} className="text-blue-600" /> : 
                    <Plus size={20} className="text-gray-400" />
                  }
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-5 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <button className="bg-secondary hover:bg-secondary/80 text-white font-medium py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;