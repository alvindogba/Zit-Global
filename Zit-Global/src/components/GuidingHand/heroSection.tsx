import heroImage from "../../asset/images/Hero-guilding-hand.jpg";

export default function HeroSection() {
  return (
    <section
      className="relative h-[90vh] flex items-end text-white pb-10 px-6 md:px-12 lg:px-32"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-primary bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[600px]">
        <h1 className="text-4xl font-bold mb-10" >
          Empowering Futures Through Mentorship, Tutorship, and Teaching
        </h1>
        <p className="mb-10 text-lg">
          Join the Guiding Hands Program and unlock your potential with personalized guidance and support.
        </p>
        <div className="mt-6 mb-8 space-x-4">
        <button className="bg-transparent border border-white text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-lightBlue hover:text-white">
        Become a Mentor
          </button>
          <button className="bg-primary px-6 py-2 rounded-lg text-white border border-primary ">
            Become a Tutor
          </button>
        </div>
      </div>
    </section>
  );
}
