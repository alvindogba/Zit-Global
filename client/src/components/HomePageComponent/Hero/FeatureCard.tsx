import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-3 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="mb-4 ">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-noto mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-2 font-roboto text-sm">{description}</p>
      {/* <a 
        href="#learn-more" 
        className="text-[#2E7D32] hover:text-[#1B5E20] inline-flex items-center font-medium transition-colors"
      >
        Learn More <ArrowRight className="ml-2" size={16} />
      </a> */}
    </div>
  );
}