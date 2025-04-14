import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import donor from '../../asset/images/Donors.jpg'
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoIosHeart } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCard } from "react-icons/io5";
import paypalImg from '../../asset/images/paypal.png'

// Stripe imports
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// PayPal imports
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// Import your US states list
import { US_STATES, COUNTRIES, CA_PROVINCES } from "../../utils/states"
// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface DonorInfoType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  country: string;
};

const initialDonorInfo: DonorInfoType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  state: "",
  country: "US"
};

const DonationMultiStepForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [giftType, setGiftType] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState(50);
  const [otherAmount, setOtherAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "paypal" | "">("");
  const [donorInfo, setDonorInfo] = useState<DonorInfoType>(initialDonorInfo);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (amount <= 0) errors.amount = "Amount must be greater than 0";
      if (amount > 500000) errors.amount = "Amount cannot exceed $50,000";
      if (!giftType) errors.giftType = "Please select a gift type";
    }
    if (step === 3) {
      if (!donorInfo.email) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(donorInfo.email))
        errors.email = "Invalid email format";
    }
    if (step === 2) {
      if (!selectedPaymentMethod) errors.paymentMethod = "Please select a payment method";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(currentStep)) {
      return;
    }
    setError("");
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleOtherAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "" || (Number(value) > 0 && Number(value) <= 50000)) {
      setOtherAmount(value);
      if (value !== "") {
        setAmount(Number(value));
        // Clear amount error when valid amount is entered
        if (formErrors.amount) {
          setFormErrors(prev => ({ ...prev, amount: "" }));
        }
      }
    }
  };

  // One-time payment submission for Card payments
  const handleStripeSubmit = async () => {
    if (!stripe || !elements) {
      setError("Stripe has not been initialized");
      return;
    }
    setProcessing(true);
    setError("");
    try {
      const { data: { clientSecret } } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-payment-intent`,
        { amount: amount } // Amount in cents
      );
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) throw new Error("Card element not found");
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${donorInfo.firstName} ${donorInfo.lastName}`,
            email: donorInfo.email,
            address: {
              state: donorInfo.state,
              country: donorInfo.country
            }
          }
        }
      });
      if (stripeError) throw stripeError;
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/stripe/save-donation`,
        {
          ...donorInfo,
          amount,
          paymentMethod: "card",
          transactionId: paymentIntent!.id,
          giftType
        }
      );
      navigate(`/success?transactionId=${paymentIntent!.id}&email=${donorInfo.email}`);
    } catch (err) {
      console.error("Stripe payment failed:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setProcessing(false);
    }
  };
  // Subscription submission for recurring donations via Stripe Checkout
  const handleStripeSubscription = async () => {
    if (!stripe) {
      setError("Stripe has not been initialized");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // Get donation amount from your form state
      const amountInCents = Number(amount) * 100; // Convert dollars to cents
      const interval = "month"; // Get this from your form's frequency selector

      // Call backend to create dynamic price and session
      const { data: { sessionId } } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/stripe/create-subscription-session`,
        {
          email: donorInfo.email,
          amount: amountInCents,
          currency: 'usd', // Add currency selector if needed
          interval: interval
        }
      );

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId});
      if (error) throw error;

    } catch (err) {
      console.error("Stripe subscription failed:", err);
      setError(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setProcessing(false);
    }
  };

  // PayPal payment 
  const handlePaypalSubscription = async () => {
    setProcessing(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/paypal/create-Paypalsubscription`,
        {
          amount,
          currency: "USD",
          donorInfo,
          giftType,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create PayPal subscription");
      }

      console.log(response.data);
      console.log("Subscription ID:", response.data.id);
      console.log("Subscriber Email:", response.data.subscriber.email_address);

      // Find the approval URL from the response links array.
      const approveLink = response.data.links.find((link: { rel: string; href: string }) => link.rel === 'approve');
      if (approveLink && approveLink.href) {
        // Redirect the user to the PayPal approval page.
        window.location.href = approveLink.href;
      } else {
        throw new Error("Approval link not found in the PayPal subscription response.");
      }
    } catch (error) {
      console.error("PayPal subscription failed:", error);
      setError(error instanceof Error ? error.message : "Subscription failed");
    } finally {
      setProcessing(false);
    }
  };


  const handlePayPalSuccess = async (transactionId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/paypal/save-donation`,
        {
          ...donorInfo,
          amount,
          paymentMethod: "paypal",
          transactionId,
          giftType
        }
      );
      navigate(`/success?transactionId=${transactionId}&email=${encodeURIComponent(donorInfo.email)}`);
    } catch (err) {
      console.error("PayPal payment failed:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.1), rgba(0, 0, 84, 0.1)), url(${donor})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in",
      }}
    >
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-40 py-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-8 flex flex-col lg:flex-row gap-8">
          {/* Left Side: Visual/Image */}
          <div className="text-primary xl:mx-6 space-y-3 lg:space-y-6 w-full lg:w-1/2">
            <h3 className="font-noto text-primary text-xl sm:text-2xl font-bold text-center lg:text-left">
              Empower Change, One Gift at a Time
            </h3>
            <p className="font-roboto text-sm text-dparacolor text-left lg:text-left">
              Your donation today fuels opportunity, connects talent, and transforms lives.
            </p>
            <hr />
            <p className="font-roboto text-sm text-dparacolor text-left lg:text-left">
              At the Zongea Institute of Technology, we believe education should break barriers—not just for a few,
              but for all. The Impact and Connect Center (ICC) bridges the gap between learning and real-world impact
              by providing students with mentorship, tools, and a platform to launch their careers. But we can’t do it alone.
            </p>
            <ul className="text-dparacolor">
              <li className="text-primary font-semibold text-md">
                With your support, we can:
                <ul className="text-dparacolor font-normal space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2 text-2xl text-secondary">•</span>
                    Sponsor scholarships for underserved students.
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-2xl text-secondary">•</span>
                    Fund cutting-edge technology.
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-2xl text-secondary">•</span>
                    Expand mentorship programs with industry leaders.
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-2xl text-secondary">•</span>
                    Drive community projects that solve local and global challenges
                  </li>
                </ul>
              </li>
            </ul>
            <hr />
            <h5 className="text-primary font-semibold text-md">
              Every gift, big or small, makes a difference.
            </h5>
            <div className="flex space-x-2 justify-center items-end h-32">
              <RiSecurePaymentFill size={24} className="text-dparacolor" />
              <p className="font-roboto text-sm text-dparacolor">
                Secured Donation
              </p>
            </div>
          </div>

          {/* Right Side: Multi-Step Form */}
          <div className="lg:border-l border-gray-200 bg-white p-4 sm:p-6 w-full lg:w-1/2">
            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
              {Array.from({ length: totalSteps }, (_, index) => {
                const stepNum = index + 1;
                return (
                  <div key={stepNum} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= stepNum ? "bg-primary text-white" : "bg-gray-200"
                        }`}
                    >
                      {stepNum}
                    </div>
                    {stepNum < totalSteps && (
                      <div
                        className={`w-16 h-1 ${currentStep > stepNum ? "bg-primary" : "bg-gray-200"
                          }`}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={nextStep}>
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
                >
                  {/* Step 1: Donation Details */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">
                      Choose Your Donation
                    </h2>
                    <div className="flex gap-4 mb-6 flex-col sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setGiftType("one-time")}
                        className={`w-full py-3 rounded-lg font-medium transition-colors ${giftType === "one-time" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        One-time
                      </button>
                      <button
                        type="button"
                        onClick={() => setGiftType("monthly")}
                        className={`w-full py-3 rounded-lg font-medium flex justify-center items-center gap-3 transition-colors ${giftType === "monthly" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        <IoIosHeart />Monthly
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-6">
                      {/* Donation Amount Buttons */}
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            setAmount(250);
                            setOtherAmount("");
                            setFormErrors({ ...formErrors, amount: "" });
                          }}
                          className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 250 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          $250
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            setAmount(100);
                            setOtherAmount("");
                            setFormErrors({ ...formErrors, amount: "" });
                          }}
                          className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 100 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          $100
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            setAmount(50);
                            setOtherAmount("");
                            setFormErrors({ ...formErrors, amount: "" });
                          }}
                          className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 50 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          $50
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button
                          type="button"
                          onClick={() => {
                            setAmount(25);
                            setOtherAmount("");
                            setFormErrors({ ...formErrors, amount: "" });
                          }}
                          className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 25 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                          $25
                        </button>
                      </div>
                      <div className="col-span-1"></div>
                      <div className="col-span-2 sm:col-span-3">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="text"
                            placeholder="Custom Amount"
                            value={otherAmount}
                            onChange={handleOtherAmountChange}
                            className={`w-full p-2 pl-8 border rounded-lg ${formErrors.amount ? "border-red-500" : "border-gray-300"
                              }`}
                          />
                        </div>
                        {formErrors.amount && (
                          <p className="text-xs text-red-500">{formErrors.amount}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-3 py-2 bg-secondary flex items-center gap-2 text-white rounded-lg"
                      >
                        Next <FaArrowRightLong />
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Payment Method Selection */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">
                      Choose Payment Method
                    </h2>
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => {
                          nextStep();
                          setSelectedPaymentMethod("card");
                          setFormErrors((prev) => ({ ...prev, paymentMethod: "" }));
                        }}
                        className={`w-full py-2 rounded-lg font-medium transition-colors flex justify-center items-center gap-2 ${selectedPaymentMethod === "card" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        <IoCard size={30} />Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          nextStep();
                          setSelectedPaymentMethod("paypal");
                          setFormErrors((prev) => ({ ...prev, paymentMethod: "" }));
                        }}
                        className={`w-full py-2 flex justify-center items-center rounded-lg font-medium transition-colors ${selectedPaymentMethod === "paypal" ? "bg-primary/10 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        <img src={paypalImg} className="h-6" />
                      </button>
                    </div>
                    {formErrors.paymentMethod && (
                      <p className="text-xs text-red-500 text-center mb-4">
                        {formErrors.paymentMethod}
                      </p>
                    )}
                    <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">
                      Back
                    </button>
                  </div>

                  {/* Step 3: Donor & Billing Information */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">
                      Donor & Billing Information
                    </h2>
                    <div className="space-y-2">
                      <div>
                        <input
                          placeholder="First Name *"
                          value={donorInfo.firstName}
                          onChange={handleDonorInfoChange}
                          name="firstName"
                          className={`${giftType !== "one-time" ? "hidden" : "w-full p-2 border rounded-lg"} ${formErrors.firstName ? "border-red-500" : "border-gray-300"}`}
                          />
                        {formErrors.firstName && <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>}
                      </div>
                      <div>
                        <input
                          placeholder="Last Name *"
                          value={donorInfo.lastName}
                          onChange={handleDonorInfoChange}
                          name="lastName"
                          className={`${giftType !== "one-time" ? "hidden" : "w-full p-2 border rounded-lg "} ${formErrors.lastName ? "border-red-500" : "border-gray-300"}`}
                        />
                        {formErrors.lastName && <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email *"
                          value={donorInfo.email}
                          onChange={handleDonorInfoChange}
                          name="email"
                          className={`w-full p-2 border rounded-lg ${formErrors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                      </div>
                      <div>
                        <input
                          placeholder="Phone *"
                          value={donorInfo.phone}
                          onChange={handleDonorInfoChange}
                          name="phone"
                          className={`${giftType !== "one-time" ? "hidden" :  "w-full p-2 border rounded-lg"} ${formErrors.phone ? "border-red-500" : "border-gray-300"}`}
                        />
                        {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                        <div>
                          {donorInfo.country === "US" ? (
                            <select
                              value={donorInfo.state}
                              onChange={handleDonorInfoChange}
                              name="state"
                              className={`${giftType !== 'one-time' ? "hidden" : "w-full p-2 border rounded-lg bg-white"} ${formErrors.state ? "border-red-500" : "border-gray-300"}`}
                            >
                              <option value="">State *</option>
                              {US_STATES.map((state) => (
                                <option key={state.code} value={state.code}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          ) : donorInfo.country === "CA" ? (
                            <select
                              value={donorInfo.state}
                              onChange={handleDonorInfoChange}
                              name="state"
                              className={`${giftType !== "one-time" ? "hidden" : "w-full p-2 border rounded-lg bg-white"} ${formErrors.state ? "border-red-500" : "border-gray-300"}`}
                            >
                              <option value="">Province *</option>
                              {CA_PROVINCES.map((prov) => (
                                <option key={prov.code} value={prov.code}>
                                  {prov.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              placeholder="Region *"
                              value={donorInfo.state}
                              onChange={handleDonorInfoChange}
                              name="state"
                              className={`${giftType !== "one-time" ? "hidden" :  "w-full p-2 border rounded-lg"} ${formErrors.state ? "border-red-500" : "border-gray-300"}`}
                            />
                          )}
                          {formErrors.state && <p className="text-xs text-red-500 mt-1">{formErrors.state}</p>}
                        </div>
                      </div>

                      <div>
                        <select
                          value={donorInfo.country}
                          onChange={handleDonorInfoChange}
                          name="country"
                          className={`${giftType !== "one-time" ? "hidden": "w-full p-2 border rounded-lg bg-white"} ${formErrors.country ? "border-red-500" : "border-gray-300"
                            }`}
                        >
                          <option value="">Country *</option>
                          {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        {formErrors.country && <p className="text-xs text-red-500 mt-1">{formErrors.country}</p>}
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">
                        Back
                      </button>
                      <button type="button" onClick={nextStep} className="px-3 py-2 bg-secondary flex items-center gap-2 text-white rounded-lg">
                        Next <FaArrowRightLong />
                      </button>
                    </div>
                  </div>

                  {/* Step 4: Payment Details */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">Payment</h2>
                    {selectedPaymentMethod === "card" ? (
                      <div>
                        <p className="mb-4 text-center">
                          {giftType === "one-time"
                            ? "Enter your card details for a one-time donation."
                            : "Proceed to Zongea Monthly Donation Checkout Page."}
                        </p>
                        <div className={`${giftType === "one-time" ? "mb-4" : "hidden"}`}>
                          <label className="block mb-2 text-sm font-medium">Card Number *</label>
                          <CardNumberElement
                            id="card-number"
                            className="p-2 border rounded-lg"
                            options={{
                              style: {
                                base: {
                                  fontSize: "16px",
                                  color: "#424770",
                                  "::placeholder": { color: "#aab7c4" },
                                },
                                invalid: { color: "#9e2146" },
                              },
                            }}
                          />
                        </div>
                        <div className={`${giftType === "one-time" ? "grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4" : "hidden"}`}>
                          <div className="">
                            <label className="block mb-2 text-sm font-medium">Expiry *</label>
                            <CardExpiryElement
                              className="p-2 border rounded-lg"
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": { color: "#aab7c4" },
                                  },
                                  invalid: { color: "#9e2146" },
                                },
                              }}
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium">CVC *</label>
                            <CardCvcElement
                              className="p-2 border rounded-lg"
                              options={{
                                style: {
                                  base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": { color: "#aab7c4" },
                                  },
                                  invalid: { color: "#9e2146" },
                                },
                              }}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={
                            giftType === "one-time" ? handleStripeSubmit : handleStripeSubscription
                          }
                          disabled={processing}
                          className={`px-4 py-2 rounded-lg text-white transition-colors w-full ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/80"
                            }`}
                        >
                          {processing
                            ? "Processing..."
                            : giftType === "one-time"
                              ? "Submit Donation"
                              : "Subscribe Monthly"}
                        </button>
                        <div className="flex justify-start mt-4">
                          <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">
                            Back
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-4 text-center">
                          {giftType === "one-time"
                            ? "Complete your donation using PayPal."
                            : "Subscribe monthly using PayPal."}
                        </p>
                        {/* Remove nested PayPalScriptProvider here */}
                        {giftType === "one-time" ? (
                          <div className="flex flex-col gap-4">
                            <PayPalButtons
                              forceReRender={[amount]}
                              fundingSource="paypal"
                              style={{ layout: "vertical" }}
                              createOrder={(_data, actions) => {
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [
                                    { amount: { currency_code: "USD", value: amount.toString() } },
                                  ],
                                });
                              }}
                              onApprove={(_data, actions) => {
                                if (!actions.order) {
                                  setError("PayPal order actions are undefined.");
                                  return Promise.reject(new Error("PayPal order actions are undefined."));
                                }
                                return actions.order
                                  .capture()
                                  .then(() => handlePayPalSuccess(_data.orderID))
                                  .catch((err) => {
                                    setError(
                                      "PayPal payment failed: " +
                                      (err instanceof Error ? err.message : "Unknown error")
                                    );
                                    return Promise.reject(err);
                                  });
                              }}
                              onError={(err) => {
                                setError(
                                  "PayPal payment failed: " +
                                  (err instanceof Error ? err.message : "Unknown error")
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <button
                              type="button"
                              onClick={handlePaypalSubscription}
                              disabled={processing}
                              className={`px-4 py-2 rounded-lg text-white transition-colors w-full ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/80"
                                }`}
                            >
                              {processing
                                ? "Processing..."
                                : "Subscribe Monthly with Paypal"}
                            </button>
                          </div>
                        )}
                        <div className="flex justify-start mt-4">
                          <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">
                            Back
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const DonationPage = () => (
  <Elements stripe={stripePromise}>
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "your-paypal-client-id",
        currency: "USD",
        vault: true
      }}
    >
      <DonationMultiStepForm />
      <ScrollToTopButton />
    </PayPalScriptProvider>
  </Elements>
);

export default DonationPage;