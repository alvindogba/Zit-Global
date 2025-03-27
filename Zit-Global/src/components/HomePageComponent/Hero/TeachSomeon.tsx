import image from '../../../asset/images/Teacher.jpeg'
import {Link } from 'react-router-dom'


export default function TeachSomeone() {
  return (
    <section className=" flex flex-col md:flex-row items-center justify-between px-4 md:px-40 pt-16 pb-4 md:pb-20 bg-white">
      {/* Left Side - Text Content */}
      <div className="w-full  md:w-2/7  md:text-left">
        <h3 className="text-base font-medium font-noto text-primary">Want to be part of this Journey?</h3>
        <h2 className="text-2xl font-noto md:text-2xl font-bold text-primary w-[90%] mt-2">
          Be a Teacher Today and impact the Future Now!
        </h2>
        <p className="text-dparacolor font-roboto my-10 leading-relaxed md:w-[80%]">
          At Zongea Institute of Technology, we offer a wide array of courses designed to
          empower learners with the skills and knowledge needed for success. Our courses are
          tailored to meet the needs of students in Liberia, ensuring a comprehensive and
          inclusive educational experience.
        </p>
        <Link to="/icc/teacher" className="w-full md:w-fit font-sans px-6 py-2 bg-secondary text-white text-base rounded-lg hover:font-semibold hover:text-primary hover:border hover:border-primary hover:bg-white transition-all duration-300">
          Become a Teacher
        </Link>

      </div>

      {/* Right Side - Image with Circular Border */}
      <div className="hidden md:visible w-full md:w-1/2  md:flex justify-center md:justify-end mt-10 md:mt-0">
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">

          {/* Mentor Image */}
          <img
            src={image} // Ensure you replace this with the correct image path
            alt="Mentor smiling"
            className="md:w-[94%] md:h-100%] w-full object-cover relative top-2 left-3"
          />
        </div>
      </div>
    </section>
  );
}
