
import { useState } from "react";

const donationOptions = [
  {
    id: 1,
    title: "One-Time Donation",
    description: "Contribute any amount to support our mission.",
  },
  {
    id: 2,
    title: "Monthly Giving",
    description: "Become a recurring donor and sustain long-term impact.",
  },
  {
    id: 3,
    title: "Corporate Sponsorship",
    description: "Partner with ZIT to support education initiatives.",
  },
];

export default function DonationOptions() {
  const [selected, setSelected] = useState<number>(1);

  return (
    <div className="flex flex-col items-center text-center  px-4 md:px-36 py-10 md:py-20">
      <h2 className="text-2xl font-bold text-primary mb-8">Ways to Give</h2>
      <div className="flex space-x-4">
        {donationOptions.map((option) => (
          <div
            key={option.id}
            className={`border rounded-lg p-6 w-64 cursor-pointer transition-all duration-300 ease-in-out ${
              selected === option.id
                ? "border-blue-600 shadow-md"
                : "border-gray-300 bg-gray-100 hover:scale-105"
            }`}
            onClick={() => setSelected(option.id)}
          >
            <h3 className="font-bold text-md">{option.id}. {option.title}</h3>
            <p className="text-gray-600 mt-2">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
