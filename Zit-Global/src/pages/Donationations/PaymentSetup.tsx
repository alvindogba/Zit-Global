import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PaymentStepProps {
  formData: {
    donationType: 'one-time' | 'monthly';
    donationAmount: number;
    customAmount: string;
    currency: string;
    firstName: string;
    lastName: string;
    email: string;
    subscription?: {
      interval: 'month' | 'year';
      interval_count: number;
    };
  };
  prevStep: () => void;
  handlePayment: (paymentMethodId?: string) => Promise<void>;
  loading: boolean;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ formData, prevStep, handlePayment, loading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'Stripe' | 'PayPal'>('Stripe');

  // Get the final amount from either donationAmount or customAmount
  const getFinalAmount = () => {
    if (formData.customAmount && parseFloat(formData.customAmount) > 0) {
      return parseFloat(formData.customAmount);
    }
    return formData.donationAmount;
  };

  const validateAmount = () => {
    const amount = getFinalAmount();
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (amount > 50000) { // $50,000 limit
      setError('Maximum donation amount exceeded');
      return false;
    }
    return true;
  };

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError('Payment system not initialized');
      return;
    }

    if (!validateAmount()) return;

    setIsProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        return;
      }

      if (!paymentMethod) {
        setError('Failed to create payment method');
        return;
      }

      await handlePayment(paymentMethod.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    },
    hidePostalCode: true
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Secure Payment</h2>
      
      {/* Amount Display */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-lg font-medium text-gray-700">
          {formData.donationType === 'monthly' ? 'Monthly' : 'One-time'} Donation: 
          {' '}{formData.currency} {getFinalAmount().toFixed(2)}
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setSelectedMethod('Stripe')}
            className={`flex-1 py-3 px-4 rounded-lg border ${
              selectedMethod === 'Stripe'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => setSelectedMethod('PayPal')}
            className={`flex-1 py-3 px-4 rounded-lg border ${
              selectedMethod === 'PayPal'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-700'
            }`}
          >
            PayPal
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Stripe Payment Form */}
      {selectedMethod === 'Stripe' && (
        <form onSubmit={handleStripePayment} className="space-y-4">
          <div className="p-4 border rounded-lg">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isProcessing}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isProcessing || !stripe}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      )}

      {/* PayPal Payment */}
      {selectedMethod === 'PayPal' && (
        <div className="space-y-4">
          <PayPalButtons
            style={{ layout: "vertical" }}
            disabled={loading || isProcessing}
            createOrder={async () => {
              if (!validateAmount()) {
                throw new Error('Invalid amount');
              }
              setIsProcessing(true);
              try {
                await handlePayment();
                return 'placeholder'; // The actual order ID will be created by the backend
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to create PayPal order');
                throw err;
              } finally {
                setIsProcessing(false);
              }
            }}
            onError={(err) => {
              console.error('PayPal error:', err);
              setError('PayPal payment failed. Please try again.');
            }}
          />
          <button
            type="button"
            onClick={prevStep}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isProcessing}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentStep;
