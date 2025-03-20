import MotivationBgImg from '../asset/images/Graduation-Bg-Img.jpg';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Instructors from '../components/Instructors/index.tsx';
import StudentLife from '../components/StudentLife/index.tsx';
import StudySucceed from '../components/StudySucceed/index.tsx';
import Testimonial from '../components/Testimonial/Testimonial.tsx';
import { Header } from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';


const  StudentsPage = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <div className="relative bg-navy-600 text-white">
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Empower Your Academic Journey
        </h1>
        <p className="text-md text-gray-200 max-w-2xl mb-8">
        Unlock your potential and excel in your academic pursuits. Explore resources, programs, and opportunities designed to support students at every stage of their educational journey.
        </p>
        <Link
        to="/academics/cohort"
        className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
        >
        Discover More <ArrowRight className="ml-2" size={16} />
        </Link>
      </div>
      </div>
      <Instructors />
      <StudySucceed />
      <StudentLife />
      <Testimonial />
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}

export default StudentsPage