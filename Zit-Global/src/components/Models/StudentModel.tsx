import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(true);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <div className={`fixed inset-0 bg-primary bg-opacity-90 backdrop-blur-md z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}>
      <div className=" border border-1 border-gray-200 bg-white rounded-lg p-6 w-[55vw] h-[80vh] max-w-4xl overflow-hidden flex flex-col">
        <StepIndicator currentStep={currentStep} />
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300" 
                 style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>
              {/* Step 1 */}
              <div className="min-w-full p-4">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Date of Birth (MM/DD/YYYY)" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                    <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Prefer not to say']} required />
                  </div>
                  <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              {/* Step 2 */}
              <div className="min-w-full p-4">
                <h2 className="text-2xl font-bold mb-6">Academic Details</h2>
                <div className="space-y-4">
                  <InputField label="Current School Name" name="schoolName" value={formData.schoolName} onChange={handleChange} required />
                  <SelectField label="Grade Level" name="gradeLevel" value={formData.gradeLevel} onChange={handleChange} 
                             options={['7th', '8th', '9th', '10th', '11th', '12th', 'University']} required />
                  <CheckboxGroup 
                    label="Subjects of Interest"
                    options={['Math', 'Science', 'English', 'Computer Science']}
                    selected={formData.subjects}
                    onChange={handleCheckboxChange}
                  />
                  <SelectField label="Preferred Learning Style" name="learningStyle" value={formData.learningStyle} 
                              onChange={handleChange} options={['One-on-One', 'Group Learning', 'Online', 'In-Person']} required />
                </div>
              </div>

              {/* Step 3 */}
              <div className="min-w-full p-4">
                <h2 className="text-2xl font-bold mb-6">Goals and Preferences</h2>
                <div className="space-y-4">
                  <TextAreaField label="Tutoring Needs" name="tutoringNeeds" value={formData.tutoringNeeds} onChange={handleChange} required />
                  <TextAreaField label="Learning Objectives" name="objectives" value={formData.objectives} onChange={handleChange} required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField label="Availability" name="availability" value={formData.availability} 
                                 onChange={handleChange} options={['Morning', 'Afternoon', 'Evening']} required />
                    <SelectField label="Preferred Tutor Type" name="tutorType" value={formData.tutorType} 
                                 onChange={handleChange} options={['Professional Tutor', 'Peer Tutor', 'No Preference']} required />
                  </div>
                  <SelectField label="How did you hear about us?" name="referral" value={formData.referral} 
                             onChange={handleChange} options={['Website', 'Friend', 'Social Media', 'Other']} required />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button type="button" onClick={() => setCurrentStep(prev => prev - 1)} 
                        className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                  Back
                </button>
              )}
              <div className="flex-1" />
              {currentStep < 3 ? (
                <button type="button" onClick={() => setCurrentStep(prev => prev + 1)} 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Next
                </button>
              ) : (
                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Step Indicator Component
const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex justify-center mb-8">
    {[1, 2, 3].map(step => (
      <div key={step} className="flex items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
          ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          {step}
        </div>
        {step < 3 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
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
    <input {...props} className="input input-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500" />
  </div>
);

const SelectField = ({ label, options, ...props }: any) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <select {...props} className="select select-bordered w-full rounded-lg focus:ring-2 focus:ring-blue-500">
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
            className="checkbox checkbox-sm rounded border-gray-300 focus:ring-blue-500" 
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
    <textarea {...props} className="textarea textarea-bordered h-24 w-full rounded-lg focus:ring-2 focus:ring-blue-500" />
  </div>
);