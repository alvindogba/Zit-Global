import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

interface LocationState {
  receiptNumber: string;
  amount: number;
  currency: string;
  date: string;
}

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Invalid Access
          </h2>
          <p className="text-gray-600 mb-6">
            This page can only be accessed after a successful donation.
          </p>
          <Link
            to="/donate"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Make a Donation
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(state.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: state.currency,
  }).format(state.amount);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thank You for Your Donation!
          </h1>
          <p className="text-gray-600">
            Your generous contribution will help make a difference.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Donation Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Receipt Number:</span>
                <span className="font-medium text-gray-800">{state.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-gray-800">{formattedAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-800">{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              What's Next?
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              <li>A receipt has been sent to your email</li>
              <li>Your donation will be processed within 24 hours</li>
              <li>You can track your donation status in your account</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex-1 py-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/donate"
              className="flex-1 py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Make Another Donation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
