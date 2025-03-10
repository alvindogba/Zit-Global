import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Type definitions
interface DonationData {
  donationType: 'one-time';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

interface PaymentIntentResponse {
  clientSecret: string;
  donationId: string;
}

interface DonationStatus {
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed';
  receiptNumber?: string;
}

// Environment variable validation
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
if (!STRIPE_PUBLIC_KEY) {
  throw new Error(
    'Missing Stripe public key. Please add VITE_STRIPE_PUBLIC_KEY to your .env file'
  );
}

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const TestDonationForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);

  // Check if Stripe is ready
  useEffect(() => {
    if (stripe && elements) {
      setStripeReady(true);
    }
  }, [stripe, elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripeReady) {
      setError('Payment system is not ready. Please try again.');
      return;
    }

    const card = elements?.getElement(CardElement);
    if (!card) {
      setError('Unable to find card element.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/donations/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 10, // Test amount: $10
          currency: 'USD',
          paymentMethod: 'Stripe',
          donationData: {
            donationType: 'one-time',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            phone: '1234567890',
            country: 'US',
            state: 'CA',
            city: 'Test City',
            zip: '12345',
          } as DonationData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const { clientSecret, donationId }: PaymentIntentResponse = await response.json();

      // Create payment method
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Confirm payment
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      setSuccess(true);

      // Start polling for status
      let attempts = 0;
      const maxAttempts = 30; // 1 minute with 2-second intervals
      const pollInterval = setInterval(async () => {
        attempts++;
        try {
          const statusResponse = await fetch(`/api/donations/status/${donationId}`);
          if (!statusResponse.ok) {
            throw new Error('Failed to fetch donation status');
          }

          const statusData: DonationStatus = await statusResponse.json();

          if (statusData.paymentStatus === 'completed') {
            clearInterval(pollInterval);
            window.location.href = `/donation-success?receipt=${statusData.receiptNumber}`;
          } else if (statusData.paymentStatus === 'failed') {
            clearInterval(pollInterval);
            throw new Error('Payment processing failed');
          }

          // Stop polling after max attempts
          if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            setError('Payment status check timed out. Please contact support.');
          }
        } catch (pollError) {
          clearInterval(pollInterval);
          setError((pollError as Error).message);
          setSuccess(false);
        }
      }, 2000);

    } catch (err) {
      setSuccess(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Test Donation ($10)</h2>
      {!stripeReady && (
        <div className="mb-4 text-yellow-600">
          Loading payment system...
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Details
          </label>
          <div className={`border rounded-md p-3 ${error ? 'border-red-500' : ''}`}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!stripeReady || loading}
          className={`w-full bg-primary text-white rounded-md py-2 px-4 transition-all duration-200 ${
            !stripeReady || loading 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-primary-dark hover:shadow-md'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : 'Pay $10'}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600 text-sm">
            Payment successful! Processing your donation...
          </p>
        </div>
      )}
    </div>
  );
};

const TestDonationPage: React.FC = () => (
  <Elements stripe={stripePromise}>
    <TestDonationForm />
  </Elements>
);

export default TestDonationPage;
