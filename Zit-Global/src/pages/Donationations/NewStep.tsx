import React from "react";

interface NewStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
  prevStep?: () => void;
}

const NewStep: React.FC<NewStepProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  // Sample phone country codes (commonly accepted by PayPal/Stripe)
  const phoneCountryCodes = [
    "+1",  // USA, Canada
    "+44", // UK
    "+61", // Australia
    "+64", // New Zealand
    "+33", // France
    "+49", // Germany
    "+81", // Japan
    "+86", // China
    "+91", // India
  ];

  // Sample list of countries supported by Stripe & PayPal (for demonstration)
  // You can expand this list as needed
  const supportedCountries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "New Zealand",
    "France",
    "Germany",
    "China",
    "Japan",
    "India",
  ];

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-6 text-[#0a0a5f]">Donor Information</h2>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* First Name */}
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-semibold mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="p-2 border rounded-md"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-semibold mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="p-2 border rounded-md"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-2 border rounded-md"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-semibold mb-1">
            Phone
          </label>
          <div className="flex">
            <select
              name="countryCode"
              className="p-2 border rounded-l-md bg-gray-100 text-sm"
              value={formData.countryCode || phoneCountryCodes[0]}
              onChange={handleChange}
            >
              {phoneCountryCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phone"
              id="phone"
              className="p-2 border rounded-r-md flex-1"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label htmlFor="country" className="text-sm font-semibold mb-1">
            Country
          </label>
          <select
            name="country"
            id="country"
            className="p-2 border rounded-md"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select your country</option>
            {supportedCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label htmlFor="state" className="text-sm font-semibold mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="p-2 border rounded-md"
            placeholder="Enter state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm font-semibold mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="p-2 border rounded-md"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* Zip */}
        <div className="flex flex-col">
          <label htmlFor="zip" className="text-sm font-semibold mb-1">
            Zip
          </label>
          <input
            type="text"
            name="zip"
            id="zip"
            className="p-2 border rounded-md"
            placeholder="Enter zip code"
            value={formData.zip}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2">
        {prevStep && (
          <button
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md text-sm font-medium"
            onClick={prevStep}
          >
            Back
          </button>
        )}
        <button
          className="px-6 py-2 bg-[#0a0a5f] text-white rounded-md text-sm font-medium"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default NewStep;
