import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [donationDetails, setDonationDetails] = useState<any>(null);

  useEffect(() => {
    const checkDonationStatus = async () => {
      try {
        const paymentIntentId = searchParams.get('payment_intent');
        const donationId = searchParams.get('donation_id');

        if (!paymentIntentId && !donationId) {
          throw new Error('No payment information found');
        }

        const response = await axios.get(`http://localhost:5000/api/donations/status/${donationId || paymentIntentId}`);
        setDonationDetails(response.data);
        setStatus('success');
      } catch (error) {
        console.error('Error checking donation status:', error);
        setStatus('error');
      }
    };

    checkDonationStatus();
  }, [searchParams]);

  const handleReturnHome = () => {
    navigate('/');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-8">We couldn't verify your donation. Please contact support.</p>
          <button
            onClick={handleReturnHome}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8">
            Your donation of ${donationDetails?.amount} has been successfully processed.
            {donationDetails?.receiptNumber && (
              <span className="block mt-2">
                Receipt Number: {donationDetails.receiptNumber}
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation email has been sent to your email address.
          </p>
          <button
            onClick={handleReturnHome}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
