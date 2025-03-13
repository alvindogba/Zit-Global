import image from "../../../asset/images/Graduation-Bg-Img.jpg";

export default function JoinUs() {
  return (
    <section className=" bg-primary text-white h-full flex flex-col md:flex-row  items-center justify-between px-4 md:px-28 py-20">
      {/* Left Side - Image */}
      <img
        src={image}
        alt="Mentor teaching"
        className="w-[100%]  h-[45vh] md:w-[45%]  md:h-[60vh] rounded-[6%]"
      />

      {/* Right Side - Content */}
      <div className="text-white w-full md:w-[50%] text-center md:text-left mt-6 md:mt-0">
        <h2 className=" font-lg text-white ">Join Us</h2>
        <h2 className="text-2xl  md:text-2xl font-bold mt-4">Mentor Someone Today</h2>
        <p className=" mt-10">
          At Zongea Institute of Technology, we believe in the power of education and mentorship. 
          By volunteering, you can make a significant impact in the lives of learners in the USA and Liberia. 
          Register now to be part of our mission and help shape the future.
        </p>
        <button className="mt-10 px-6 py-2 border border-white  rounded-lg hover:bg-white hover:text-primary hover:font-extrabold transition-all w-full md:w-auto">
          Become a Teacher
        </button>
      </div>
    </section>
  );
}
