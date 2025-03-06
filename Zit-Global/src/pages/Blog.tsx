import { Section } from '../components/Section';

const Blog = () => {
  return (
    <main>
      <Section
        id="blog"
        title="Our Blog"
        subtitle="Latest News & Ideas"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <article
              key={post}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 animate-pulse" />
              <div className="p-6">
                <time className="text-sm text-gray-500">March 5, 2025</time>
                <h3 className="text-xl font-semibold mt-2 mb-4">Blog Post {post}</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a
                  href={`/blog/post-${post}`}
                  className="text-accent hover:underline"
                >
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Blog;
