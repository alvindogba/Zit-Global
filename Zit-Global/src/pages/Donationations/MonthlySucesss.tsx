import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

interface SubscriptionDetails {
  subscriptionId: string;
  status: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  amount: number;
  currency: string;
  interval: string;
  customerEmail: string;
  customerName: string;
  receiptNumber: string;
}

const MonthlySuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<SubscriptionDetails | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const receiptNumber = searchParams.get('receipt');

    if (!sessionId || !receiptNumber) {
      setError('Invalid session information');
      setLoading(false);
      return;
    }

    const fetchSubscriptionDetails = async () => {
      try {
        console.log('Fetching subscription details for session:', sessionId);
        // Make sure we're using the full backend URL
        const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        console.log('Using backend URL:', backendUrl);
        
        const response = await axios.get(`${backendUrl}/api/stripe/subscription-details/${sessionId}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        console.log('Received subscription details:', response.data);
        if (response.data && typeof response.data === 'object') {
          setDetails(response.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching subscription details:', err);
        setError('Failed to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionDetails();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Monthly Commitment!</h1>
          <p className="text-lg text-gray-600">Your subscription has been successfully set up.</p>
        </div>

        {loading ? (
          <div className="flex justify-center pt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 pt-6 text-center">{error}</div>
        ) : details && (
          <div className="border-t border-gray-200 pt-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Monthly Amount</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ${details.amount?.toFixed(2) || '0.00'} {details.currency?.toUpperCase()}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{details.customerEmail}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{details.status}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Receipt Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{details.receiptNumber}</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            A confirmation email has been sent to your email address with the receipt details.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default MonthlySuccess;
