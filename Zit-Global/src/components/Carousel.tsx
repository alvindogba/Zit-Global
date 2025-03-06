import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselProps {
  slides: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
  }[];
  autoPlayInterval?: number;
}

export const Carousel = ({ slides, autoPlayInterval = 15000 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  const handlePrevious = () => {
    setCurrentIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((current) => (current + 1) % slides.length);
  };

  return (
    <div className="bg-primary-900 w-full h-full overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div 
            className=" absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/50 to-black/30" />
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
                {slides[currentIndex].ctaText && (
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
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-colors"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

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
