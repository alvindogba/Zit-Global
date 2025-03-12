import { ArrowRight, Handshake } from 'lucide-react';
import MotivationBgImg from '../../asset/images/Graduation-Bg-Img.jpg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



export default function GuidingHandPage() {

  const volunteersaying = [
    {
      saying: "Empower the next generation of leaders",
      statement: '“Volunteering with Zongea Institute of Technology has been a life-changing experience. Seeing young adults gain confidence and skills through my support is deeply fulfilling.”',
      name: "Jane Smith",
      job: "Software Engineer, Tech Solutions Inc.",
      location: "Volunteer, Monrovia"
    },
    {
      saying: "Be a catalyst for change",
      statement: '“Zongea Institute of Technology provides an incredible opportunity to bridge the gap for young people. Volunteering here allows me to play a role in shaping a better future.”',
      name: "Michael Johnson",
      job: "HR Specialist, Global HR Partners",
      location: "Volunteer, Buchanan"
    },
    {
      saying: "Shape brighter futures",
      statement: '“It’s amazing to see how much potential these young adults have. Zongea Institute gives them the tools to succeed, and I’m proud to be a part of that mission.”',
      name: "Emma Brown",
      job: "Marketing Manager, Bright Ideas Ltd.",
      location: "Volunteer, Ganta"
    },
    {
      saying: "Invest in tomorrow's talent",
      statement: '“Volunteering at Zongea Institute has allowed me to give back in a meaningful way. Helping students grow and achieve their goals is truly rewarding.”',
      name: "Robert Wilson",
      job: "Project Manager, BuildSmart Inc.",
      location: "Volunteer, Kakata"
    },
    {
      saying: "Support dreams, change lives",
      statement: '“Zongea Institute of Technology creates real opportunities for young people. Being a volunteer here means contributing to something impactful and transformative.”',
      name: "Sophia Davis",
      job: "Business Analyst, Insight Analytics Co.",
      location: "Volunteer, Harper"
    }
  ];
  
// State for the current slide
const [currentSlide, setCurrentSlide] = useState(0);

// Length of the testimonials array
const totalSlides = volunteersaying.length;

// Go to the next slide
const nextSlide = () => {
  setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
};

// Go to the previous slide
const prevSlide = () => {
  setCurrentSlide((prevSlide) =>
    prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
  );
};

// Auto-slide (optional)
useEffect(() => {
  const interval = setInterval(() => {
    nextSlide();
  }, 5000); // Adjust the timing as needed
  return () => clearInterval(interval);
}, []);


return (
<div className="min-h-screen bg-white">
  {/* Hero Section */}
  <div className="relative bg-navy-600 text-white">
  <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
  >
    <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
  </div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <h1 className="text-2xl md:text-3xl font-bold mb-6">
     Create an impact. Empower others to unlock career opportunities.
    </h1>
    <p className="text-md text-gray-200 max-w-2xl mb-8">
      Share your skills, insights, and experiences to guide young professionals on their career paths and help bridge the gap in access to opportunities.
    </p>
    <Link
    to="/donate"
    className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
    >
      Volunteer Now<ArrowRight className="ml-2" size={16} />
    </Link>
  </div>
  </div>

  <section 
    className="py-16 px-4 relative bg-secondary-light">
    <div className="container mx-auto text-center text-secondary-black">

      <div className='mb-20 w-3/4 mx-auto'>
        <p className='mb-4 text-left text-sm'>At Zongea Institute of Technology, volunteers play an essential role in equipping young adults with the skills, experiences, and encouragement they need to achieve their full potential. By offering your expertise, you can help bridge the Opportunity Divide and contribute to building a more inclusive workforce.</p>
        <p className='mb-4 text-left text-sm'>Interested in joining an upcoming volunteer event? Visit our volunteer portal to discover and sign up for a range of opportunities across the Year Up United network. Events include resume workshops, mock interviews, networking sessions, and more—each tailored to support young adults in advancing their careers.</p>
        <p className='mb-4 text-left text-sm'>Start your journey by creating a volunteer account today. For additional details, feel free to contact us at <Link className='underline text-secondary-yellow hover:text-primary font-semibold' to="mailto:info@zongeatech.com">info@zongeatech.com</Link>. Together, we can make a meaningful impact and help close the Opportunity Divide.</p>
      </div>

      <div className="mb-8 w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center">
        <Handshake className="w-10 h-10 text-secondary-yellow" />
      </div>
      <h2 className="text-xl md:text-2xl font-bold mb-4 w-3/4 mx-auto">You can make a unforgettable difference that will forever impact the lives of young professionals.</h2>
      <Link
      to="/donate"
      className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
      >
        Volunteer Now<ArrowRight className="ml-2" size={16} />
      </Link>
    </div>
  </section>

  {/* What Volunteers Say Section */}
  <section className="bg-white py-20">
    <div className="relative max-w-3xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {volunteersaying.map((testimonial, index) => (
          <div
            key={index}
            className="min-w-full bg-primary text-secondary-light p-8 rounded-lg shadow-lg"
          >
            <h4 className="text-xl font-semibold mb-4">{testimonial.saying}</h4>
            <p className="mb-6 text-sm">{testimonial.statement}</p>
            <h4 className="font-semibold text-md">{testimonial.name}</h4>
            <p className="text-sm text-secondary-yellow">{testimonial.job}</p>
            <p className="text-sm text-secondary-yellow">{testimonial.location}</p>
          </div>
        ))}
      </div>
      {/* Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white text-primary text-2xl rounded-full w-8 h-8 flex items-center justify-center shadow"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white text-primary text-2xl rounded-full w-8 h-8 flex items-center justify-center shadow"
      >
        &#10095;
      </button>
      {/* Dots for Navigation */}
      <div className="flex justify-center mt-6">
        {volunteersaying.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${
              index === currentSlide ? 'bg-primary' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  </section>
</div>

)}
