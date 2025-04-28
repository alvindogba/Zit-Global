import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, BookOpen, Phone, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from '../../components/ScrollToTopButton';


type FormData = {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  identificationType: string;
  identificationNumber: string;
  applicantImage: File | null;
  nationality: string;
  haveComputer: boolean;
  desiredProgram: string;

  // Academic Details
  educationLevel: string;
  academicYear: string;
  yearOfGraduation: string;
  lastSchoolAttended: string;
  computerKnowledge: string;
  personalStatement: string;
  communityImpact: string;

  // Contact Information
  email: string;
  phone: string;
  address: string;

  // Emergency Contact Information
  emergencyContactName: string;
  emergencyPersonAddress: string;
  emergencyContactNumber: string;
  relationshipType: string;

  // Supporting Documents
  churchRecommendationLetter: File | null;
  communityRecommendationLetter: File | null;

  // Agreement statement
  consented: boolean;
};

const initialFormData: FormData = {
  // Personal Information
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  identificationType: "",
  identificationNumber: "",
  applicantImage: null,
  nationality: "",
  haveComputer: false,
  desiredProgram: "",

  // Academic Details
  educationLevel: "",
  academicYear: "",
  yearOfGraduation: "",
  lastSchoolAttended: "",
  computerKnowledge: "",
  personalStatement: "",
  communityImpact: "",

  // Contact Information
  email: "",
  phone: "",
  address: "",

  // Emergency Contact Information
  emergencyContactName: "",
  emergencyPersonAddress: "",
  emergencyContactNumber: "",
  relationshipType: "",

  // Supporting Documents
  churchRecommendationLetter: null,
  communityRecommendationLetter: null,

  // Agreement statement
  consented: false,
};

const inputClassName = "w-full px-2 py-2 border font-roboto border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";
const checkboxClassName = "h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded";

function AdmissionPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading

  
    const formDataToSend = new FormData();
  
    // Append all form fields to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else if (typeof value === 'boolean') {
        formDataToSend.append(key, value ? 'true' : 'false');
      } else if (value !== null) { // Add null check
        formDataToSend.append(key, value.toString());
      }
    });
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admission/register`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Response:', response.data.data.id, response.data.data.email );
      // Going to the success page
      navigate(`/admission-success?id=${response.data.data.id}&email=${formData.email}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= num ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}>
            {num === 1 && <User size={20} />}
            {num === 2 && <BookOpen size={20} />}
            {num === 3 && <Phone size={20} />}
          </div>
          {num < 3 && (
            <div className={`w-20 h-1 ${step > num ? 'bg-primary' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-roboto font-medium text-dparacolor">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium font-roboto text-dparacolor">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className="block text-sm font-medium font-roboto text-dparacolor">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
        <div className=''>
          <label className="block text-sm font-medium font-roboto text-dparacolor">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={inputClassName}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-dparacolor font-roboto text-sm font-medium mb-2">Identification Type</label>
          <select
            name="identificationType"
            value={formData.identificationType}
            onChange={handleInputChange}
            className={inputClassName}
            required
          >
            <option value="" disabled>Select type</option>
            <option value="birth-certificate">Birth Certificate</option>
            <option value="passport">Passport</option>
            <option value="national-id">National ID</option>
            <option value="drivers-license">Driver's License</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-dparacolor font-roboto text-sm font-medium mb-2">Identification Number</label>
          <input
            type="text"
            name="identificationNumber"
            value={formData.identificationNumber}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className="block text-dparacolor font-roboto text-sm font-medium mb-2">Application Image</label>
          <input
            type="file"
            name="applicantImage"
            onChange={handleFileChange}
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label className="block text-dparacolor font-roboto text-sm font-medium mb-2">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className="block text-primary text-sm font-roboto font-medium mb-2">Do you have a personal computer?</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="haveComputer"
                value="YES"
                checked={formData.haveComputer === true}
                onChange={handleInputChange}
                className={`${checkboxClassName} rounded-full`}
                required
              />
              <span className="text-dparacolor text-sm">YES</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="haveComputer"
                value="NO"
                checked={formData.haveComputer === true}
                onChange={handleInputChange}
                className={`${checkboxClassName} rounded-full`}
                required
              />
              <span className="text-dparacolor text-sm">NO</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-primary text-sm font-medium mb-2">Desired Program</label>
          <select
            name="desiredProgram"
            value={formData.desiredProgram}
            onChange={handleInputChange}
            className={inputClassName}
            required
          >
            <option value="">Select a program</option>
            <option value="microsoft-365">MicroSoft 365</option>
            <option value="basic-computer">Basic to Computer</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="full-stack-development">Full Stack Development</option>
            <option value="ui-ux-design">UI-UX Design</option>
            <option value="cybersecurity">Cybersecurity</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 grid">
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className="block text-gray-700 font-roboto text-sm font-medium mb-2">Highest Level of Education Completed</label>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleInputChange}
            className={inputClassName}
          >
            <option value="" disabled>
              Select education type
            </option>
            <option value="High School">High School</option>
            <option value="Technical Certificate">Technical Certificate</option>
            <option value="Associate Degree">Associate Degree</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Name of Last Attended School/College/University</label>
          <input
            type="text"
            name="lastSchoolAttended"
            value={formData.lastSchoolAttended}
            onChange={handleInputChange}
            className={inputClassName}
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-5'>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Graduation Year</label>
          <input
            type="number"
            name="yearOfGraduation"
            value={formData.yearOfGraduation}
            onChange={handleInputChange}
            className={inputClassName}
          />
        </div>

        <div>
          <p className="block text-primary text-sm font-medium mb-2">Do you have a basic computer knowledge?</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="computerKnowledge"
                value="YES"
                checked={formData.computerKnowledge === "YES"}
                onChange={handleInputChange}
                className={`${checkboxClassName} rounded-full`}
              />
              <span className="text-gray-700 text-sm">YES</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="computerKnowledge"
                value="NO"
                checked={formData.computerKnowledge === "NO"}
                onChange={handleInputChange}
                className={`${checkboxClassName} rounded-full`}
              />
              <span className="text-gray-700 text-sm">NO</span>
            </label>
          </div>
        </div>
      </div>

      {/* Supporting Document  */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Personal Statement</label>
          <textarea
            name='personalStatement'
            value={formData.personalStatement}
            onChange={handleInputChange}
            rows={4}
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Community Impact</label>
          <textarea
            name='communityImpact'
            value={formData.communityImpact}
            onChange={handleInputChange}
            rows={4}
            className={inputClassName}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-roboto font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-roboto font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={inputClassName}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <h2 className="text-center mb-6">Emergency Contact Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium">Emergency Phone Number</label>
            <input
              type="tel"
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Emergency Person Address</label>
            <input
              type="text"
              name="emergencyPersonAddress"
              value={formData.emergencyPersonAddress}
              onChange={handleInputChange}
              className={inputClassName}
              required
            />
          </div>

          <div>
            <label className="block text-dparacolor text-sm font-medium my-2"><sup className='text-lg text-secondary'>*</sup>Relationship Type</label>
            <select
              name="relationshipType"
              value={formData.relationshipType}
              onChange={handleInputChange}
              className={inputClassName}
              required
            >
              <option value="" disabled>Select type</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="brother">Brother</option>
              <option value="sister">Sister</option>
              <option value="guardian">Guardian</option>
            </select>
          </div>
        </div>

        <section>
          <h2 className="mt-6 mb-4 text-center">Supporting Documents</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-dparacolor text-sm font-medium mb-2">Community Recommendation</label>
              <input
                type="file"
                name="communityRecommendationLetter"
                onChange={handleFileChange}
                className={inputClassName}
              />
            </div>
          </div>
        </section>

        <label className="flex items-center space-x-3 mt-8">
          <input
            type="checkbox"
            name="consented"
            checked={formData.consented}
            onChange={(e) => setFormData({ ...formData, consented: e.target.checked })}
            className={checkboxClassName}
            required
          />
          <span className="text-dparacolor text-sm font-medium">I hereby declare that the information provided in this application is accurate to the best of my knowledge. I understand that providing false information may result in the cancellation of my admission.</span>
            </label> 

      </div>
    </div>

  );

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl md:max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-noto font-bold text-primary">Admission Form</h2>
          <p className="mt-2 text-md font-roboto text-dparacolor">
            {step === 1 && "Step 1: Personal Information"}
            {step === 2 && "Step 2: Educational Background"}
            {step === 3 && "Step 3: Contact Information"}
          </p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center font-sans px-3 py-2 border border-secondary rounded-md shadow-sm text-sm font-medium text-secondary bg-white hover:bg-primary hover:border-none hover:text-white"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center font-sans px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto flex items-center font-sans px-4 py-2 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-primary hover:bg-primary/80"
              >
              {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    <ScrollToTopButton />
    </>
  );
}

export default AdmissionPage;