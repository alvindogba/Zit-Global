import React from 'react';
import { Star, Award, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface PartnerCardProps {
  name: string;
  role: string;
  image: string;
  description: string;
  achievements?: string[];
}

const PartnerCard: React.FC<PartnerCardProps> = ({ name, role, image, description, achievements }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mr-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1 text-primary">{name}</h3>
          <p className="text-secondary">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      {achievements && (
        <div className="mt-4">
          <div className="font-medium text-primary mb-2">Achievements:</div>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <Star size={16} className="text-secondary mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-700">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PartnersPage: React.FC = () => {
  const featuredPartners = [
    {
      name: "Sarah Johnson",
      role: "Nonprofit Leader",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Sarah has directed over $50,000 in donations to education initiatives through her dedicated network of supporters.",
      achievements: [
        "Top Partner Award 2023",
        "Referred over 200 donors",
        "Featured in Partner Spotlight"
      ]
    },
    {
      name: "Michael Chen",
      role: "Content Creator",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Michael leverages his YouTube channel to drive awareness and support for environmental conservation projects.",
      achievements: [
        "Rising Star Award 2024",
        "Generated $35,000 in donations",
        "Mentors new partners"
      ]
    },
    {
      name: "Aisha Patel",
      role: "Community Organizer",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Aisha mobilizes local communities to support healthcare initiatives in underserved regions.",
      achievements: [
        "Impact Champion 2023",
        "Organized 5 fundraising events",
        "Doubled donor retention rate"
      ]
    }
  ];

  const successStories = [
    {
      name: "Tech For Good",
      role: "Nonprofit Organization",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "By leveraging our Partner Program, Tech For Good increased their monthly donations by 75% and expanded their education initiatives to 5 new regions."
    },
    {
      name: "Green Planet Initiative",
      role: "Environmental Coalition",
      image: "https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "The unique referral tracking helped Green Planet Initiative identify their most effective communication channels, resulting in a 40% increase in new recurring donors."
    },
    {
      name: "James Wilson",
      role: "Financial Advisor",
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "James integrated our Partner Program into his client offerings, enabling his clients to support charitable causes while he earned over $20,000 in commissions."
    }
  ];

  const testimonials = [
    {
      quote: "The Partner Program has transformed how we approach fundraising. The referral system makes it easy to track which outreach efforts are most effective.",
      name: "Elena Rodriguez",
      role: "Director of Development"
    },
    {
      quote: "I was skeptical at first, but the transparent commission structure and real-time tracking won me over. I've now referred over 150 donors to causes I believe in.",
      name: "David Okafor",
      role: "Social Media Influencer"
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
              <h1 className="text-h1 font-bold mb-6">Our Partner Community</h1>
              <p className="text-h4 mb-8 opacity-90">
                Meet the incredible people and organizations making a difference through our Partnering Program
              </p>
            </div>
          </div>
        </section>

        {/* Featured Partners */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                Featured Partners
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">Meet Our Top Performers</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These partners have demonstrated exceptional results and impact through their dedication to causes they care about.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPartners.map((partner, index) => (
                <PartnerCard 
                  key={index}
                  name={partner.name}
                  role={partner.role}
                  image={partner.image}
                  description={partner.description}
                  achievements={partner.achievements}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-secondary rounded-full mb-4">
                Success Stories
              </div>
              <h2 className="text-h2 font-bold mb-6 text-primary">Partner Impact</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover how our partners are using the program to drive meaningful change while earning rewards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <PartnerCard 
                  key={index}
                  name={story.name}
                  role={story.role}
                  image={story.image}
                  description={story.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Partner Benefits Highlight */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                    <Award size={48} className="text-secondary mb-4" />
                    <h2 className="text-h2 font-bold mb-4 text-primary">Partner Program Highlights</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <Star size={16} className="text-secondary" />
                        </div>
                        <p className="text-gray-700">15% commission on all donations</p>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <Star size={16} className="text-secondary" />
                        </div>
                        <p className="text-gray-700">Real-time analytics dashboard</p>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <Star size={16} className="text-secondary" />
                        </div>
                        <p className="text-gray-700">90-day cookie tracking window</p>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                          <Star size={16} className="text-secondary" />
                        </div>
                        <p className="text-gray-700">Marketing materials & support</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link 
                        to="/benefits" 
                        className="text-secondary font-medium inline-flex items-center hover:underline"
                      >
                        See All Partner Benefits <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="rounded-xl overflow-hidden h-full">
                      <img 
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Partner Community" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 text-sm font-semibold bg-white/20 text-white rounded-full mb-4">
                Testimonials
              </div>
              <h2 className="text-h2 font-bold mb-6">Partner Experiences</h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Hear directly from our partners about their experience with our program.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur p-6 rounded-xl">
                  <div className="text-3xl text-secondary mb-4">"</div>
                  <p className="text-white/90 italic mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join Banner */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl p-8 md:p-12 text-center shadow-md">
              <div className="inline-flex items-center justify-center rounded-full bg-blue-100 w-16 h-16 mb-6">
                <Users size={32} className="text-secondary" />
              </div>
              <h2 className="text-h2 font-bold mb-4 text-primary">Join Our Partner Community</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Become part of our growing network of partners who are earning while making a positive impact on causes they care about.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup" 
                  className="bg-secondary hover:bg-white hover:text-primary text-white font-bold py-2 px-3 rounded-lg transition-all shadow-lg"
                >
                  Apply Now
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="bg-primary text-white hover:bg-white hover:text-primary font-bold py-2 px-3 rounded-lg transition-all"
                >
                  How It Works
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

export default PartnersPage;
