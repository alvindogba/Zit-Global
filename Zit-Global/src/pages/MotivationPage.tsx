import { Earth, BookOpen } from 'lucide-react';
import MotivationBgImg from '../asset/images/Graduation-Bg-Img.jpg';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ReadyToStartSec from '../components/MotivationPage/ReadyToStartSec';
import GroundWork from '../components/MotivationPage/GroundWork'
import WhyZongea from '../components/MotivationPage/WhyZongea'
import WorkForce from '../components/MotivationPage/WorkForce'
import { Link } from 'react-router-dom'
import WhatWeBelieve from '../components/MotivationPage/WhatWeBelieve';
import SeeAFuture from '../components/MotivationPage/SeeAFuture';

export default function MotivationPage() {

  const believeExplanations = [
    {
      icon: BookOpen,
      title: "Education Without Barriers ",
      description: "We believe education should be accessible to everyone. Our free programs ensure no one is left behind due to financial limitations."
    },
    {
      icon: Earth,
      title: "Real World Skills",
      description: "Our hands-on, industry aligned curriculum prepares students for jobs in the tech sector, helping them build practical skills for the future."
    }
  ]
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary text-white">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-noto text-2xl md:text-3xl font-bold mb-6">
            Join Our Community of <br /> Future Tech Leaders
          </h1>
        </div>
      </div>
      <GroundWork /> 
      <WhyZongea />
      <ReadyToStartSec />
      <div className="bg-gray-200 relative sm:px-6 py-12">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto justify-between items-center space-y-8 md:space-y-0 px-4">
          {/* Left Side - Title */}
          <div className="text-center md:text-left md:w-[40%]">
            <h2 className="font-noto text-xl md:text-2xl font-bold mb-4 text-primary">
            We believe every
            <br />
            Student should have:
            </h2>
          </div>

          {/* Right Side - Belief Cards */}
          <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-[55%] gap-4">
            {believeExplanations.map((believe, index) => (
              <div
                key={index}
                className="w-full min-w-[14rem] max-w-[16rem] h-[16rem] px-4 py-6 bg-white flex flex-col items-center shadow-md rounded-lg"
              >
                <div className="w-10 h-10 rounded-full flex justify-center items-center mb-3 bg-primary/10">
                  <believe.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-noto text-base font-semibold mb-2 text-primary text-center">
                  {believe.title}
                </h3>
                <p className="font-roboto text-dparacolor text-sm text-center">
                  {believe.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WorkForce />
      <div className="text-white py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.8), rgba(0, 0, 90, 0.8)), url(${MotivationBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className='flex justify-center items-center'>
            <h2 className="font-noto text-lg md:text-2xl font-bold mb-6 text-white w-full text-center md:w-[30rem]">
              Our Vision: Opportunity and Empowerment for Every Liberian
            </h2>
          </div>
          
          <p className="font-roboto text-md text-white mb-8 max-w-2xl mx-auto">
            Make a difference today—your donation, no matter the size, brings us one step closer to transforming lives and creating lasting impact!
        </p>
        
        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/admission"
            className="bg-transparent font-sans border border-white hover:font-semibold text-xs text-white px-3 py-2 transition-all rounded-md inline-flex items-center justify-center hover:bg-white hover:text-primary"
          >
            Be a Volunteer
          </Link>
          <Link
            to="/donate"
            className="font-sans bg-secondary hover:font-semibold text-xs text-white px-3 py-2 transition-all rounded-md inline-flex items-center justify-center hover:text-primary hover:bg-white "
          >
            Donate Today
          </Link>
        </div>
        </div>
      </div>
      <WhatWeBelieve />
      <SeeAFuture />
      <ScrollToTopButton />
    </div>
  );
}

