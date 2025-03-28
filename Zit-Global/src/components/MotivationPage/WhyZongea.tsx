import image from '../../asset/images/Abel B. Winn.jpg';
import { FaCheck } from 'react-icons/fa6';

export default function TeachSomeone() {
  const checkMark = <FaCheck size={18}/>
  // Array for repeated sections
  const teachingPoints = [
    {
      check: checkMark,
      title: "Breaking Down Barriers",
      description: "We established ZIT with a transformative vision: to break down barriers and open doors for all Liberians through high-quality, accessible, and free education."
    },
    {
      check: checkMark,
      title: "Empowering Through Education",
      description: "Our unique approach—<span class='text-bold text-primary'>Teach, Tutor, Mentor (TTM)</span>— is designed to support students at every stage of their learning journey, empowering them to thrive in a world that is increasingly driven by technology and innovation."
    },
    {
      check: checkMark,
      title: "Building a Prosperous Future",
      description: "We established ZIT with a transformative vision: to break down barriers and open doors for all Liberians through high-quality, accessible, and free education."
    }
  ];

  return (
    <section className="flex flex-col md:flex-row md:gap-8 items-center justify-between px-4 md:px-28 pt-10 md:pt-20 pb-8 md:pb-20 bg-white">
    {/* Left Side */}
    <div className="w-full md:w-2/5 md:text-left">
      <h2 className="font-noto text-xl md:text-2xl font-bold text-primary md:w-[130%] w-[90%] md:my-2 mb-4">
        Why Zongea Institute of Technology Exists & Why Education Is Free for All Liberians
      </h2>
  
      {/* Loop through teachingPoints array */}
      {teachingPoints.map((point, index) => (
        <div key={index} className="flex items-start gap-4 pt-3 w-full">
          {/* Perfect Circle Container */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-secondary font-bold">
              <span className="flex items-center justify-center w-full h-full">
                {point.check}
              </span>
            </div>
          </div>
          
          {/* Title & Description */}
          <div>
            <h3 className="font-noto font-semibold">{point.title}</h3>
            <p className="font-roboto text-sm text-dparacolor mt-3" dangerouslySetInnerHTML={{ __html: point.description }} />
          </div>
        </div>
      ))}
    </div>
  
    {/* Right Side - Image */}
    <div className="hidden md:flex w-full md:w-1/2 justify-center md:justify-end mt-10 md:mt-0">
      <div className="relative w-64 h-80 md:w-96 md:h-96 flex items-center justify-center">
        <img
          src={image} 
          alt="Mentor smiling"
          className="md:w-[94%] md:h-[110%] w-full object-cover relative top-5 left-3"
        />
      </div>
    </div>
  </section>
  );
}
