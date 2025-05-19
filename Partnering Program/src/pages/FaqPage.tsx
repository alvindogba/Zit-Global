import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqs: FaqItem[] = [
    // Program Basics
    {
      question: "What is the Partnering Program?",
      answer: "Our Partnering Program is a referral system that allows you to earn commissions by referring donors to our platform. You receive 15% of any donation made through your unique referral link.",
      category: "basics"
    },
    {
      question: "How do I join the program?",
      answer: "Joining is simple and free. Just sign up through our website, complete your profile, and you'll receive your unique referral link instantly. There's no application review or approval wait time.",
      category: "basics"
    },
    {
      question: "Is there a cost to join?",
      answer: "No, joining our Partnership program is completely free! There are no hidden fees or charges. We believe in providing value first and only earn when you do.",
      category: "basics"
    },
    
    // Earnings & Payments
    {
      question: "How often can I withdraw earnings?",
      answer: "You can withdraw your earnings instantly, anytime your balance exceeds $50. We support multiple payment methods including PayPal, Stripe, and bank transfers for your convenience.",
      category: "earnings"
    },
    {
      question: "What's the commission rate?",
      answer: "We offer a generous 15% commission on all donations made through your referral link. This rate applies to both one-time and recurring donations, meaning you can build a sustainable income stream.",
      category: "earnings"
    },
    {
      question: "Are there performance bonuses?",
      answer: "Yes! Partners who consistently drive high volumes of donations can qualify for increased commission rates (up to 20%) and special performance bonuses. Details are available in your partner dashboard.",
      category: "earnings"
    },
    {
      question: "What payment methods do you support?",
      answer: "We offer multiple payout options including direct bank transfer, PayPal, and cryptocurrency transfers (Bitcoin, Ethereum). You can select your preferred method in your account settings.",
      category: "earnings"
    },
    
    // Technical Questions
    {
      question: "How do I track my referrals?",
      answer: "Our easy-to-use dashboard provides real-time tracking of all your referrals, conversions, and earnings. You'll see exactly where your traffic is coming from and which campaigns are performing best.",
      category: "technical"
    },
    {
      question: "How long are referrals tracked?",
      answer: "We use a 90-day cookie window, which means you'll earn commissions on any donations made within 90 days of someone clicking your link, even if they don't donate immediately.",
      category: "technical"
    },
    {
      question: "Can I use my referral link on multiple websites?",
      answer: "Absolutely! You can use your referral link across all your channels - websites, social media, email campaigns, or anywhere else you have an audience. Each link is tracked back to your account.",
      category: "technical"
    },
    {
      question: "Do you provide marketing materials?",
      answer: "Yes, we offer a variety of marketing materials including banner ads, email templates, social media posts, and more. All are available in your partner dashboard and can be customized with your referral link.",
      category: "technical"
    },
    
    // Program Policies
    {
      question: "Can I promote multiple causes?",
      answer: "Absolutely! You can create unique referral links for different causes or campaigns, allowing you to track which ones resonate most with your audience and optimize your promotion strategy.",
      category: "policies"
    },
    {
      question: "Are there any restrictions on promotion?",
      answer: "While we encourage creativity, we do have guidelines to ensure ethical marketing. These include transparently disclosing the affiliate relationship, avoiding spam tactics, and not making unrealistic claims about donations or impact.",
      category: "policies"
    },
    {
      question: "What happens if someone asks for a refund?",
      answer: "If a donor requests a refund within 30 days of their donation, the associated commission will be deducted from your balance. This policy helps ensure the integrity of our donation system.",
      category: "policies"
    },
    {
      question: "Can I participate if I'm outside the United States?",
      answer: "Yes! Our program is open to international partners. However, certain payment methods may have restrictions based on your country. Please check the payment options available in your region.",
      category: "policies"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'basics', name: 'Program Basics' },
    { id: 'earnings', name: 'Earnings & Payments' },
    { id: 'technical', name: 'Technical Questions' },
    { id: 'policies', name: 'Program Policies' }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-h1 font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-h4 mb-8 opacity-90">
                Everything you need to know about our Partnering Program
              </p>
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for a question..."
                  className="w-full py-3 px-4 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <Search size={20} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories and Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full transition-all ${activeCategory === category.id
                    ? 'bg-secondary text-white font-medium'
                    : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="max-w-3xl mx-auto">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">No questions found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index
                        ? 'border-secondary bg-secondary/5 shadow-md'
                        : 'border-gray-200 bg-white'}`}
                    >
                      <button
                        className="flex justify-between items-center w-full p-5 text-left font-medium"
                        onClick={() => toggleFaq(index)}
                      >
                        <span className="text-lg">{faq.question}</span>
                        {openIndex === index ? (
                          <Minus size={20} className="text-secondary flex-shrink-0" />
                        ) : (
                          <Plus size={20} className="text-primary flex-shrink-0" />
                        )}
                      </button>
                      {openIndex === index && (
                        <div className="px-5 pb-5 pt-0">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-3xl mx-auto text-center bg-gray-50 p-8 md:p-12 rounded-xl shadow-md">
              <h2 className="text-h3 font-bold mb-4 text-primary">Still Have Questions?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our support team is here to help. Reach out anytime and we'll get back to you as quickly as possible.
              </p>
              <Link
                to="/contact"
                className="bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-all"
              >
                Contact Support <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h2 font-bold mb-6 text-primary">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our Partnering Program today and start earning commissions while supporting causes you care about.
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

export default FaqPage;