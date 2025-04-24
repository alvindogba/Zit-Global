import { Users, Puzzle, Building2 } from 'lucide-react';
import HighlightCard from './HighlightCard';

export default function StudentLife() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Navigate the Journey of Intellectual Growth
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <HighlightCard
            Icon={Users}
            title="Small Group Learning"
            description="Hands-on experience in intimate classroom settings for personalized attention."
          />
          <HighlightCard
            Icon={Puzzle}
            title="Community Projects"
            description="Collaborate on real-world projects that benefit the local community."
          />
          <HighlightCard
            Icon={Building2}
            title="Industry Partners"
            description="Learn from and connect with leading technology companies."
          />
        </div>
      </div>
    </section>
  );
}