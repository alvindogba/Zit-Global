interface InstructorCardProps {
  name: string;
  subject: string;
  description: string;
  image: string;
}

export default function InstructorCard({ name, subject, description, image }: InstructorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-60 object-cover" />
      <div className="p-6">
        <h3 className="text-xl text-primary font-bold mb-2">{name}</h3>
        <p className="text-secondary-yellow mb-3">{subject}</p>
        <p className="text-black text-xs">{description}</p>
      </div>
    </div>
  );
}