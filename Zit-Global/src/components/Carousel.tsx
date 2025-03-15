import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  slides: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  }[];
  autoPlayInterval?: number;
}

export const Carousel = ({ slides, autoPlayInterval = 15000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-primary-900 ">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 1, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/50 to-black/30" />
          </div>

          <div className="relative flex items-center justify-center h-full">
            <div className="container mx-auto px-8 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
                className="max-w-3xl"
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                  {slides[currentIndex].title}
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white/90 drop-shadow-md">
                  {slides[currentIndex].subtitle}
                </h3>
                <p className="text-lg md:text-xl mb-8 text-white/85 drop-shadow-md leading-relaxed">
                  {slides[currentIndex].description}
                </p>
                {slides[currentIndex].ctaText && slides[currentIndex].ctaLink && (
                  <a
                    href={slides[currentIndex].ctaLink}
                    className="inline-flex items-center px-8 py-4 text-lg border font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-500 transition-colors shadow-lg hover:shadow-xl"
                  >
                    {slides[currentIndex].ctaText}
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
  

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary-500' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
