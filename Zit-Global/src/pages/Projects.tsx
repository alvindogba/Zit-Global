import { Section } from '../components/Section';

const Projects = () => {
  return (
    <main>
      <Section
        id="projects"
        title="Our Projects"
        subtitle="Featured Works"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((project) => (
            <div
              key={project}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 animate-pulse" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-lg font-medium">
                  Project {project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Projects;
