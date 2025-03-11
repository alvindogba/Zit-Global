import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import PayPalButton from "./PayPalButton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod created: ", paymentMethod);
      // Here you would send paymentMethod.id and amount to your backend to process the payment
    }
  };

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Card Number</label>
        <CardNumberElement className="p-3 border rounded-lg w-full mb-4" />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Expiry Date</label>
            <CardExpiryElement className="p-3 border rounded-lg w-full" />
          </div>
          <div>
            <label className="block mb-2 font-semibold">CCV</label>
            <CardCvcElement className="p-3 border rounded-lg w-full" />
          </div>
        </div>
        
        <button type="submit" className="w-full mt-4 bg-green-500 text-white p-4 text-lg font-bold rounded-lg" disabled={!stripe}>
          Donate ${amount} with Card
        </button>
      </form>
      
      <div className="mt-6">
        <h3 className="text-lg font-bold text-center">Or donate with PayPal</h3>
        <PayPalButton amount={amount} />
      </div>
    </div>
  );
};

const DonationPage = () => {
  const [giftType, setGiftType] = useState("one-time");
  const [amount, setAmount] = useState(50);
  const [otherAmount, setOtherAmount] = useState("");

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-white text-black font-sans">
        {/* Header */}
        <header className="bg-black text-white p-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Big Brothers Big Sisters of America</h1>
        </header>

        {/* Hero Section */}
        <div className="relative w-full h-72 bg-black text-white flex flex-col items-center justify-center text-3xl font-bold text-center px-4">
          <h2>
            IT TAKES <span className="text-green-500">LITTLE</span> TO BE <span className="text-green-500">BIG</span>
          </h2>
          <p className="text-lg mt-4">Mentoring is More Important Than Ever.</p>
        </div>

        {/* Donation Form */}
        <div className="max-w-3xl mx-auto p-8">
          <h3 className="text-2xl font-bold mb-4">Your Gift</h3>

          {/* Gift Type Toggle */}
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className={`flex-1 p-3 text-lg font-semibold ${
                giftType === "one-time" ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setGiftType("one-time")}
            >
              One-time Gift
            </button>
            <button
              className={`flex-1 p-3 text-lg font-semibold ${
                giftType === "monthly" ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setGiftType("monthly")}
            >
              Monthly Gift
            </button>
          </div>

          {/* Donation Amount Options */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[250, 125, 75, 50, 25].map((amt) => (
              <button
                key={amt}
                className={`p-4 text-lg font-semibold rounded-lg ${
                  amount === amt ? "bg-black text-white" : "bg-gray-200 border"
                }`}
                onClick={() => {
                  setAmount(amt);
                  setOtherAmount("");
                }}
              >
                ${amt}
              </button>
            ))}
            <input
              type="number"
              className="p-4 border text-lg rounded-lg"
              placeholder="$ Other"
              value={otherAmount}
              onChange={(e) => {
                setOtherAmount(e.target.value);
                setAmount(Number(e.target.value) || 0);
              }}
            />
          </div>

          {/* Payment Section */}
          <h3 className="text-xl font-bold mt-8 mb-4">Payment Information</h3>
          <CheckoutForm amount={amount} />
        </div>
      </div>
    </Elements>
  );
};

export default DonationPage;
