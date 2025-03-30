import { useState } from 'react';
import { Mail, MapPin, ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactImg from '../asset/images/OT image .jpg';
import MotivationBgImg from '../asset/images/Graduation-Bg-Img.jpg';
import { toast } from 'react-toastify';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {

  const contactInfoCard = [
    // {
    //   label: "Call Us",
    //   description1: "Main: 878-7348-7853",
    //   description2: "Admissions: 878-7348-7853",
    //   icon: <Phone />,
    // },
    {
      label: "Email Us",
      description1: "info@zongeatech.com",
      
      icon: <Mail />,
    },
    {
      label: "Visit Us",
      // description1: "Liberia, Monrovia",
      // description2: "RIA Rehab Community",
      description3: "US Address: 300 Southtown",
      description4: "Circle Rolseville, NC 27571",
      icon: <MapPin />,
    },
    
    {
      label: "Hours of Operation",
      description1: "Monday - Friday: 9:00 AM - 5:00 PM",
      description2: "Saturday: 10:00 AM - 4:00 PM",
      description3: 'Sunday: Closed',
      icon: <Clock3 />,
    },
  ];

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Message sent successfully! We will contact you soon.');
        setFormData({ fullName: '', email: '', subject: '', message: '' });
        setShowModal(true); // Show modal on success
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary  text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.4), rgba(0, 0, 90, 0.4)), url(${ContactImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
        </div>
        <div className="relative max-w-6xl  mx-auto px-8 sm:px-6 lg:px-8 py-40">
          <h1 className="text-xl font-noto md:text-2xl font-bold mb-6 md:w-[28rem]">
            Get More Information About Our School & Courses
          </h1>
          <div className="md:w-[40rem]">
            {/* <p className="text-md text-gray-200 font-roboto max-w-2xl mb-8">
              Your donation helps provide free, high-quality education, mentorship and skill development to students in Liberia and beyond
            </p> */}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:py-12">
        <h2 className="text-primary text-2xl font-noto font-bold">Get In Touch</h2>
        <p className="text-md max-w-2xl font-roboto text-dparacolor mb-8">Wether you have questions about our Programs, admissions, or mentorship opportunities</p>
      </div>

      <div className='max-w-6xl mx-auto px-1 md:px-8 md:flex flex-wrap justify-between'>
        <div className='w-[40%] '>
          {/* Contact Form */}
          <div className="bg-white py-1 md:py-12">
            <h2 className="text-primary ml-4 font-noto md:ml-0 text-2xl font-bold">Leave A Message</h2>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-dparacolor">Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-72 md:w-80 p-2 border border-gray-300 font-roboto rounded-md bg-gray-100"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-dparacolor">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-72 md:w-80 p-2 border border-gray-300 font-roboto rounded-md bg-gray-100"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-dparacolor">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-72 md:w-80 p-2 border border-gray-300 font-roboto rounded-md bg-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-dparacolor">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-72 md:w-80 h-36 p-2 border border-gray-300 font-roboto rounded-md bg-gray-100"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary font-sans  text-white px-4 py-2 rounded-md flex justify-center items-center"
              >
                {isSubmitting ? (
                  <div className="spinner-border animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>

          {/* Success Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 text-center rounded-lg shadow-lg">
              <div className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-10">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-noto text-primary font-bold mb-4">Thank You!</h2>
                <p className='font-roboto text-dparacolor'>Your message has been successfully sent. We will get back to you soon.</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-secondary hover: font-sans text-white px-3 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>  
        {/* {Get in touch} */}
        <div className="w-full md:w-1/2 px-4">
          
          <h2 className="text-primary text-2xl font-noto font-bold mb-2 md:mb-8">We're always eager to hear from you!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfoCard.map((card, index) => (
           <div key={index} className="bg-gray-100 p-4 border border-gray-200 hover:border-primary hover:shadow-lg rounded-lg text-center md:w-60">
           <div className="w-12 text-secondary border border-primary h-12 rounded-full bg-primary-light flex justify-center items-center mx-auto mb-3">
             {card.icon}
           </div>
           <h4 className="text-md font-noto font-bold mb-3 text-primary">{card.label}</h4>
           <div className="text-dparacolor">
             <p className='font-roboto'>{card.description1}</p>
             <p className='font-roboto'>{card.description2}</p>
             <p className='font-roboto'>{card.description3}</p>
             <p className='font-roboto'>{card.description4}</p>
           </div>
           </div>
         ))}
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-primary font-noto text-2xl font-bold mb-4">Social Media</h2>
            <p className="text-md font-roboto text-dparacolor max-w-2xl mb-4">Zongea Institute of Technology (ZIT) is a forward-thinking educational institution dedicated to equipping individuals with the knowledge and skills needed to thrive in today’s fast-evolving world. Our mission is to Teach, Tutor, and Mentor (TTM) learners, empowering them to succeed in technology, business, and innovation.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="https://www.facebook.com/ZongeaInstituteOfTechnology/" target="_blank">
                <FaFacebookF className="text-primary hover:text-secondary cursor-pointer" size={18} />
              </Link>
              <Link to="https://www.instagram.com/zongea_institute_of_technology/" target="_blank">
                <FaInstagram className="text-primary hover:text-secondary cursor-pointer" size={18} />
              </Link>
              <Link to="https://www.linkedin.com/school/zongea-institute-of-technology/" target="_blank">
                <FaLinkedinIn className="text-primary hover:text-secondary cursor-pointer" size={18} />
              </Link>
              <Link to="https://github.com/zongea-institute-of-technology" target="_blank">
                <FaGithub className="text-primary hover:text-secondary cursor-pointer" size={18} />
              </Link>
            </div>
          </div>

        </div>  
      </div>

      {/* Google Map Section */}
      {/* <div className="max-w-9xl mx-auto my-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.141713744395!2d-10.68141762709806!3d6.2450482937433005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf0a01e1ee6989e5%3A0x9f69c5701826df74!2sRehab%20community!5e0!3m2!1sen!2s!4v1740578328299!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div> */}

      {/* CTA Section */}
      <div
        className="text-white py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.8), rgba(0, 0, 90, 0.8)), url(${MotivationBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container w-full text-center text-white">
          <h2 className="text-base font-noto md:text-2xl md:w-[70%] md:mx-auto mb-8">
            Make a difference today, your donation, no matter the size, brings us one step closer to transforming lives and creating lasting impact!
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Volunteer Button */}
            <Link
              to="/impact-connect-center"
              className="w-full sm:w-fit border font-sans hover:bg-white hover:text-primary text-lg hover:px-6 hover:py-2 text-white px-3 sm:px-6 py-2 transition-colors rounded-md inline-flex items-center justify-center"
            >
              Be A Volunteer <ArrowRight className="ml-2" size={16} />
            </Link>

            {/* Donate Button */}
            <Link
              to="/donate"
              className="w-full sm:w-fit bg-white font-sans hover:bg-primary hover:text-white text-lg hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-2 transition-colors rounded-md inline-flex items-center justify-center"
            >
              Donate Today <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
