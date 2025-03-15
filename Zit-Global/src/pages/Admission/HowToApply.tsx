import { Link } from "react-router-dom";
const MotivationBgImg = "https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D2314086985545239&tbnid=8Nm98VvfnsuJPM&vet=10CBwQxiAoDGoXChMI0MbR0YaViwMVAAAAAB0AAAAAEAc..i&imgrefurl=https%3A%2F%2Fwww.facebook.com%2FWacti1%2Fposts%2F2314087155545222%2F&docid=iGWay-_km4BnyM&w=960&h=720&itg=1&q=students%2C%20young%20adults%20on%20computers&client=ubuntu-sn&ved=0CBwQxiAoDGoXChMI0MbR0YaViwMVAAAAAB0AAAAAEAc";
import { ArrowRight } from 'lucide-react';

export default function HowToApply() {

  const stepsToApply = [
    {
      stepNumber: 1,
      title: "Complete the Online Application Form",
      description: "Start by filling out the application form with accurate personal, academic, and professional information.",
    },
    {
      stepNumber: 2,
      title: "Submit Required Documents",
      description: "Upload documents such as your CV, transcripts, and letters of recommendation through the portal.",
    },
    {
      stepNumber: 3,
      title: "Attend an Interview (If Required)",
      description: "Some programs may require a short interview to assess your qualifications and motivation.",
    },
    {
      stepNumber: 4,
      title: "Receive Admission Decision",
      description: "Our admissions team will review your application and notify you of your admission status.",
    },
  ];

  const commonFAQs = [
    {
      question: "What is the admission process?",
      answer:
        "The admission process typically includes completing an online application, submitting required documents, and potentially attending an interview (if applicable).",
    },
    {
      question: "Do I need to take an entrance exam?",
      answer:
        "Some programs may require entrance exams. Check the program's requirements for more details.",
    },
    {
      question: "Can I apply for financial aid?",
      answer:
        "No, Zongea Institute of Technology does not offer financial aid for now.",
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-navy-600 text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Applying to Zongea Institute of Technology, <br /> create a possibility for a bright future.
          </h1>
          <p className="text-md text-gray-200 max-w-2xl mb-8">
            Zongea Institute of Technology equips emerging talent with the skills needed for in-demand careers, revolutionizing the future of work. Your support makes it all happen.
          </p>
          <Link
            to="/admission"
            className="border border-white font-bold text-xs hover:px-6 hover:py-2 text-white px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
          >
            Apply Now<ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold text-navy-600 mb-4">
            Application Overview
          </h2>
          <p className="text-gray-700 text-md leading-6">
            Applying to Zongea Institute of Technology is simple and
            straightforward. Follow the steps below to kickstart your journey to
            a brighter future. Make sure to prepare the required documents and
            understand the deadlines.
          </p>
        </section>

        {/* Steps to Apply */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold text-navy-600 mb-4">
            Steps to Apply
          </h2>
          <div className="space-y-6">
            {stepsToApply.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-600">{step.title}</h3>
                  <p className="text-gray-700 text-sm mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-navy-600 mb-4">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-6">
            {commonFAQs.map((faq, index) => (
               <div key={index} className="border border-gray-200 rounded-md p-4">
                 <h4 className="text-md font-semibold text-navy-600">{faq.question}</h4>
                 <p className="text-gray-700 text-sm mt-2">{faq.answer}</p>
               </div>
            ))} 
          </div>
        </section>
      </div>
    </div>
  );
}
