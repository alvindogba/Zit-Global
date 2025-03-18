import { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactImg from '../asset/images/OT image .jpg';
import MotivationBgImg from '../asset/images/Graduation-Bg-Img.jpg';
import { toast } from 'react-toastify';

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
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
      <div className="relative bg-navy-600 text-white">
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
        <div className="relative max-w-5xl mx-auto px-8 sm:px-6 lg:px-8 py-24">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 w-[28rem]">
            Get More Information About Our School & Courses
          </h1>
          <div className="w-[40rem]">
            <p className="text-md text-gray-200 max-w-2xl mb-8">
              Your donation helps provide free, high-quality education, mentorship and skill development to students in Liberia and beyond
            </p>
          </div>
        </div>
      </div>

      {/* {Get in touch} */}
      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-primary text-2xl font-bold">Get In Touch</h2>
          <p className="text-md max-w-2xl mb-8">Wether you have questions about our Programs, admissions, or mentorship opportunities</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-primary p-4 border border-gray-200 rounded-lg text-center">
              <div className="w-12 text-white h-12 rounded-full bg-primary-light flex justify-center items-center mx-auto mb-3 shadow-sm shadow-black">
                <Phone />
              </div>
              <h4 className="text-md font-bold mb-3 text-white">Call Us</h4>
              <div className="text-white">
                <p>Main: 878-7348-7853</p>
                <p>Admissions: 878-7348-7853</p>
              </div>
            </div>
            <div className="bg-primary p-4 border border-gray-200 rounded-lg text-center">
              <div className="w-12 text-white h-12 rounded-full bg-primary-light flex justify-center items-center mx-auto mb-3 shadow-sm shadow-black">
                <MapPin />
              </div>
              <h4 className="text-md font-bold mb-3 text-white">Visit Us</h4>
              <div className="text-white">
                <p>Main: 878-7348-7853</p>
                <p>Admissions: 878-7348-7853</p>
              </div>
            </div>
            <div className="bg-primary p-4 border border-gray-200 rounded-lg text-center">
              <div className="w-12 text-white h-12 rounded-full bg-primary-light flex justify-center items-center mx-auto mb-3 shadow-sm shadow-black">
                <Mail />
              </div>
              <h4 className="text-md font-bold mb-3 text-white">Email Us</h4>
              <div className="text-white">
                <p>Main: 878-7348-7853</p>
                <p>Admissions: 878-7348-7853</p>
              </div>
            </div>
            <div className="bg-primary p-4 border border-gray-200 rounded-lg text-center">
              <div className="w-12 text-white h-12 rounded-full bg-primary-light flex justify-center items-center mx-auto mb-3 shadow-sm shadow-black">
                <Clock3 />
              </div>
              <h4 className="text-md font-bold mb-3 text-white">Hours of Operation</h4>
              <div className="text-white">
                <p>Monday - Friday: 8:00 AM - 7:00 PM</p>
                <p>Saturday: 8:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-primary text-2xl font-bold">We're always eager to hear from you!</h2>
          <p className="text-lg font-semibold mb-6">Send us a message</p>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-gray-100"
                required
              />
            </div>
            <div className="mb-4 md:gap-2 md:flex justify-between items-center w-full">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-[28rem] p-2 border rounded-md bg-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-[28rem] p-2 border rounded-md bg-gray-100"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full h-36 p-2 border rounded-md bg-gray-100"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-primary border-b-2 text-primary px-4 py-2 rounded-md flex justify-center items-center"
            >
              {isSubmitting ? (
                <div className="spinner-border animate-spin h-5 w-5 border-b-2 border-white rounded-full"></div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
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
            <h2 className="text-xl font-bold mb-4">Thank You!</h2>
            <p>Your message has been successfully sent. We will get back to you soon.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-primary text-white px-6 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Google Map Section */}
      <div className="max-w-9xl mx-auto my-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.141713744395!2d-10.68141762709806!3d6.2450482937433005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf0a01e1ee6989e5%3A0x9f69c5701826df74!2sRehab%20community!5e0!3m2!1sen!2s!4v1740578328299!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* CTA Section */}
      <div
        className="text-white py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      <div className="container w-full text-center text-white">
  <h2 className="text-base md:text-2xl md:w-[70%] md:mx-auto mb-4">
    Make a difference today—your donation, no matter the size, brings us one step closer to transforming lives and creating lasting impact!
  </h2>

  <div className="flex flex-col sm:flex-row justify-center gap-4">
    {/* Volunteer Button */}
    <Link
      to="/guiding-hands-program"
      className="w-full sm:w-fit border hover:bg-white hover:text-primary text-lg hover:px-6 hover:py-2 text-white px-3 sm:px-6 py-2 transition-colors rounded-md inline-flex items-center justify-center"
    >
      Be A Volunteer <ArrowRight className="ml-2" size={16} />
    </Link>

    {/* Donate Button */}
    <Link
      to="/donate"
      className="w-full sm:w-fit bg-white text-lg hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-2 transition-colors rounded-md inline-flex items-center justify-center"
    >
      Donate Today <ArrowRight className="ml-2" size={16} />
    </Link>
  </div>
</div>

      </div>

    </div>
  );
}
