import { Section } from '../components/Section';

const About = () => {
  return (
    <main>
      <Section
        id="about"
        title="About Us"
        subtitle="Building Dreams Since 2010"
      >
        <div className="prose prose-lg mx-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Section>
    </main>
  );
};

export default About;
