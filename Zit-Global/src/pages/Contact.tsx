import { Section } from '../components/Section';

const Contact = () => {
  return (
    <main>
      <Section
        id="contact"
        title="Contact Us"
        subtitle="Get in Touch"
      >
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </Section>
    </main>
  );
};

export default Contact;
