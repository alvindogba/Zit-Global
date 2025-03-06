import { Section } from '../components/Section';

const Services = () => {
  return (
    <main>
      <Section
        id="services"
        title="Our Services"
        subtitle="Comprehensive Architectural Solutions"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Architecture', 'Interior Design', 'Planning'].map((service) => (
            <div
              key={service}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4">{service}</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Services;
