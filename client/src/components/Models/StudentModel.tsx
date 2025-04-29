import { useState } from "react";
import Logo from '../../asset/images/zongea-logo.png';
import { Link } from "react-router-dom";
import LeftImg from '../../asset/images/l am student copy.jpg'
import ScrollBackHome from "./ScrollBackHome";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface FormData {
  // Step 1
  fullName: string;
  dob: string;
  email: string;
  phone: string;
  gender: string;

  // Step 2
  schoolName: string;
  gradeLevel: string;
  subjects: string[];
  learningStyle: string;

  // Step 3
  tutoringNeeds: string;
  objectives: string;
  availability: string;
  tutorType: string;
  referral: string;
}

export default function StudentModel() {
  const [error, setError] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    gender: '',
    schoolName: '',
    gradeLevel: '',
    subjects: [],
    learningStyle: '',
    tutoringNeeds: '',
    objectives: '',
    availability: '',
    tutorType: '',
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
        : prev.subjects.filter(subject => subject !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(null); // Clear previous error


    console.log(`Form Data to be submitted: ${formData}`)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/icc/tutees`,
        formData

      );



      if (response.status === 200) {
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
            <p className="font-roboto text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2">Tutees Application</p>
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
            <h3 className="font-noto text-lg sm:text-xl md:text-2xl text-primary font-bold lg:text-h3 text-center lg:text-left">
              Start Your Learning <br /> Journey Today
            </h3>
            <p className="font-roboto text-xs text-dparacolor sm:text-sm md:text-base text-center lg:text-left">
              Ready to gain new skills and grow your career? Apply as a student and access high quality education, expert guidance, and mentorship to help you reach your full potential.
            </p>
          </div>

          {/* Form section - appears first on mobile */}
          <div className="lg:border-l border-gray-200 bg-white p-4 sm:p-6 w-full lg:w-[65vw] max-w-5xl order-1 lg:order-2">
            <StepIndicator currentStep={currentStep} />

            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>
                  {/* Step 1 */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Personal Information</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <InputField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                        <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female']} required />
                      </div>
                      <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      {error && (
                        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 p-2 rounded">
                          {error}
                        </div>)}
                      <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Academic Details</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <InputField label="Current School Name" name="schoolName" value={formData.schoolName} onChange={handleChange} required />
                      <SelectField label="Grade Level" name="gradeLevel" value={formData.gradeLevel} onChange={handleChange} options={['7th', '8th', '9th', '10th', '11th', '12th', 'University']} required />
                      <CheckboxGroup
                        label="Subjects of Interest"
                        options={['Math', 'Science', 'English', 'Computer Science']}
                        selected={formData.subjects}
                        onChange={handleCheckboxChange}
                      />
                      <SelectField label="Preferred Learning Style" name="learningStyle" value={formData.learningStyle} onChange={handleChange} options={['One-on-One', 'Group Learning', 'Online', 'In-Person']} required />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="min-w-full p-2 sm:p-4">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Goals and Preferences</h2>
                    <div className="space-y-3 sm:space-y-4">
                      <TextAreaField label="Tutoring Needs" name="tutoringNeeds" value={formData.tutoringNeeds} onChange={handleChange} required />
                      <TextAreaField label="Learning Objectives" name="objectives" value={formData.objectives} onChange={handleChange} required />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <SelectField label="Availability" name="availability" value={formData.availability} onChange={handleChange} options={['Morning', 'Afternoon', 'Evening']} required />
                        <SelectField label="Preferred Tutor Type" name="tutorType" value={formData.tutorType} onChange={handleChange} options={['Professional Tutor', 'Peer Tutor', 'No Preference']} required />
                      </div>
                      <SelectField label="How did you hear about us?" name="referral" value={formData.referral} onChange={handleChange} options={['Website', 'Friend', 'Social Media', 'Other']} required />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-600 font-medium bg-red-50 border border-red-200 p-2 rounded">
                          {error}
                        </div>)}
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
              </div>

            </form>
          </div>
        </div>
      </div>
      <ScrollBackHome />
    </>
  );
};
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