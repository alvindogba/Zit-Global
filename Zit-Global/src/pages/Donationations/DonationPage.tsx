import { useState, FormEvent } from "react";
import { Elements, useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import axios from "axios";
import { US_STATES } from '../../utils/states';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const initialDonorInfo: DonorInfo = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: ""
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [giftType, setGiftType] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState(50);
  const [otherAmount, setOtherAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState<DonorInfo>(initialDonorInfo);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!donorInfo.firstName) errors.firstName = "First name is required";
    if (!donorInfo.lastName) errors.lastName = "Last name is required";
    if (!donorInfo.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(donorInfo.email)) errors.email = "Invalid email format";
    if (!donorInfo.address) errors.address = "Address is required";
    if (!donorInfo.city) errors.city = "City is required";
    if (!donorInfo.state) errors.state = "State is required";
    if (!donorInfo.zip) errors.zip = "ZIP code is required";
    else if (!/^\d{5}(-\d{4})?$/.test(donorInfo.zip)) errors.zip = "Invalid ZIP code format";

    if (amount <= 0) errors.amount = "Amount must be greater than 0";
    if (amount > 10000) errors.amount = "Amount cannot exceed $10,000";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStripeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError("Stripe has not been initialized");
      return;
    }

    if (!validateForm()) {
      setError("Please correct the form errors");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const { data: { clientSecret } } = await axios.post(
        "http://localhost:5000/api/stripe/create-payment-intent",
        { amount: amount * 100 }
      );

      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${donorInfo.firstName} ${donorInfo.lastName}`,
              email: donorInfo.email,
              address: {
                line1: donorInfo.address,
                city: donorInfo.city,
                state: donorInfo.state,
                postal_code: donorInfo.zip
              }
            }
          }
        }
      );

      if (stripeError) throw stripeError;

      await axios.post("http://localhost:5000/api/stripe/save-donation", {
        ...donorInfo,
        amount,
        paymentMethod: "stripe",
        transactionId: paymentIntent!.id,
        giftType
      });

      navigate(`/success?transactionId=${paymentIntent!.id}&email=${donorInfo.email}`);
    } catch (err) {
      console.error("Payment failed:", err);
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  // Handle Paypal Payment
  const handlePayPalSuccess = async (transactionId: string) => {
    try {
      if (!donorInfo || !donorInfo.email || !donorInfo.firstName || !donorInfo.lastName || !donorInfo.address || !donorInfo.city || !donorInfo.state || !donorInfo.zip) {
        setError("Donor information is missing.");
        return;
      }
  
      await axios.post("http://localhost:5000/api/paypal/save-donation", {
        ...donorInfo,
        amount,
        paymentMethod: "paypal",
        transactionId,
        giftType,
      });
  
      navigate(`/success?transactionId=${transactionId}&email=${encodeURIComponent(donorInfo.email)}`);
    } catch (err) {
      console.error("Failed to save PayPal donation:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to process PayPal payment");
    }
  };

  const handleOtherAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "" || (Number(value) > 0 && Number(value) <= 10000)) {
      setOtherAmount(value);
      if (value !== "") {
        setAmount(Number(value));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Big Brothers Big Sisters of America
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              IT TAKES <span className="text-green-500">LITTLE</span> TO BE{" "}
              <span className="text-green-500">BIG</span>
            </h2>
            <p className="text-gray-600">Mentoring is More Important Than Ever.</p>
          </div>

          <div className="mb-8">
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setGiftType("one-time")}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  giftType === "one-time"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                One-time Gift
              </button>
              <button
                type="button"
                onClick={() => setGiftType("monthly")}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                  giftType === "monthly"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Monthly Gift
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[250, 125, 75, 50, 25].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => {
                    setAmount(amt);
                    setOtherAmount("");
                    setFormErrors({ ...formErrors, amount: "" });
                  }}
                  className={`p-4 rounded-lg font-medium transition-colors ${
                    amount === amt
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ${amt}
                </button>
              ))}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  placeholder="Other Amount"
                  value={otherAmount}
                  onChange={handleOtherAmountChange}
                  className={`w-full p-4 pl-8 border rounded-lg ${
                    formErrors.amount ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="First Name *"
                    value={donorInfo.firstName}
                    onChange={(e) => {
                      setDonorInfo({ ...donorInfo, firstName: e.target.value });
                      setFormErrors({ ...formErrors, firstName: "" });
                    }}
                    className={`w-full p-3 border rounded-lg ${
                      formErrors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Last Name *"
                    value={donorInfo.lastName}
                    onChange={(e) => {
                      setDonorInfo({ ...donorInfo, lastName: e.target.value });
                      setFormErrors({ ...formErrors, lastName: "" });
                    }}
                    className={`w-full p-3 border rounded-lg ${
                      formErrors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  value={donorInfo.email}
                  onChange={(e) => {
                    setDonorInfo({ ...donorInfo, email: e.target.value });
                    setFormErrors({ ...formErrors, email: "" });
                  }}
                  className={`w-full p-3 border rounded-lg ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Address *"
                  value={donorInfo.address}
                  onChange={(e) => {
                    setDonorInfo({ ...donorInfo, address: e.target.value });
                    setFormErrors({ ...formErrors, address: "" });
                  }}
                  className={`w-full p-3 border rounded-lg ${
                    formErrors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.address && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    placeholder="City *"
                    value={donorInfo.city}
                    onChange={(e) => {
                      setDonorInfo({ ...donorInfo, city: e.target.value });
                      setFormErrors({ ...formErrors, city: "" });
                    }}
                    className={`w-full p-3 border rounded-lg ${
                      formErrors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.city && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>
                  )}
                </div>
                <div>
                  <select
                    value={donorInfo.state}
                    onChange={(e) => {
                      setDonorInfo({ ...donorInfo, state: e.target.value });
                      setFormErrors({ ...formErrors, state: "" });
                    }}
                    className={`w-full p-3 border rounded-lg bg-white ${
                      formErrors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">State *</option>
                    {US_STATES.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.state && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  placeholder="ZIP Code *"
                  value={donorInfo.zip}
                  onChange={(e) => {
                    setDonorInfo({ ...donorInfo, zip: e.target.value });
                    setFormErrors({ ...formErrors, zip: "" });
                  }}
                  className={`w-full p-3 border rounded-lg ${
                    formErrors.zip ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.zip && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.zip}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleStripeSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Card Information *</label>
                  <CardNumberElement
                    id="card-number"
                    className="p-3 border rounded-lg"
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
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Expiration *</label>
                    <CardExpiryElement
                      className="p-3 border rounded-lg"
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
                      }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">CVC *</label>
                    <CardCvcElement
                      className="p-3 border rounded-lg"
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
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
                    processing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Donate $${amount}`
                  )}
                </button>
              </form>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or donate with</span>
                </div>
              </div>

              <PayPalButton 
                amount={amount}
                onSuccess={handlePayPalSuccess}
                onError={setError}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DonationPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default DonationPage;