import { CheckIcon } from "@heroicons/react/24/outline"; 

const SeeAFuture = () => {
    const futureVisions = [
      "Every Liberian has access to quality education that leads to stable, well-paying jobs.",
      "Technology and innovation drive economic growth and empowerment in Liberia.",
      "Young people are equipped with the skills and confidence to create their own opportunities.",
      "Communities thrive through collaboration, mentorship, and lifelong learning."
    ];
  
    return (
      <div className="text-white md:py-16 py-8">
        <div className="max-w-7xl mx-auto mx-16 sm:px-6 lg:px-8 text-center">
          <h2 className="font-noto text-xl md:text-2xl font-bold mb-6 text-primary">
            Our Vision: Opportunity and <br /> Empowerment for Every Liberian
          </h2>
          <p className="font-roboto text-sm md:text-md text-dparacolor mb-8 max-w-2xl mx-auto">
            At ZIT, we see a Future Where
          </p>
  
          {/* Future Visions List */}
          <div className="grid md:grid-cols-2 md:grid-rows-2 md:gap-4 gap-6">
            {futureVisions.map((vision, index) => (
              <div key={index} className="flex md:gap-3 gap-2">
                <CheckIcon className="text-secondary w-4 h-6 font-extrabold"/>
                <p className="text-dparacolor text-xs md:text-sm">{vision}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SeeAFuture;
  