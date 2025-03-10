import React from "react";

interface DonationDetailsProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
}

const DonationDetails: React.FC<DonationDetailsProps> = ({ formData, handleChange, nextStep }) => {
  const donationTypes = [
    { id: "one-time", label: "One-Time Donation" },
    { id: "monthly", label: "Monthly Giving" }
  ];
  
  const oneTimeAmounts = [25, 50, 100, 500];
  const recurringAmounts = [10, 20, 50, 100];
  const currencies = ["USD", "EUR", "GBP"];

  const setDonationType = (type: string) => {
    handleChange({
      target: { name: "donationType", value: type }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const setAmount = (amount: number) => {
    handleChange({
      target: { name: "donationAmount", value: amount.toString() }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Determine which donation amounts to display
  const selectedAmounts = formData.donationType === "monthly" ? recurringAmounts : oneTimeAmounts;

  // Validate if we can proceed
  const canProceed = () => {
    const amount = formData.customAmount ? parseFloat(formData.customAmount) : formData.donationAmount;
    return amount > 0 && formData.donationType;
  };

  return (
    <section className="p-6">
      <h2 className="text-xl font-bold mb-4 text-[#0a0a5f]">Choose Donation Type & Amount</h2>

      {/* Donation Type Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">How Would You Like to Support?</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {donationTypes.map(({ id, label }) => (
            <button
              key={id}
              className={`p-3 border rounded-lg text-sm font-semibold transition-all ${
                formData.donationType === id
                  ? "bg-[#0a0a5f] text-white border-[#0a0a5f]"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
              }`}
              onClick={() => setDonationType(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Currency Selection */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm">Donation Amount</h3>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="p-2 border rounded-md text-sm font-medium bg-[#0a0a5f] text-white"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* Predefined Amount Options */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {selectedAmounts.map((value) => (
          <button
            key={value}
            className={`p-3 border rounded-lg text-center font-medium ${
              formData.donationAmount === value && !formData.customAmount
                ? "bg-[#0a0a5f] text-white border-[#0a0a5f]"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700"
            }`}
            onClick={() => setAmount(value)}
          >
            {formData.currency} {value}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="mb-6">
        <h2 className="font-medium text-primary mb-2">Custom Amount</h2>
        <div className="flex items-center gap-2">
          <div className="w-24">
            <select 
              className="w-full p-2 border rounded-md bg-gray-100 text-sm font-medium" 
              disabled
            >
              <option>{formData.currency}</option>
            </select>
          </div>
          <input
            type="number"
            min="1"
            step="0.01"
            className={`p-2 border rounded-lg flex-1 text-sm ${
              formData.donationAmount > 0 ? 'bg-gray-100' : ''
            }`}
            placeholder="Enter Amount"
            name="customAmount"
            value={formData.customAmount}
            onChange={handleChange}
            disabled={formData.donationAmount > 0}
          />
        </div>
        {formData.donationType === "monthly" && (
          <p className="text-sm text-gray-600 mt-2">
            You will be charged {formData.currency} {formData.customAmount || formData.donationAmount} monthly
          </p>
        )}
      </div>

      {/* Next Button */}
      <button
        className={`px-6 py-2 rounded-lg text-sm font-medium ${
          canProceed()
            ? "bg-[#0a0a5f] text-white"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        onClick={nextStep}
        disabled={!canProceed()}
      >
        Next
      </button>
    </section>
  );
};

export default DonationDetails;
