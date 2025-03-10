import React from 'react';

interface ReviewAndSubmitProps {
  formData: any;
  prevStep: () => void;
  nextStep: () => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ formData, prevStep, nextStep, }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800">Step 3: Review & Submit</h2>
      <p><strong>Donation Type:</strong> {formData.donationType}</p>
      <p><strong>Amount:</strong> {formData.donationAmount} {formData.currency}</p>
      <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <div className='flex justify-between'>
         <button className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500" onClick={prevStep}>Back</button>
      <button className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 ml-4" onClick={nextStep}>Proceed To Payment</button>
      </div>
     
    </div>
  );
};

export default ReviewAndSubmit;