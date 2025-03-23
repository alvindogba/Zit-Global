import image from '../../asset/images/Abel B. Winn.jpg';

export default function WorkForce() {
  return (
    <section className="px-4 md:px-28 md:pt-20 pt-10 pb-4 md:pb-20 bg-white h-auto">
      {/* First Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-auto">
        <div className="w-full md:w-2/5 text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-base font-medium text-primary">Want to be part of this Journey?</h3>
          <h2 className="text-xl md:text-2xl font-bold text-primary w-full md:w-[90%] mt-2">
            Be a Teacher Today and Impact the Future Now!
          </h2>
          <p className="text-gray-700 mt-5 leading-relaxed md:w-[80%]">
            At Zongea Institute of Technology, we offer a wide array of courses designed to
            empower learners with the skills and knowledge needed for success. Our courses are
            tailored to meet the needs of students in Liberia, ensuring a comprehensive and
            inclusive educational experience.
          </p>
          <button className="w-fit md:w-fit mt-6 px-6 py-2 border border-primary text-base text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
            Become a Teacher
          </button>
        </div>

        {/* Image on Small Screens Below Text */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
          <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            <img
              src={image}
              alt="Mentor smiling"
              className="md:w-[94%] md:h-[94%] w-full object-cover relative top-2 left-3"
            />
          </div>
        </div>
      </div>

      {/* Second Section (Image on the Left, Text on the Right) */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mt-12">
        {/* Image on Small Screens Below Text */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-16 md:mb-0 ">
          <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            <img
              src={image}
              alt="Mentor smiling"
              className="md:w-[94%] md:h-[94%] w-full object-cover relative top-2 left-3"
            />
          </div>
        </div>

        <div className="w-full md:w-2/5 text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-base font-medium text-primary">Want to be part of this Journey?</h3>
          <h2 className="text-xl md:text-2xl font-bold text-primary w-full md:w-[90%] mt-2">
            Be a Teacher Today and Impact the Future Now!
          </h2>
          <p className="text-gray-700 mt-5 leading-relaxed md:w-[80%]">
            At Zongea Institute of Technology, we offer a wide array of courses designed to
            empower learners with the skills and knowledge needed for success. Our courses are
            tailored to meet the needs of students in Liberia, ensuring a comprehensive and
            inclusive educational experience.
          </p>
          <button className="w-fit md:w-fit mt-6 px-6 py-2 border border-primary text-base text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
            Become a Teacher
          </button>
        </div>
      </div>
    </section>
  );
}
