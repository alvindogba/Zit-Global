import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DonationDetails from './DonationDetail';
import PaymentStep from './PaymentSetup';
import ReviewAndSubmit from './ReviewAndSubmit';
import NewStep from "./NewStep";
import StepIndicator from './StepIndicator';

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface Subscription {
  interval: 'month' | 'year';
  interval_count: number;
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
  billing_address?: Address;
  companyName?: string;
  hideName: boolean;
  paymentMethod: 'PayPal' | 'Stripe';
  subscription?: Subscription;
}

const MAX_STATUS_CHECKS = 10;
const STATUS_CHECK_INTERVAL = 2000; // 2 seconds

const MultiStepDonationForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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
    paymentMethod: 'Stripe',
  });

  const [loading, setLoading] = useState(false);
  const [donationId, setDonationId] = useState<string | null>(null);
  const [statusCheckAttempts, setStatusCheckAttempts] = useState(0);

  const stripe = useStripe();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (name === 'customAmount' && value !== '') {
      setFormData((prev) => ({
        ...prev,
        customAmount: value,
        donationAmount: 0,
      }));
    } else if (name === 'donationAmount' && value !== '0') {
      setFormData((prev) => ({
        ...prev,
        donationAmount: Number(value),
        customAmount: '',
      }));
    } else if (name === 'donationType' && value === 'monthly') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        subscription: {
          interval: 'month',
          interval_count: 1,
        },
      }));
    } else if (name === 'donationType' && value === 'one-time') {
      setFormData((prev) => {
        const { subscription, ...rest } = prev;
        return { ...rest, donationType: value };
      });
    } else if (name.startsWith('address.') || name.startsWith('billing_address.')) {
      const [parent, field] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof DonationFormData] as Address),
          [field]: value,
        },
      }));
    } else if (name === 'paymentMethod') {
      setFormData((prev) => ({
        ...prev,
        paymentMethod: value as 'Stripe' | 'PayPal',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const getFinalAmount = () => {
    const finalAmount = formData.customAmount ? parseFloat(formData.customAmount) : formData.donationAmount;
    return finalAmount;
  };

  const checkDonationStatus = async (id: string) => {
    if (statusCheckAttempts >= MAX_STATUS_CHECKS) {
      toast.error('Payment status check timed out. Please contact support.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/donations/status/${id}`, {
        timeout: 5000 // 5 second timeout
      });
      
      const data = response.data;

      if (data.paymentStatus === 'completed') {
        toast.success('Payment completed successfully!');
        navigate('/donation-success', { 
          state: { 
            receiptNumber: data.receiptNumber,
            amount: data.amount,
            currency: data.currency,
            date: data.createdAt
          } 
        });
        setLoading(false);
      } else if (data.paymentStatus === 'failed') {
        toast.error(data.errorDetails?.message || 'Payment failed. Please try again.');
        setStep(4); // Return to payment step
        setLoading(false);
      } else {
        // Payment still processing, check again
        setStatusCheckAttempts(prev => prev + 1);
        setTimeout(() => checkDonationStatus(id), STATUS_CHECK_INTERVAL);
      }
    } catch (error) {
      console.error('Error checking donation status:', error);
      if (statusCheckAttempts < MAX_STATUS_CHECKS) {
        setStatusCheckAttempts(prev => prev + 1);
        setTimeout(() => checkDonationStatus(id), STATUS_CHECK_INTERVAL);
      } else {
        toast.error('Unable to confirm payment status. Please contact support.');
        setLoading(false);
      }
    }
  };

  const handlePayment = async (paymentMethodId?: string) => {
    setLoading(true);
    setStatusCheckAttempts(0);

    try {
      const finalAmount = getFinalAmount();
      if (!finalAmount || finalAmount <= 0) {
        toast.error('Please enter a valid amount');
        setLoading(false);
        return;
      }

      if (finalAmount > 50000) {
        toast.error('Maximum donation amount exceeded');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/donations/payment-intent', {
        amount: finalAmount,
        currency: formData.currency,
        paymentMethod: formData.paymentMethod,
        donationData: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          donationType: formData.donationType,
          subscription: formData.subscription,
          address: formData.address,
          phone: formData.phone,
          companyName: formData.companyName,
          hideFromPublic: formData.hideName
        },
      });

      const { clientSecret, donationId } = response.data;
      setDonationId(donationId);

      if (formData.paymentMethod === 'Stripe' && stripe && paymentMethodId) {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodId,
        });
        
        if (result.error) {
          toast.error(result.error.message || 'Payment failed');
          setLoading(false);
        } else {
          // Start checking donation status
          checkDonationStatus(donationId);
        }
      } else if (formData.paymentMethod === 'PayPal') {
        // PayPal payment is handled by the PayPal SDK
        const { approvalUrl } = response.data;
        if (approvalUrl) {
          window.location.href = approvalUrl;
        } else {
          throw new Error('PayPal approval URL not received');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  // Clear status check attempts when unmounting
  useEffect(() => {
    return () => {
      setStatusCheckAttempts(0);
    };
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <DonationDetails
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <NewStep
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ReviewAndSubmit
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <PaymentStep
            formData={formData}
            handlePayment={handlePayment}
            prevStep={prevStep}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[80%] mx-auto p-6 bg-white rounded-md text-left space-y-6">
      <StepIndicator currentStep={step} totalSteps={4} />
      {renderStep()}
    </div>
  );
};

export default MultiStepDonationForm;