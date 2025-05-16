import React from 'react';
import { Phone, Mail, ExternalLink } from 'lucide-react';

const Support: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Support</h1>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      

        <div className="bg-white rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Phone size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Call us Monday to Friday, 9am-5pm EST</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            +1 (555) 123-4567
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Mail size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Send Email
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              question: "How do I track my referrals?",
              answer: "You can track all your referrals in real-time through your dashboard. Each referral has a unique ID and you can see detailed analytics including conversion rates and earnings."
            },
            {
              question: "When do I get paid?",
              answer: "Payments are processed on the 1st and 15th of each month for all earnings that have cleared the 30-day holding period. You need a minimum balance of $50 to request a payout."
            },
            {
              question: "What's the commission structure?",
              answer: "We offer a base commission rate of 5% on all successful referrals. High-performing affiliates may qualify for increased rates up to 8% based on monthly performance."
            },
          ].map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Base */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold mb-6">Knowledge Base</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Getting Started Guide",
              description: "Learn the basics of our affiliate program",
              link: "#"
            },
            {
              title: "Marketing Resources",
              description: "Access promotional materials and guidelines",
              link: "#"
            },
            {
              title: "Commission Structure",
              description: "Understand how our payments work",
              link: "#"
            },
            {
              title: "Best Practices",
              description: "Tips to maximize your earnings",
              link: "#"
            },
          ].map((resource, index) => (
            <a 
              key={index}
              href={resource.link}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
              <ExternalLink size={20} className="text-gray-400 ml-auto" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;