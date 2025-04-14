import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

interface DonationDetails {
  email: string;
  amount: number;
  interval: string;
  createdAt: string;
  subscriptionId: string;
}

const StripMonthlyDonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState<DonationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const sessionId = searchParams.get('sessionId');
        if (!sessionId) {
          throw new Error('Session ID not found');
        }

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/stripe/get-subscription-success/${sessionId}`
        );

        setDonation(data);
      } catch (err) {
        console.error('Error fetching subscription details:', err);
        setError('Unable to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !donation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to load subscription details'}</p>
          <Link
            to="/"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold font-noto text-gray-900 mb-2">Thank You for Subscribing!</h1>
            <p className="text-gray-600 font-roboto">
              Your recurring donation will help make a lasting difference.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-noto font-medium text-gray-900 mb-2">Subscription Details</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-roboto">Amount</span>
                    <span className="text-gray-900 font-roboto font-medium">
                      ${donation.amount} / {donation.interval}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-roboto">Start Date</span>
                    <span className="text-gray-900 font-roboto font-medium">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-roboto">Subscription ID</span>
                    <span className="text-gray-900 font-medium font-roboto">
                      {donation.subscriptionId}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 font-noto mb-2">Manage Your Subscription</h3>
                <p className="text-gray-600 font-roboto mb-4">
                  You can manage your subscription at any time from your account dashboard.
                </p>
              </div>

              <div className="text-center pt-6">
                <Link
                  to="/"
                  className="inline-block bg-primary font-sans text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripMonthlyDonationSuccess;
