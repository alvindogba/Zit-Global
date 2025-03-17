import React, { useState } from "react";
import backgroundImage from '../../asset/images/bigBrother.jpg'
import childImage from '../../asset/images/student_teaching.jpg'
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Interface for the Guide
interface GuidanceData {
  fullName: string;
  email: string;
  phoneNumber: string;
  experience: string;
  availability: string;
}

// Interface for the child 
interface ChildData {
  parentName: string;
  childName: string;
  childAge: string;
  childInterest: string;
  email: string;
}

function GuidingHandPage() {
  const [guidienData, setGuidienData] = useState<GuidanceData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    experience: "",
    availability: ""
  });

  // State for child registration
  const [childData, setChildData] = useState<ChildData>({
    parentName: "",
    childName: "",
    childAge: "",
    childInterest: "",
    email: ""
  });

  // Function to handle child input change 
  function handleChild(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setChildData({
      ...childData,
      [e.target.name]: e.target.value
    });
  }

  // Function to handle Guide input change 
  function handleGuidien(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setGuidienData({
      ...guidienData,
      [e.target.name]: e.target.value
    });
  }

  // Function to submit Guide Data 
  function submitGuidienData(e: React.FormEvent) {
    e.preventDefault();
    // Add submission logic here
  }

  // Function to submit Child Data 
  function submitChildData(e: React.FormEvent) {
    e.preventDefault();
    // Add submission logic here
  }

  return (
    <div className="w-full bg-secondary">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute inset-0 bg-primary bg-opacity-50 flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Guiding Hand Mentorship</h1>
            <p className="text-lg text-white mt-4">Connecting children with mentors to guide them toward a brighter future.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">How It Works</h2>
            <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
              Our mentorship program follows a simple, effective process to connect mentors and mentees
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center relative">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                {/* Desktop connector line - hidden on mobile */}
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-primary/20" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up</h3>
                <p className="text-gray-600">
                  Create your profile as either a mentor or mentee. Tell us about your expertise or learning goals.
                </p>
              </div>

              <div className="text-center relative">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                {/* Desktop connector line - hidden on mobile */}
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-primary/20" />
                
              </div>

              <div className="text-center relative">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                {/* Desktop connector line - hidden on mobile */}
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-primary/20" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect</h3>
                <p className="text-gray-600">
                  Schedule your first meeting and start your mentorship journey together.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Grow Together</h3>
                <p className="text-gray-600">
                  Meet regularly, track progress, and achieve your goals with ongoing support.
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 text-center">
              <button
                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                Start Your Journey
                <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two-Column Guide Registration */}
      <div className="bg-secondary container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Become a Guide</h2>
          <p className="text-lg text-gray-600 mt-4">Make a difference in a child's life by becoming a Guide. Share your experience, provide guidance, and help shape the future.</p>
          <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90">Register as a Guide</button>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800">Guidien Registration</h3>
          <form className="mt-4 space-y-4" onSubmit={submitGuidienData}>
            <input name="fullName" type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" onChange={handleGuidien} />
            <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={handleGuidien} />
            <input name="phoneNumber" type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg" onChange={handleGuidien} />
            <textarea name="experience" placeholder="Your Experience" className="w-full p-3 border rounded-lg" onChange={handleGuidien} />
            <textarea name="availability" placeholder="Your Availability" className="w-full p-3 border rounded-lg" onChange={handleGuidien} />
            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90">Submit</button>
          </form>
        </div>
      </div>

      {/* Parent Enrollment Section */}
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <img src={childImage} alt="Parent and Child" className="rounded-lg shadow-lg" />
        <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 ">
          <h2 className="text-3xl font-bold text-gray-800">Enroll Your Child</h2>
          <p className="text-lg text-gray-600 mt-4">Give your child the opportunity to learn and grow under the guidance of a caring mentor.</p>
          <form className="mt-4 space-y-4" onSubmit={submitChildData}>
            <input name="parentName" type="text" placeholder="Parent's Name" className="w-full p-3 border rounded-lg" onChange={handleChild} />
            <input name="childName" type="text" placeholder="Child's Name" className="w-full p-3 border rounded-lg" onChange={handleChild} />
            <input name="childAge" type="number" placeholder="Child's Age" className="w-full p-3 border rounded-lg" onChange={handleChild} />
            <input name="email" type="email" placeholder="Email" className="w-full p-3 border rounded-lg" onChange={handleChild} />
            <textarea name="childInterest" placeholder="Child's Interests" className="w-full p-3 border rounded-lg" onChange={handleChild} />
            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90">Enroll Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuidingHandPage;