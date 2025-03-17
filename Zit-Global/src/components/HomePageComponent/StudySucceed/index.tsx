import AnimateOnScroll from "../../common/AnimateOnScroll";
import { ArrowRight } from 'lucide-react';

const StudySucceed = () => {
  return (
    <AnimateOnScroll animation="slideDown">
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <AnimateOnScroll animation="fadeIn" delay={200}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Transformative Testimonials</h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={400}>
              <p className="text-gray-600 mb-8 text-sm">
                Discover how our coding school has empowered individuals to embark on successful tech careers. Hear firsthand experiences from our alumni who have transformed their lives through coding education and unlocked exciting opportunities in the tech industry.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={600}>
              <a
                href="#success-stories"
                className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-primary px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
              >
                LEARN MORE <ArrowRight className="ml-2" size={16} />
              </a>
            </AnimateOnScroll>
          </div>
          <div className="space-y-4">
            <AnimateOnScroll animation="slideUp" delay={800}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                alt="Students collaborating"
                className="rounded-lg shadow-lg w-full"
              />
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={1000}>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
                  alt="Campus facilities"
                  className="rounded-lg shadow-lg w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80"
                  alt="Learning activities"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default StudySucceed;
