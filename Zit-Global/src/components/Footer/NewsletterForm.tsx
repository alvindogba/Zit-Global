import { useState } from "react";
import { subscribeToNewsletter } from "../../api/newsletter"; // Import API function

export default function NewsletterForm() {
  const [email, setEmail] = useState(""); // State to store the email input value
  const [message, setMessage] = useState(""); // Success/error message
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await subscribeToNewsletter(email); // Call API utility function
      setMessage("Thank you for subscribing!");
      setEmail(""); // Reset input field
    } catch (error: any) {
      console.error("Subscription error:", error.message);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2 className="mb-2 font-noto text-lg">Subscribe To Our News Letter</h2>
    
      <div className="flex">
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email} // Bind input value to state
          onChange={(e) => setEmail(e.target.value)} // Update state on input change
          className="flex-1 px-6 py-2 text-md font-roboto rounded-l-md focus:outline-none focus:ring-2 bg-primary-light shadow-sm shadow-gray-900 focus:ring-secondary-yellow text-black"
        />
        <button
          type="submit"
          className="bg-secondary text-primary font-sans px-4 py-[12px] text-sm rounded-r-md font-semibold transition-colors"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {message && <p className="text-xs mt-2">{message}</p>} {/* Display message */}
    </form>
  );
}
