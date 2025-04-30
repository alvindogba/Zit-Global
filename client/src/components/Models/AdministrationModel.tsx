import { useState } from "react";
import Logo from '../../asset/images/zongea-logo.png';
import { Link } from "react-router-dom";
import LeftImg from '../../asset/images/I am a.jpg'
import ScrollBackHome from "./ScrollBackHome";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


interface FormData {
  // Step 1: Personal & School Info
  fullName: string;
  email: string;
  phone: string;
  schoolName: string;
  schoolLocation: string;

  // Step 2: School Needs & Partnership Goals
  services: string[];
  gradeLevels: string;
  supportMode: string;
  challenges: string;

  // Step 3: Availability & Additional Information
  contactMethod: string;
  bestTime: string;
  additionalComments: string;
  referral: string;
}

export default function AdministrationModel() {
      const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    schoolName: '',
    schoolLocation: '',
    services: [],
    gradeLevels: '',
    supportMode: '',
    challenges: '',
    contactMethod: '',
    bestTime: '',
    additionalComments: '',
    referral: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter(service => service !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(null); // Reset error state


    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/icc/schoolAdmins`,
        formData
  
      );


      if (response.status === 201) {
        // Redirect using navigate hook
        navigate('/icc-success', { state: { student: response.data.data } });
      } else {
        console.error('Submission failed with status:', response.status);
      }
      setIsOpen(false);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError(error.response.data.error || 'Email already exists.');
        } else {
          setError('Something went wrong. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>

      <header className="h-max md:py-0 py-4 fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-primary shadow-sm">
        <nav className="container mx-auto flex items-center justify-between py-2 px-4 sm:px-6">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link to="/" aria-label="Home">
              <img
                src={Logo}
                alt="Zongea Logo"
                className="w-24 h-12 sm:w-28 sm:h-14 md:w-40 md:h-16 lg:w-48 lg:h-20"
              />
            </Link>
          </div>
          <div className="text-white md:mr-28 text-right sm:text-left">
            <h3 className="font-noto text-xs sm:text-sm md:text-base lg:text-h3">Impact and Connect Center</h3>
            <p className="font-roboto text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">School Application</p>
          </div>
        </nav>
      </header>

      <div className={`fixed inset-0 bg-white z-30 ${isOpen ? "block" : "hidden"} overflow-y-auto`}>
        <div className="container sm:mx-auto flex flex-col lg:flex-row items-center gap-20 lg:items-start pt-4 md:pt-8 lg:pt-20">
          {/* Image and text section - appears below form on mobile */}
          <div className="text-primary mx-8 xl:mx-16 space-y-3 w-[90%] lg:w-[38%] lg:mr-52 mt-24">
            <img
              src={LeftImg}
              className="lg:w-[30rem] w-full lg:max-w-[60rem] md:max-w-[40rem] sm:max-w-[28rem] h-auto mx-auto"
              alt="Parent"
            />
            <h3 className="font-noto text-lg sm:text-xl md:text-2xl text-primary lg:text-h3 text-center lg:text-left">
              Join Our Administrative Team <br /> Support Education Behind the Scenes
            </h3>
            <p className="font-roboto text-xs text-dparacolor sm:text-sm md:text-base text-center lg:text-left">
              Play a vital role in keeping our programs running smoothly. From coordination to student support, your contributions will help create an efficient and impactful learning environment.
            </p>
          </div>

          {/* Form section - appears first on mobile */}
          <div className="lg:border-l border-gray-200 bg-white p-4 sm:p-6 w-full lg:w-[65vw] max-w-5xl order-1 lg:order-2">
            <StepIndicator currentStep={currentStep} />

            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>

                  {/* Step 1: Personal & School Information */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Personal & School Information</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                      <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      {error && (
                        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 p-2 rounded">
                          {error}
                        </div>)}
                      <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                      <InputField label="School Name" name="schoolName" value={formData.schoolName} onChange={handleChange} required />
                      <InputField label="School Location (City & Country)" name="schoolLocation" value={formData.schoolLocation} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Step 2: School Needs & Partnership Goals */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">School Needs & Partnership Goals</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <CheckboxGroup
                        label="What services are you interested in?"
                        options={['Tutoring Support for Students', 'Teacher Training', 'Digital Learning Integration', 'Mentorship for Students']}
                        selected={formData.services}
                        onChange={handleCheckboxChange}
                      />
                      <SelectField label="Grade Levels at Your School" name="gradeLevels" value={formData.gradeLevels} onChange={handleChange}
                        options={['Primary', 'Secondary', 'Higher Ed']} required />
                      <SelectField label="Preferred Mode of Support" name="supportMode" value={formData.supportMode} onChange={handleChange}
                        options={['Online', 'In-Person', 'Both']} required />
                      <TextAreaField label="Challenges Your School Faces in Student Learning" name="challenges" value={formData.challenges} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Step 3: Availability & Additional Information */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Availability & Additional Information</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <SelectField label="Preferred Contact Method" name="contactMethod" value={formData.contactMethod} onChange={handleChange}
                        options={['Email', 'Phone', 'WhatsApp']} required />
                      <SelectField label="Best Time to Contact You" name="bestTime" value={formData.bestTime} onChange={handleChange}
                        options={['Morning', 'Afternoon', 'Evening']} required />
                      <TextAreaField label="Additional Comments or Requests" name="additionalComments" value={formData.additionalComments} onChange={handleChange} />
                      <SelectField label="How did you hear about us?" name="referral" value={formData.referral} onChange={handleChange}
                        options={['Website', 'Referral', 'Social Media', 'Other']} required />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 p-2 rounded">
                          {error}
                        </div>)}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className=" md:pt-0 sm:pt-6 md:mt-0 sm:mt-6">
                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-4 sm:px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm sm:text-base"
                    >
                      Back
                    </button>
                  )}
                  <div className="flex-1" />
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="px-4 sm:px-6 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary text-sm sm:text-base"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-4 py-2 sm:py-4 text-sm sm:text-base text-white font-medium rounded-lg transition-colors ${isLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary hover:bg-primary/80"
                        }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>

      <ScrollBackHome />

    </>
  )
  };

// Step Indicator Component
const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center mb-8">
    {['Information', 'Needs', 'Availability'].map((step, index) => (
      <div key={step} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= index + 1 ? "bg-primary text-white" : "bg-gray-200"}`}>
          {index + 1}
        </div>
        {index < 2 && <div className={`w-16 h-1 ${currentStep > index + 1 ? "bg-primary" : "bg-gray-200"}`} />}
      </div>
    ))}
  </div>
);

// Reusable Input Components
const InputField = ({ label, ...props }: any) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <input {...props} className="input input-bordered border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-primary/70" />
  </div>
);

const SelectField = ({ label, options, ...props }: any) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <select {...props} className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-primary">
      <option value="">Select...</option>
      {options.map((option: string) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const CheckboxGroup = ({ label, options, selected, onChange }: any) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <div className="flex flex-wrap gap-4">
      {options.map((option: string) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-sm rounded border-gray-300 focus:ring-primary"
            value={option}
            checked={selected.includes(option)}
            onChange={onChange}
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const TextAreaField = ({ label, ...props }: any) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <textarea {...props} className="textarea textarea-bordered h-24 w-full rounded-lg focus:ring-2 focus:ring-primary" />
  </div>
);
