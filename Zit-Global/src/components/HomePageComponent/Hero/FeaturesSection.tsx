import { useState } from "react";
import AnimateOnScroll from "../../common/AnimateOnScroll";
import image1 from "../../../asset/images/OT image .jpg";
import image2 from "../../../asset/images/WhatsApp Image 2024-11-23 at 19.24.55_c7b5e29d.jpg";
import image3 from "../../../asset/images/student_teaching.jpg"
interface CardProps {
  imgSrc: string;
  title: string;
  description: string;
  linkText: string;
  fullHeight?: boolean; // Optional prop
}

function FeaturesSection() {
  return (
    <div className="w-full h-auto bg-secondary px-0 py-32 md:px-28">
      <div className="container mx-auto">
        <AnimateOnScroll animation="slideDown">
          <h2 className="text-2xl font-bold text-primary mb-4 md:text-left">
            Study at ZIT
          </h2>
        </AnimateOnScroll>
        
        <AnimateOnScroll animation="fadeIn" delay={200}>
          <p className="text-gray-600 mb-8 md:max-w-3xl md:text-left">
            Unlock job-ready skills that open doors in today's tech landscape. No other
            program matches the depth and impact of our hands-on training in technology,
            design, and digital literacy — preparing you for success in the digital economy.
          </p>
        </AnimateOnScroll>

        <div className="w-full h-[60%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Full Height Student Image with Hover Card */}
          <AnimateOnScroll animation="slideUp" delay={400}>
            <div className="relative w-full">
              <HoverCard
                imgSrc={image1}
                title="Hands-On Learning"
                description="Gain practical experience through interactive, project-based learning that prepares you for real-world challenges."
                linkText="Explore courses  →"
                fullHeight
              />
            </div>
          </AnimateOnScroll>

          {/* Personalized Support */}
          <AnimateOnScroll animation="slideUp" delay={600}>
            <FeatureCard
              imgSrc={image2}
              title="Personalized Support"
              description="We provide tailored support to ensure your success. From one-on-one tutoring sessions to career guidance, we're here to solve any challenges you face, even the most complex topics."
              linkText="Learn More About ZIT →"
            />
          </AnimateOnScroll>

          {/* Career-Ready Skills */}
          <AnimateOnScroll animation="slideUp" delay={800}>
            <FeatureCard
              imgSrc={image3}
              title="Career-Ready Skills"
              description="Program curricula is designed to align with today's top employers' demand. You'll learn practical, hands-on skills that make you job-ready."
              linkText="Start Your Journey →"
              
            />
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}

// Reusable Hover Card Component
function HoverCard({ imgSrc, title, description, linkText, fullHeight }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-transparent ${fullHeight ? "h-full" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="transition-all duration-500 hover:scale-105 cursor-pointer">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover rounded-lg" />
      </div>

      {/* Custom Hover Card */}
      <div
        className={`absolute w-full h-full top-0 bg-primary bg-opacity-60 text-white rounded-lg shadow-lg p-6 transition-all duration-300 transform flex flex-col justify-center items-center text-center space-y-4 
          ${isHovered ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"}`}
      >
        <h3 className="text-lg text-secondary-yellow font-semibold transform transition-transform duration-300">{title}</h3>
        <p className="text-sm transform transition-transform duration-300">{description}</p>
        <a href="#" className="text-white border px-4 py-2 rounded-md hover:text-primary hover:bg-white font-semibold transition-all duration-300 hover:scale-105">
          {linkText}
        </a>
      </div>
    </div>
  );
}

// Reusable Feature Card Component
function FeatureCard({ imgSrc, title, description, linkText }: CardProps) {
  return (
    <div className="flex flex-col md:p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
      <div className="overflow-hidden rounded-lg">
        <img 
          src={imgSrc} 
          alt={title} 
          className="w-full h-[200px] object-cover rounded-lg transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <h3 className="text-lg text-primary font-semibold mb-2 transition-colors duration-300 hover:text-secondary-yellow">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
      </div>
      <a 
        href="#" 
        className="text-black hover:text-primary relative group mt-4 inline-block w-fit"
      >
        <span className="font-semibold">{linkText}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </a>
    </div>
  );
}

export default FeaturesSection;
