import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from "../../common/AnimateOnScroll";
import heroImg1 from '../../../asset/images/herobg2.jpg';
import heroImg2 from '../../../asset/images/study-group-african-people.jpg'
import heroImg3 from '../../../asset/images/Technology - Digital.jpg'

const images = [
  heroImg1,
  heroImg2,
  heroImg3
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload images to avoid flickering on transition
  useEffect(() => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }, []);

  // Interval for changing the background image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="h-[90vh] md:h-[80vh] relative flex items-end md:px-31"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.1), rgba(0, 0, 84, 0.1)), url(${images[currentIndex]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in',
      }}
    >
      {/* Content Box */}
      <div className='md:ml-[8%] md:mb-8'>
        <div className="relative  text-white px-4 w-full md:w-[50%] lg:w-[55%] bg-primary/70 rounded-tr-lg rounded-tl-lg h-fit  py-6 sm:py-6 md:py-6">
          <div>
            <h1 className="text-base font-noto sm:text-lg md:text-2xl font-semibold my-6 sm:my-5 sm:ml-6 md:ml-5 w-[85%]">
            Unleash Your Potential: Take the First Step Toward a Thriving Tech Career
            </h1>
          </div>
          <div className="w-full sm:ml-6 md:ml-5">
            <div>
              <p className="text-xs font-roboto sm:text-sm mb-3 sm:mb-6 w-[90%] md:w-[75%]">
              Opportunities in tech are within your reach. No matter your background or experience level, we provide the training and support to help you succeed. The path to a brighter future starts now; are you ready to take it?
              </p>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="relative z-40 md:px-6 flex flex-col mt-4 md:flex-row md:gap-8 md:items-center">
            <Link
              to="/courses"
              className="bg-transparent font-sans z-50 text-base border border-white text-white hover:bg-white hover:text-primary hover:font-bold hover:px-4 hover:py-2 px-2 py-[7px] rounded-md transition-all duration-300 inline-flex items-center justify-center mb-2"
            >
              Explore Courses 
              <ArrowRight className="ml-1 md:ml-4 transform transition-transform" size={16} />
            </Link>

            <Link
              to="/admission"
              className="bg-secondary z-50 text-base font-sans text-white hover:bg-white hover:text-primary hover:font-bold hover:px-4 hover:py-2 px-3 py-2 rounded-md transition-all duration-300 inline-flex items-center justify-center mb-2"
            >
              Apply Now 
              <ArrowRight className="ml-1 md:ml-4 transform transition-transform" size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Vertical Indicators */}
      <AnimateOnScroll animation="fadeIn" delay={1000}>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full  transition-all  duration-300 cursor-pointer hover:scale-110 ${index === currentIndex ? 'bg-secondary scale-125' : 'bg-white'}`}
              onClick={() => setCurrentIndex(index)}
              role="button"
              aria-label={`Select image ${index + 1}`}
            ></div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
