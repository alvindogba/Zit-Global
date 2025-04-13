import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const PaypalDonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const confirmSubscription = async () => {
      try {
        const subscriptionId = searchParams.get('subscription_id');
        const baToken = searchParams.get('ba_token');
        const token = searchParams.get('token');

        if (!subscriptionId) {
          throw new Error('Subscription ID not found in query parameters');
        }

        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/paypal/confirm-subscription`,
          { subscriptionId, baToken, token }
        );
      } catch (err) {
        console.error('Error confirming subscription:', err);
        setError('Unable to confirm your subscription.');
      } finally {
        setLoading(false);
      }
    };

    confirmSubscription();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/" className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-xl text-center">
        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Subscribing!</h1>
        <p className="text-gray-600 mb-6">
          Your support means a lot to us. We've received your subscription and a receipt has been sent to your email.
        </p>
        <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default PaypalDonationSuccess;
