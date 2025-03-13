import HeroBgImg from "../../../asset/images/Graduation-Bg-Img.jpg";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimateOnScroll from "../../common/AnimateOnScroll";

export default function CallToAction() {
  return (
    <section 
      className="py-16 px-4 md:px-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${HeroBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container w-full text-center text-white">
        <AnimateOnScroll animation="slideDown">
          <h2 className="text-base md:text-2xl md:w-[70%] md:mx-auto mb-4">
            Make a difference today—your donation, no matter the size, brings us one step closer to transforming lives and creating lasting impact!
          </h2>
        </AnimateOnScroll>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <AnimateOnScroll animation="slideLeft" delay={200}>
            <Link
              to="/donate"
              className="w-full md:w-fit border hover:bg-white hover:text-primary text-lg hover:px-6 hover:py-2 text-white px-3 sm:px-6 py-1 sm:py-2 transition-all duration-300 rounded-md inline-flex items-center justify-center group"
            >
              Be A Volunteer 
              <ArrowRight className="ml-2 transform transition-transform group-hover:translate-x-1" size={16} />
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slideRight" delay={400}>
            <Link
              to="/donate"
              className="w-full md:w-fit bg-white text-lg hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-all duration-300 rounded-md inline-flex items-center justify-center group"
            >
              Donate Today 
              <ArrowRight className="ml-4 transform transition-transform group-hover:translate-x-1" size={16} />
            </Link>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}