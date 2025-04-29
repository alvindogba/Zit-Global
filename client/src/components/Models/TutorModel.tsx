import { useState } from 'react';
import Logo from '../../asset/images/zongea-logo.png';
import { Link } from "react-router-dom";
import LeftImg from '../../asset/images/A tutor.jpg'; // Update with tutor-specific image
import ScrollBackHome from "./ScrollBackHome";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface FormData {
  // Step 1: Personal Information
  fullName: string;
  email: string;
  phone: string;
  currentRole: string;

  // Step 2: Tutoring Subjects & Experience
  subjects: string[];
  priorTeachingExperience: string;
  experienceDetails: string;

  // Step 3: Availability & Preferences
  tutoringFormat: string;
  availability: string;
  educationalBackground: string;
  referral: string;
}

export default function TutorModel() {
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    currentRole: '',
    subjects: [],
    priorTeachingExperience: '',
    experienceDetails: '',
    tutoringFormat: '',
    availability: '',
    educationalBackground: '',
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
      subjects: checked
        ? [...prev.subjects, value]
        : prev.subjects.filter(area => area !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous error

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/icc/tutor`,
        formData

      );

      if (response.status === 201) {
        navigate('/icc-success', { state: { student: response.data.data } });
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
  };

  return (
    <>
      <header className="h-max md:py-0 py-4 fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-primary shadow-sm">
        <nav className="container mx-auto flex items-center justify-between py-2 px-4 sm:px-6">
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
            <p className="font-roboto text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">Tutor Application</p>
          </div>
        </nav>
      </header>

      <div className={`fixed inset-0 bg-white z-30 ${isOpen ? "block" : "hidden"} overflow-y-auto`}>
        <div className="container sm:mx-auto flex flex-col lg:flex-row items-center gap-20 lg:items-start pt-4 md:pt-8 lg:pt-20">
          <div className="text-primary mx-8 xl:mx-16 space-y-3 w-[90%] lg:w-[38%] lg:mr-52 mt-24">
            <img
              src={LeftImg}
              className="lg:w-[22rem] w-full lg:max-w-[60rem] md:max-w-[40rem] sm:max-w-[28rem] h-[22rem] mx-auto"
              alt="Tutor"
            />
            <h3 className="font-noto text-lg sm:text-xl md:text-2xl font-semibold lg:text-h3 text-center lg:text-left">
              Become a Tutor <br /> Empower Student Success
            </h3>
            <p className="font-roboto text-xs text-dparacolor sm:text-sm md:text-base text-center lg:text-left">
              Help students achieve academic excellence by sharing your knowledge and expertise. Provide personalized support in specific subjects, improve learning outcomes, and foster academic growth.
            </p>
          </div>

          <div className="lg:border-l border-gray-200 bg-white p-4 sm:p-6 w-full lg:w-[65vw] max-w-5xl order-1 lg:order-2">
            <StepIndicator currentStep={currentStep} />

            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>

                  {/* Step 1: Personal Information */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Personal Information</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                 
                      <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      {error && (
                        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 p-2 rounded">
                          {error}
                        </div>)}
                      <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                      <InputField label="Current Role/Position" name="currentRole" value={formData.currentRole} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Step 2: Tutoring Subjects & Experience */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Tutoring Expertise</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <CheckboxGroup
                        label="Select subjects you can tutor:"
                        options={[
                          'Mathematics',
                          'Science (Physics, Chemistry, Biology)',
                          'Computer Science & Programming',
                          'Languages & Literature',
                          'Business & Economics',
                          'Test Preparation (SAT, ACT, GRE)'
                        ]}
                        selected={formData.subjects}
                        onChange={handleCheckboxChange}
                      />
                      <SelectField
                        label="Prior teaching/tutoring experience?"
                        name="priorTeachingExperience"
                        value={formData.priorTeachingExperience}
                        onChange={handleChange}
                        options={['Yes', 'No']}
                        required
                      />
                      {formData.priorTeachingExperience === 'Yes' && (
                        <TextAreaField
                          label="Describe your teaching experience"
                          name="experienceDetails"
                          value={formData.experienceDetails}
                          onChange={handleChange}
                          required
                        />
                      )}
                    </div>
                  </div>

                  {/* Step 3: Availability & Preferences */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Availability & Background</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <SelectField
                        label="Preferred Tutoring Format"
                        name="tutoringFormat"
                        value={formData.tutoringFormat}
                        onChange={handleChange}
                        options={['Online Only', 'In-Person', 'Hybrid']}
                        required
                      />
                      <SelectField
                        label="Weekly Availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        options={['Weekdays', 'Weekends', 'Flexible Schedule']}
                        required
                      />
                      <TextAreaField
                        label="Educational Background & Qualifications"
                        name="educationalBackground"
                        value={formData.educationalBackground}
                        onChange={handleChange}
                        required
                      />
                      <SelectField
                        label="How did you hear about us?"
                        name="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        options={['University Website', 'Friend Referral', 'Social Media', 'Career Center']}
                        required
                      />
                           {error && (
                        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 p-2 rounded">
                          {error}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="md:pt-0 sm:pt-6 md:mt-0 sm:mt-6">
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
                        "Submit Application"
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
  );
}

// Reuse existing helper components (StepIndicator, InputField, SelectField, CheckboxGroup, TextAreaField) from Mentor component

// Step Indicator Component
const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center mb-8">
    {[1, 2, 3].map(step => (
      <div key={step} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${currentStep >= step ? 'bg-primary text-white' : 'bg-gray-200'}`}>
          {step}
        </div>
        {step < 3 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-primary' : 'bg-gray-200'}`} />}
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
    <select {...props} className="select select-bordered  w-full rounded-lg focus:ring-2 focus:ring-primary">
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
    <textarea {...props} className="textarea textarea-bordered border-gray-300 h-24 w-full rounded-lg focus:ring-2 focus:ring-primary" />
  </div>
);