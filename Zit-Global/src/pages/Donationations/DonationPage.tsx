import { useState } from "react";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PayPalButton from './PayPalButton';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const DonationPage = () => {
  const [giftType, setGiftType] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState(50);
  const [otherAmount, setOtherAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStripeSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const { data: { clientSecret } } = await axios.post(
        "http://localhost:5000/api/create-payment-intent",
        { amount: amount * 100 }
      );

      const stripe = await stripePromise;
      const { error: stripeError, paymentIntent } = await stripe!.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: document.querySelector('#card-number') as any,
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

      await axios.post("http://localhost:5000/api/save-donation", {
        ...donorInfo,
        amount,
        paymentMethod: "stripe",
        transactionId: paymentIntent!.id
      });

      navigate(`/success?transactionId=${paymentIntent!.id}&email=${donorInfo.email}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  const handlePayPalSuccess = async (transactionId: string) => {
    try {
      await axios.post("http://localhost:5000/api/save-donation", {
        ...donorInfo,
        amount,
        paymentMethod: "paypal",
        transactionId
      });

      navigate(`/success?transactionId=${transactionId}&email=${donorInfo.email}`);
    } catch (err) {
      console.error("Failed to save PayPal donation:", err);
    }
  };

  return (
    <Elements stripe={stripePromise}>
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
                  onClick={() => setGiftType("one-time")}
                  className={`flex-1 py-3 rounded-lg font-medium ${
                    giftType === "one-time"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  One-time Gift
                </button>
                <button
                  onClick={() => setGiftType("monthly")}
                  className={`flex-1 py-3 rounded-lg font-medium ${
                    giftType === "monthly"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Monthly Gift
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[250, 125, 75, 50, 25].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt);
                      setOtherAmount("");
                    }}
                    className={`p-4 rounded-lg font-medium ${
                      amount === amt
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Other Amount"
                  value={otherAmount}
                  onChange={(e) => {
                    setOtherAmount(e.target.value);
                    setAmount(Number(e.target.value) || 0);
                  }}
                  className="p-4 border rounded-lg"
                />
              </div>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="First Name"
                    value={donorInfo.firstName}
                    onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                    className="p-3 border rounded-lg"
                  />
                  <input
                    placeholder="Last Name"
                    value={donorInfo.lastName}
                    onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })}
                    className="p-3 border rounded-lg"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />

                <input
                  placeholder="Address"
                  value={donorInfo.address}
                  onChange={(e) => setDonorInfo({ ...donorInfo, address: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="City"
                    value={donorInfo.city}
                    onChange={(e) => setDonorInfo({ ...donorInfo, city: e.target.value })}
                    className="p-3 border rounded-lg"
                  />
                  <select
                    value={donorInfo.state}
                    onChange={(e) => setDonorInfo({ ...donorInfo, state: e.target.value })}
                    className="p-3 border rounded-lg bg-white"
                  >
                    <option value="">State</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                  </select>
                </div>

                <input
                  placeholder="ZIP Code"
                  value={donorInfo.zip}
                  onChange={(e) => setDonorInfo({ ...donorInfo, zip: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="space-y-6">
                <form onSubmit={handleStripeSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium">Card Information</label>
                    <CardNumberElement id="card-number" className="p-3 border rounded-lg" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium">Expiration</label>
                      <CardExpiryElement className="p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium">CVC</label>
                      <CardCvcElement className="p-3 border rounded-lg" />
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={processing}
                    className={`w-full py-3 text-white font-medium rounded-lg ${
                      processing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {processing ? "Processing..." : `Donate $${amount}`}
                  </button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <PayPalButton 
                  amount={amount}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Elements>
  );
};

export default DonationPage;