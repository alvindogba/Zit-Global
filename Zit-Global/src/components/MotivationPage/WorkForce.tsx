import image from '../../asset/images/Abel B. Winn.jpg';
import { Link } from 'react-router-dom';

export default function WorkForce() {
  return (
    <section className="px-4 md:px-28 md:pt-20 pt-10 pb-4 md:pb-20 bg-white">
      {/* First Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 h-auto">
        <div className="w-full md:w-[45%] text-center md:text-left mb-8 md:mb-0">
          <h3 className="font-noto text-base font-medium text-primary">Join Our Mission</h3>
          <h2 className="font-noto text-xl md:text-2xl font-bold text-primary mt-2">
            Empower Liberia Through Tech Education
          </h2>
          <p className="font-roboto text-dparacolor my-5 leading-relaxed">
            At ZIT, we're revolutionizing tech education in Liberia by providing free, high-quality training 
            to aspiring professionals. Our hands-on curriculum bridges the gap between education and employment, 
            creating opportunities for Liberia's digital future.
          </p>
          <Link 
            to='/icc/teacher' 
            className="inline-block font-sans mt-6 px-3 py-2 text-base text-white bg-secondary rounded-md hover:bg-primary hover:font-semibold transition-all duration-300"
          >
            Teach With Us
          </Link>
        </div>

        {/* Image */}
        <div className="w-full md:w-[50%] flex justify-center">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <img
              src={image}
              alt="ZIT instructor teaching"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mt-16 md:mt-10">
        {/* Image */}
        <div className="w-full md:w-[50%] flex justify-center order-1 md:order-none">
          <div className="relative w-64 h-64 md:w-96 md:h-96 mr-32">
            <img
              src={image}
              alt="ZIT students learning"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
          </div>
        </div>

        <div className="w-full md:w-[45%] text-center md:text-left mb-8 md:mb-0 order-2 md:order-none">
          <h3 className="font-noto text-base font-medium text-primary">Support Our Vision</h3>
          <h2 className="font-noto text-xl md:text-2xl font-bold text-primary mt-2">
            Invest in Tech Talent
          </h2>
          <p className="font-roboto text-dparacolor my-5 leading-relaxed">
            Your support helps us maintain free education for all. Whether through donations, 
            equipment contributions, or partnerships, you can help build a skilled workforce that will 
            drive digital transformation and economic growth.
          </p>
          <Link 
            to='/donate' 
            className="inline-block font-sans mt-6 px-3 py-2 text-base text-white bg-secondary rounded-md hover:bg-primary hover:font-semibold transition-all duration-300"
          >
            Support Our Mission
          </Link>
        </div>
      </div>
    </section>
  );
}