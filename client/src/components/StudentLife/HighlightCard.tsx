import { LucideIcon } from 'lucide-react';

interface HighlightCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export default function HighlightCard({ Icon, title, description }: HighlightCardProps) {
  return (
    <div className="flex items-start space-x-4">
      <Icon className="w-8 h-8 text-primary flex-shrink-0" />
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}