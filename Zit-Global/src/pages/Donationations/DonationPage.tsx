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
import { US_STATES } from "../../utils/states";

// Load Stripe with your public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Canadian provinces array
const CA_PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" }
];

// Complete list of countries (ISO 3166‑1 alpha‑2)
const COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AX", name: "Åland Islands" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo, Democratic Republic of the" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CW", name: "Curaçao" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and McDonald Islands" },
  { code: "VA", name: "Holy See" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran, Islamic Republic of" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea, Democratic People's Republic of" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia, Federated States of" },
  { code: "MD", name: "Moldova, Republic of" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine, State of" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Réunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthélemy" },
  { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin (French part)" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SX", name: "Sint Maarten (Dutch part)" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan, Province of China" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Viet Nam" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S." },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" }
];

interface DonorInfoType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const initialDonorInfo: DonorInfoType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
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
    }
    if (step === 3) {
      if (!donorInfo.firstName) errors.firstName = "First name is required";
      if (!donorInfo.lastName) errors.lastName = "Last name is required";
      if (!donorInfo.email) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(donorInfo.email))
        errors.email = "Invalid email format";
      if (!donorInfo.phone) errors.phone = "Phone number is required";
      if (!donorInfo.address) errors.address = "Address is required";
      if (!donorInfo.city) errors.city = "City is required";
      if (!donorInfo.state) errors.state = "State/Region is required";
      if (!donorInfo.zip) errors.zip = "ZIP/Postal code is required";
      if (!donorInfo.country) errors.country = "Country is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(currentStep)) {
      setError("Please correct the errors before continuing.");
      return;
    }
    setError("Please fill all the require fields.");
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleOtherAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "" || (Number(value) > 0 && Number(value) <= 50000)) {
      setOtherAmount(value);
      if (value !== "") setAmount(Number(value));
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
              line1: donorInfo.address,
              line2: donorInfo.address2,
              city: donorInfo.city,
              state: donorInfo.state,
              postal_code: donorInfo.zip,
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

  // Subscription submission for Card payments (Stripe Checkout)// Subscription submission for recurring donations via Stripe Checkout
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
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
  
    } catch (err) {
      console.error("Stripe subscription failed:", err);
      setError(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setProcessing(false);
    }
  };

  // PayPal payment success handler
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
    <div className="min-h-screen bg-gray-50" 
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 84, 0.1), rgba(0, 0, 84, 0.1)), url(${donor})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 1s ease-in',
    }}>
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
              <li className="text-primary font-semibold text-md">With your support, we can:
                <ul className="text-dparacolor font-normal space-y-2 text-sm">
                  <li className="flex items-center">
                  <span className="mr-2 text-2xl text-secondary">•</span>
                    Sponsor scholarships for underserved students.
                  </li>
                  <li className="flex items-center">
                  <span className="mr-2 text-2xl text-secondary">•</span> Fund cutting-edge technology.</li>
                  <li className="flex items-center">
                  <span className="mr-2 text-2xl text-secondary">•</span> Expand mentorship programs with industry leaders.</li>
                  <li className="flex items-center">
                  <span className="mr-2 text-2xl text-secondary">•</span> Drive community projects that solve local and global challenges</li>
                </ul>
              </li>
            </ul>
            <hr />
            <h5 className="text-primary font-semibold text-md">Every gift, big or small, makes a difference.</h5>
            <div className="flex space-x-2 justify-center items-end h-32">
              <RiSecurePaymentFill size={24} className="text-dparacolor"/>
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= stepNum ? "bg-primary text-white" : "bg-gray-200"}`}>
                      {stepNum}
                    </div>
                    {stepNum < totalSteps && (
                      <div className={`w-16 h-1 ${currentStep > stepNum ? "bg-primary" : "bg-gray-200"}`}></div>
                    )}
                  </div>
                );
              })}
            </div>

            <form onSubmit={nextStep}>
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}>
                  {/* Step 1: Donation Details */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">Choose Your Donation</h2>
                    <div className="flex gap-4 mb-6 flex-col sm:flex-row">
                      <button type="button" onClick={() => setGiftType("one-time")} className={`w-full py-3 rounded-lg font-medium transition-colors ${giftType === "one-time" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>One-time </button>
                      <button type="button" onClick={() => setGiftType("monthly")} className={`w-full py-3 rounded-lg font-medium flex justify-center items-center gap-3 transition-colors ${giftType === "monthly" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}><IoIosHeart />Monthly</button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-6">
                    {/* First row with 3 buttons */}
                    <div className="col-span-1">
                      <button 
                        type="button" 
                        onClick={() => { setAmount(250); setOtherAmount(""); setFormErrors({ ...formErrors, amount: "" }); }} 
                        className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 250 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      >
                        $250
                      </button>
                    </div>

                    <div className="col-span-1">
                      <button 
                        type="button" 
                        onClick={() => { setAmount(125); setOtherAmount(""); setFormErrors({ ...formErrors, amount: "" }); }} 
                        className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 125 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      >
                        $125
                      </button>
                    </div>
                    <div className="col-span-1">
                      <button 
                        type="button" 
                        onClick={() => { setAmount(75); setOtherAmount(""); setFormErrors({ ...formErrors, amount: "" }); }} 
                        className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 75 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                      >
                        $75
                      </button>
                    </div>

                      {/* Second row with 2 buttons and empty space */}
                      <div className="col-span-1">
                        <button 
                          type="button" 
                          onClick={() => { setAmount(50); setOtherAmount(""); setFormErrors({ ...formErrors, amount: "" }); }} 
                          className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 50 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                          $50
                        </button>
                      </div>
                      <div className="col-span-1">
                        <button 
                          type="button" 
                          onClick={() => { setAmount(25); setOtherAmount(""); setFormErrors({ ...formErrors, amount: "" }); }} 
                          className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 25 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                          $25
                        </button>
                        </div>

                        {/* Test amount  */}
                        <div className="col-span-1">
                        <button 
                          type="button" 
                          onClick={() => { setAmount(5); setOtherAmount(""); setFormErrors({ ...formErrors, amount: "" }); }} 
                          className={`w-full p-2 sm:p-4 rounded-lg font-medium transition-colors ${amount === 5 ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                          $5
                        </button>
                      </div>
                      <div className="col-span-1"></div> {/* Empty space to maintain grid */}

                      {/* Third row - Other Amount input taking full width */}
                      <div className="col-span-2 sm:col-span-3">
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input 
                            type="text" 
                            placeholder="Custom Amount" 
                            value={otherAmount} 
                            onChange={handleOtherAmountChange} 
                            className={`w-full p-2 sm:p-4 border rounded-lg ${formErrors.amount ? "border-red-500" : "border-gray-300"}`} 
                          />
                        </div>
                        {formErrors.amount && (
                          <p className="text-xs text-red-500">{formErrors.amount}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button type="button" onClick={nextStep} className="px-3 py-2 bg-secondary flex items-center gap-2 text-white rounded-lg">Next <FaArrowRightLong/></button>
                    </div>
                  </div>

                  {/* Step 2: Payment Method Selection */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">Choose Payment Method</h2>
                    <div className="flex gap-4 mb-6">
                      <button type="button" onClick={() => { setSelectedPaymentMethod("card"); nextStep(); }} className={`w-full py-2 rounded-lg font-medium transition-colors flex justify-center items-center gap-2 ${selectedPaymentMethod === "card" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}><IoCard size={30}/>Credit Card</button>
                      <button type="button" onClick={() => { setSelectedPaymentMethod("paypal"); nextStep(); }} className={`w-full py-2 flex justify-center items-center rounded-lg font-medium transition-colors ${selectedPaymentMethod === "paypal" ? "bg-primary/10 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}><img src={paypalImg} className="h-6"/></button>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">Back</button>
                      <button type="button" onClick={nextStep} className="px-3 py-2 bg-secondary flex items-center gap-2 text-white rounded-lg">Next <FaArrowRightLong/></button>
                    </div>
                  </div>

                  {/* Step 3: Donor & Billing Information */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">Donor & Billing Information</h2>
                    <div className="space-y-2">
                      <input placeholder="First Name *" value={donorInfo.firstName} onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })} className="w-full p-2 border rounded-lg" />
                      <input placeholder="Last Name *" value={donorInfo.lastName} onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })} className="w-full p-2 border rounded-lg" />
                      <input type="email" placeholder="Email *" value={donorInfo.email} onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })} className="w-full p-2 border rounded-lg" />
                      <input placeholder="Phone *" value={donorInfo.phone} onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })} className="w-full p-2 border rounded-lg" />
                      <input placeholder="Address *" value={donorInfo.address} onChange={(e) => setDonorInfo({ ...donorInfo, address: e.target.value })} className="w-full p-2 border rounded-lg" />
                      <input placeholder="Address Line 2 (Optional)" value={donorInfo.address2} onChange={(e) => setDonorInfo({ ...donorInfo, address2: e.target.value })} className="w-full p-2 border rounded-lg" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input placeholder="City *" value={donorInfo.city} onChange={(e) => setDonorInfo({ ...donorInfo, city: e.target.value })} className="w-full p-2 border rounded-lg" />
                        {donorInfo.country === "US" ? (
                          <select value={donorInfo.state} onChange={(e) => setDonorInfo({ ...donorInfo, state: e.target.value })} className="w-full p-2 border rounded-lg bg-white">
                            <option value="">State *</option>
                            {US_STATES.map((state) => (
                              <option key={state.code} value={state.code}>{state.name}</option>
                            ))}
                          </select>
                        ) : donorInfo.country === "CA" ? (
                          <select value={donorInfo.state} onChange={(e) => setDonorInfo({ ...donorInfo, state: e.target.value })} className="w-full p-2 border rounded-lg bg-white">
                            <option value="">Province *</option>
                            {CA_PROVINCES.map((prov) => (
                              <option key={prov.code} value={prov.code}>{prov.name}</option>
                            ))}
                          </select>
                        ) : (
                          <input placeholder="Region *" value={donorInfo.state} onChange={(e) => setDonorInfo({ ...donorInfo, state: e.target.value })} className="w-full p-2 border rounded-lg" />
                        )}
                      </div>
                      <input placeholder="ZIP / Postal Code *" value={donorInfo.zip} onChange={(e) => setDonorInfo({ ...donorInfo, zip: e.target.value })} className="w-full p-2 border rounded-lg" />
                      <select value={donorInfo.country} onChange={(e) => setDonorInfo({ ...donorInfo, country: e.target.value, state: "" })} className="w-full p-2 border rounded-lg bg-white">
                        <option value="">Country *</option>
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between mt-4">
                      <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">Back</button>
                      <button type="button" onClick={nextStep} className="px-3 py-2 bg-secondary flex items-center gap-2 text-white rounded-lg">Next <FaArrowRightLong/></button>
                    </div>
                  </div>

                  {/* Step 4: Payment Details */}
                  <div className="min-w-full p-4">
                    <h2 className="text-xl font-bold mb-4 font-noto text-center">Payment</h2>
                    {selectedPaymentMethod === "card" ? (
                      <div>
                        <p className="mb-4 text-center">
                          {giftType === "one-time" ? "Enter your card details for a one-time donation." 
                          : "Enter your card details for your monthly subscription."}
                        </p>
                        <div className="mb-4">
                          <label className="block mb-2 text-sm font-medium">Card Number *</label>
                          <CardNumberElement id="card-number" className="p-2 border rounded-lg" options={{ style: { base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } }, invalid: { color: "#9e2146" } } }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          <div>
                            <label className="block mb-2 text-sm font-medium">Expiry *</label>
                            <CardExpiryElement className="p-2 border rounded-lg" options={{ style: { base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } }, invalid: { color: "#9e2146" } } }} />
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-medium">CVC *</label>
                            <CardCvcElement className="p-2 border rounded-lg" options={{ style: { base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } }, invalid: { color: "#9e2146" } } }} />
                          </div>
                        </div>
                        <button type="button"
                          onClick={giftType === "one-time" ? handleStripeSubmit : handleStripeSubscription}
                          disabled={processing}
                          className={`px-4 py-2 rounded-lg text-white transition-colors w-full ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/80"}`}>
                          {processing ? "Processing..." : (giftType === "one-time" ? "Submit Donation" : "Subscribe Monthly")}
                        </button>
                        <div className="flex justify-start mt-4">
                          <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">Back</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-4 text-center">
                          {giftType === "one-time" ? "Complete your donation using PayPal." 
                          : "Subscribe monthly using PayPal."}
                        </p>
                        <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "your-paypal-client-id", currency: "USD", intent: giftType === "one-time" ? "capture" : "subscription" }}>
                          {giftType === "one-time" ? (
                            <div className="flex flex-col gap-4">
                              <PayPalButtons
                                forceReRender={[amount]}
                                fundingSource="paypal"
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                  return actions.order.create({ 
                                    intent: "CAPTURE", 
                                    purchase_units: [{ amount: { currency_code: "USD", value: amount.toString() } }] 
                                  });
                                  {data}
                                }}
                                onApprove={(data, actions) => {
                                  if (!actions.order) {
                                    setError("PayPal order actions are undefined.");
                                    return Promise.reject(new Error("PayPal order actions are undefined."));
                                  }
                                  return actions.order.capture().then(() => {
                                    return handlePayPalSuccess(data.orderID);
                                  }).catch((err) => {
                                    setError("PayPal payment failed: " + (err instanceof Error ? err.message : "Unknown error"));
                                    return Promise.reject(err);
                                  });
                                }}
                                onError={(err) => { setError("PayPal payment failed: " + (err instanceof Error ? err.message : "Unknown error")); }}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col gap-4">
                              <PayPalButtons
                                style={{ layout: "vertical" }}
                                createSubscription={(actions: any) => {
                                  return actions.subscription.create({
                                    plan_id: "YOUR_PAYPAL_MONTHLY_PLAN_ID"
                                  });
                                }}
                                onApprove={(data) => {
                                  return new Promise<void>((resolve, reject) => {
                                    if (data.subscriptionID) {
                                      handlePayPalSuccess(data.subscriptionID)
                                        .then(resolve)
                                        .catch(reject);
                                    } else {
                                      setError("Subscription ID is missing.");
                                      reject(new Error("Subscription ID is missing."));
                                    }
                                  });
                                }}
                                onError={(err) => { setError("PayPal subscription failed: " + (err instanceof Error ? err.message : "Unknown error")); }}
                              />
                            </div>
                          )}
                        </PayPalScriptProvider>
                        <div className="flex justify-start mt-4">
                          <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-200 rounded-lg">Back</button>
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
      <ScrollToTopButton />
    </div>
  );
};

const DonationPage = () => (
  <Elements stripe={stripePromise}>
    <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "your-paypal-client-id", currency: "USD", intent: "capture" }}>
      <DonationMultiStepForm />
    </PayPalScriptProvider>
  </Elements>
);

export default DonationPage;