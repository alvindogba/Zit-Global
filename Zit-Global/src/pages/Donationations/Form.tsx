import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface DonationFormData {
  donationType: 'one-time' | 'monthly';
  donationAmount: number;
  customAmount: string;
  currency: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  companyName?: string;
  hideName: boolean;
  paymentMethod: 'card';
}

const MultiStepDonationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DonationFormData>({
    donationType: 'one-time',
    donationAmount: 0,
    customAmount: '',
    currency: 'USD',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    },
    companyName: '',
    hideName: false,
    paymentMethod: 'card',
  });

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      toast.error('Stripe has not been initialized');
      return;
    }

    setLoading(true);

    try {
      // 1. Get card details
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // 2. Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // 3. Create payment intent
      const finalAmount = formData.customAmount ? 
        parseFloat(formData.customAmount) : 
        formData.donationAmount;

      const response = await axios.post('http://localhost:5000/api/donations/payment-intent', {
        amount: finalAmount,
        currency: formData.currency,
        paymentMethod: formData.paymentMethod,
        donationData: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          donationType: formData.donationType,
          phone: formData.phone,
          companyName: formData.companyName,
          hideFromPublic: formData.hideName,
          address: formData.address,
        },
      });

      const { clientSecret, donationId } = response.data;

      // 4. Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // 5. Check donation status
      const statusResponse = await axios.get(`http://localhost:5000/api/donations/status/${donationId}`);
      const donation = statusResponse.data;

      if (donation.paymentStatus === 'succeeded') {
        toast.success('Thank you for your donation!');
        navigate('/donation-success', {
          state: {
            receiptNumber: donation.receiptNumber,
            amount: donation.amount,
            currency: donation.currency,
            date: donation.createdAt
          }
        });
      } else {
        throw new Error('Payment was not successful. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          name="customAmount"
          value={formData.customAmount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter amount"
          min="1"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Card Details</label>
        <div className="p-3 border rounded">
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
              },
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full bg-blue-600 text-white p-3 rounded ${loading ? 'opacity-50' : ''}`}
      >
        {loading ? 'Processing...' : 'Donate'}
      </button>
    </form>
  );
};

export default MultiStepDonationForm;