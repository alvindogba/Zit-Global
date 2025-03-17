import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from "../../common/AnimateOnScroll";
import heroImg1 from '../../../asset/images/herobg1.jpg'
import heroImg2 from '../../../asset/images/herobg2.jpg'
import heroImg3 from '../../../asset/images/herobg3.jpg'

const images = [
  heroImg1,
  heroImg2,
  heroImg3
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="h-[90vh] md:h-[80vh] flex items-end justify-start relative py-20 md:px-31"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.2), rgba(0, 0, 84, 0.3)), url(${images[currentIndex]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in',
      }}
    >
      {/* Content Box */}
      <AnimateOnScroll animation="slideUp">
        <div className="text-white px-4 w-full md:w-[50%] lg:w-[55%] bg-primary opacity-[75%] rounded-tr-lg rounded-tl-lg h-fit  md:ml-[8%] py-6 sm:py-6 md:py-0 md:mb-8">
          <AnimateOnScroll animation="fadeIn" delay={200}>
            <h1 className="text-base sm:text-lg md:text-lg font-semibold my-6 sm:my-5 sm:ml-6 md:ml-5 w-[85%]">
              Unlock Your Potential: Begin Your Journey with ZIT's Transformative Tech Training
            </h1>
          </AnimateOnScroll>
          <div className="w-full sm:ml-6 md:ml-5">
            <AnimateOnScroll animation="fadeIn" delay={400}>
              <p className="text-xs sm:text-sm mb-3 sm:mb-6 w-[90%] md:w-[75%]">
                Tech careers within reach. Whether you're in high school or have some college, we'll get you job-ready—fast. All it takes is your drive to succeed.
              </p>
            </AnimateOnScroll>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex sm:flex-row gap-2 justify-start sm:mx-16 md:ml-5 mt-3 sm:mt-5 md:mt-5">
            <AnimateOnScroll animation="slideLeft" delay={600}>
              <Link
                to="/courses"
                className="bg-transpirent text-base hover:bg-white hover:text-primary hover:font-bold text-white border hover:px-4 hover:py-2 px-3 sm:px-4 py-1 sm:py-2 rounded-md transition-all duration-300 inline-flex items-center justify-center group mb-2"
              >
                Explore Courses 
                <ArrowRight className="ml-1 md:ml-4 transform transition-transform group-hover:translate-x-1" size={12} />
              </Link>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideRight" delay={800}>
              <Link
                to="/admission"
                className="bg-white text-base hover:px-6 hover:font-bold hover:py-2 text-primary px-3 sm:px-2 py-1 sm:py-2 transition-all duration-300 rounded-md inline-flex items-center justify-center group"
              >
                Apply Now 
                <ArrowRight className="ml-1 md:ml-4 transform transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </AnimateOnScroll>

      {/* Vertical Indicators */}
      <AnimateOnScroll animation="fadeIn" delay={1000}>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${index === currentIndex ? 'bg-white scale-125' : 'bg-gray-500'}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
