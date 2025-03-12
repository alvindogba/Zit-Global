import { ArrowRight, Heart, HandHeart } from 'lucide-react';
import MotivationBgImg from '../../asset/images/Graduation-Bg-Img.jpg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const donatorhighlightbg = "https://i.pinimg.com/736x/15/b1/c7/15b1c797c9787d575706f17de67600d0.jpg";

export default function BeADonorPage() {

  const reasonWhyDonate = [
    {
      title: "Deliver a Big Impact", 
      description: "When you choose to donate to Zongea Institute of Technology, your gift creates a measurable and lasting impact. Over 80% of our graduates are employed and/or enrolled in postsecondary education just four months after completing the program. Those employed begin their careers with an impressive average starting salary of $52,000 a year. These results prove one thing: our program works.",
     
    },
    {
      title: "Make Communities Stronger",
      description: "Your support helps build stronger, more resilient communities. Zongea Institute of Technology empowers young adults to achieve the professional and academic success they need to secure better jobs, support their families, and give back to their communities. By choosing to donate to Zongea Institute of Technology, you’re putting your values into action by backing a national nonprofit that drives real change.",
   
    },
    {
      title: "Open Doors for Deserving Young People",
      description: "Millions of young adults remain disconnected from the economic mainstream despite their drive and motivation to succeed. Your donation bridges this gap by helping to end the Opportunity Divide, providing real access to career and educational opportunities for talented young people. Every time you donate to Zongea Institute of Technology, you’re helping to build a better future for all.",
    },
    {
      title: "Enjoy a Powerful Way to Give Back",
      description: "Every dollar you contribute has a direct and transformative impact. Your generosity gives motivated young adults access to technical and professional skills that prepare them for successful careers. When you donate to Zongea Institute of Technology, you’re not just giving back – you’re paving the way for the next generation to reach their full potential.",      
    },
  ];

  const donatorHighlight = [
    {
      image: donatorhighlightbg,
      description: "Darnell Barnes, Zongea Institute alumnus and Opportunity Advocate",
      statement: "“The resources I received from Zongea Institute of Technology were instrumental in shaping my career. As I continue to grow, I remain committed to supporting their mission of creating stronger communities and giving back.”",
    },
    {
      image: donatorhighlightbg,
      description: "Chris and Lorraine Wilson, Wilson Sheehan Foundation",
      statement: "“Zongea Institute of Technology has shown us the incredible potential of driven young adults eager to succeed. We’ve been consistently impressed by their results; even with high expectations, Zongea has surpassed them in every way.”",
    },
    {
      image: donatorhighlightbg,
      description: "Sarah Keh, Vice President of Corporate Social Responsibility, Prudential Financial",
      statement: "“Today, millions of young people in the United States are disconnected from education and the workforce. Zongea Institute of Technology equips these individuals with the critical skills needed to thrive in high-demand careers and secure meaningful employment.”",
    },
  ];

  const supportersaying = [
    {
      saying: "Transform lives through education",
      statement: '“Zongea Institute of Technology is more than just an institution—it’s a life-changing opportunity for so many young people. Supporting it means contributing to a brighter future for all.”',
      name: "Jane Smith",
      location: "Supporter, Monrovia"
    },
    {
      saying: "Empower communities",
      statement: '“I stand with Zongea Institute of Technology because it empowers communities by equipping individuals with the skills they need to thrive in today’s world.”',
      name: "Michael Johnson",
      location: "Supporter, Buchanan"
    },
    {
      saying: "Inspire growth and innovation",
      statement: '“Supporting Zongea Institute of Technology means inspiring the next generation of innovators who will shape the future.”',
      name: "Emma Brown",
      location: "Supporter, Ganta"
    },
    {
      saying: "Be a part of meaningful change",
      statement: '“It’s incredible to see the direct impact Zongea Institute has on its students. Every contribution helps create lasting, meaningful change.”',
      name: "Robert Wilson",
      location: "Supporter, Kakata"
    },
    {
      saying: "Champion equal opportunities",
      statement: '“Zongea Institute of Technology is breaking barriers by providing equal opportunities for young people to succeed. It’s a mission worth supporting.”',
      name: "Sophia Davis",
      location: "Supporter, Harper"
    }
  ];
  

// State for the current slide
const [currentSlide, setCurrentSlide] = useState(0);

// Length of the testimonials array
const totalSlides = supportersaying.length;

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
    Unlock potential, create possibilities.
    </h1>
    <p className="text-md text-gray-200 max-w-2xl mb-8">
      Zongea Institute of Technology equips emerging talent with the skills needed for in-demand careers, revolutionizing the future of work. Your support makes it all happen.
    </p>
    <Link
    to="/donate"
    className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
    >
    Donate Now<ArrowRight className="ml-2" size={16} />
    </Link>
  </div>
  </div>

  {/* Why donate section */}
  <section className="py-16 px-4 bg-white">
    <div className="container mx-auto px-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-primary">
        Why donate to Zongea Institute of Technology?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
      {reasonWhyDonate.map((whyDonate, index) => (
          <div key={index} className="flex items-start space-x-4 pl-3 border-l-2 border-secondary-yellow">
          <div>
            <h3 className="text-md font-bold mb-2 text-primary">{whyDonate.title}</h3>
            <p className="text-secondary-black text-sm">{whyDonate.description}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  </section>

  {/* Donor highlight Section */}
  <section className="py-16 px-4 bg-gray-100">
    <div className="container mx-auto px-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-primary">
        Donor Highlights
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
      {donatorHighlight.map((highlight, index) => (
          <div key={index} className="flex flex-col justify-center items-center space-x-4 gap-2">
            <img src={highlight.image} alt={highlight.description} className="w-40 h-40 rounded-full object-cover" />
          <div>
            <h3 className="text-md font-bold mb-2 text-primary">{highlight.description}</h3>
            <p className="text-secondary-black text-sm">{highlight.statement}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  </section> 

  {/* What Supporter Section */}
  <section className="bg-white py-10">
    <div className="text-left  mb-10">
      <h2 className="text-xl ml-[24rem] md:text-2xl font-bold text-primary">What Supporters Say</h2>
    </div>
    <div className="relative max-w-3xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {supportersaying.map((testimonial, index) => (
          <div
            key={index}
            className="min-w-full bg-primary text-secondary-light p-8 rounded-lg shadow-lg"
          >
            <h4 className="text-xl font-semibold mb-4">{testimonial.saying}</h4>
            <p className="mb-6 text-sm">{testimonial.statement}</p>
            <h4 className="font-semibold text-md">{testimonial.name}</h4>
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
        {supportersaying.map((_, index) => (
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

  <section 
    className="py-16 px-4 relative"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <div className="container mx-auto text-center text-white">
      <div className="mb-8 w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center">
        <HandHeart className="w-10 h-10 text-secondary-yellow" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Help us close the Opportunity Divide. </h2>
      <Link
      to="/donate"
      className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
      >
      Donate  <Heart className="ml-2" size={16} />
      </Link>
    </div>
  </section>

</div>

)
}