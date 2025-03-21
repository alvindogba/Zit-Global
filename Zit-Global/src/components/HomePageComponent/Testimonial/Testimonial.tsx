import { useState, useEffect, useRef, TouchEvent } from 'react';
import { Quote } from 'lucide-react';
import AnimateOnScroll from "../../common/AnimateOnScroll";
import image1 from '../../asset/images/Alfred.jpg';
import image2 from '../../asset/images/Abel B. Winn.jpg';
import image3 from '../../asset/images/Paulfina.jpg';
import image4 from '../../asset/images/Alfred.jpg';

const testimonials = [
  {
    quote: "Zongea Institute of Technology gave me the skills I needed to launch my career in graphic design. The hands-on projects helped me develop a strong branding skills that are impressinggg people around me. Thanks ZIT for what I've learned here.",
    name: "William Jarkuno",
    role: "Graphic Designer",
    image: image1
  },
  {
    quote: "Learning at ZIT give me a deep understanding of Front-end Development and its principles and gain proficiency in all the tool I needed. Their project base approch was great and now I am a proud Front-End Developer ",
    name: "Omega B Momo",
    role: "Front-End Developer",
    image: image2
  },
  {
    quote: "Before enrolling at Zongea, I had no formal design training. The instructors were so knowledgeable and patient, and I learned everything from typography to branding. Now, I'm desiging logos and campaigns for local businesses.",
    name: "Alfred M. Weah",
    role: "Graphic Designer",
    image: image3
  },
  {
    quote: "The Graphic Design program at ZIT was a game-changer for me. I learned advance tools, which gave me the skills I needed to design like a professional, Thank You ZIT...",
    name: "Paulfina Q, Neeo",
    role: "Graphic Designer",
    image: image4
  }
];

const cardData = [
  {
    id: 1,
    title: "Gain Real-World Project Experience",
    description:
      "ZIT emphasizes project-based learning, enabling you to work on industry-relevant projects that can be added to your portfolio. By graduation, you'll have a track record of achievements to demonstrate to potential employers, showing that you can translate skills into real results.",
    bgColor: "bg-primary",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "Benefit from a Flexible and Supportive Learning Environment",
    description:
      "We understand that students come from diverse backgrounds and have varying commitments. Our flexible, supportive learning environment is designed to help you succeed, whether you're balancing work, family, or other responsibilities.",
    bgColor: "bg-white",
    textColor: "text-primary",
  },
  {
    id: 3,
    title: "Build a Strong Foundation in Emerging Technologies",
    description:
      "ZIT goes beyond foundational tech skills to introduce students to emerging fields, such as blockchain, AI, and data science, preparing you to meet the demands of tomorrow's tech landscape and giving you a competitive edge in cutting-edge areas.",
    bgColor: "bg-white",
    textColor: "text-primary",
  },
  {
    id: 4,
    title: "Join a Movement of Social Impact",
    description:
      "At ZIT, your education is more than personal growth—it's a commitment to community transformation. With our TTM (Teach, Tutor, Mentor) model, you have the chance to give back by volunteering your knowledge, making an impact in underserved communities, and contributing to the broader mission of driving positive social change.",
    bgColor: "bg-primary",
    textColor: "text-white",
  },
];

const Testimonial = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Touch threshold
  const minSwipeDistance = 50;

  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else {
        setCardsPerView(2); // Always show 2 cards on tablet and desktop
      }
    };
    
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const normalizeIndex = (index: number) => {
    // Handle infinite scrolling
    if (index < 0) {
      return testimonials.length - cardsPerView;
    }
    if (index > testimonials.length - cardsPerView) {
      return 0;
    }
    return index;
  };

  const handleNext = () => {
    setStartIndex(prev => normalizeIndex(prev + 1));
  };

  const handlePrev = () => {
    setStartIndex(prev => normalizeIndex(prev - 1));
  };

  // Touch event handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  // Mouse event handlers
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const carouselRect = carouselRef.current?.getBoundingClientRect();
    if (!carouselRect) return;
    const mousePosition = e.clientX;
    const carouselCenter = carouselRect.left + carouselRect.width / 2;
    const distance = mousePosition - carouselCenter;
    const cardWidth = carouselRect.width / cardsPerView;
    const cardGap = 16;
    const newIndex = startIndex + Math.round(distance / (cardWidth + cardGap));
    setStartIndex(normalizeIndex(newIndex));
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate transform based on index
  const getTransform = () => {
    const baseWidth = carouselRef.current?.clientWidth ?? 0;
    const cardWidth = (baseWidth / cardsPerView);
    const gapWidth = 16; // gap-4 = 1rem = 16px
    return `translateX(-${startIndex * (cardWidth + gapWidth)}px)`;
  };

  // Autoplay functionality
  const [autoPlayInterval, setAutoPlayInterval] = useState<ReturnType<typeof setTimeout> | null>(null);

  const startAutoPlay = () => {
    setAutoPlayInterval(setInterval(handleNext, 5000));
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  return (
    <div>
      {/* Header Section */}
      <section className="text-center  bg-gray-50">
        <AnimateOnScroll animation="slideDown">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">
            YOUR BEST PATH TO A NEW TECH CAREER
          </h1>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10">
          {cardData.map((card, index) => (
            <AnimateOnScroll
              key={card.id}
              animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={index * 200}
            >
              <div
                className={`${card.bgColor} ${card.textColor} py-8 px-6 rounded-lg shadow-md text-left text-sm hover:scale-105 transition-transform`}
              >
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className='text-sm'>{card.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-white py-10" id="success-stories">
        <div className="text-center mb-10">
          <AnimateOnScroll animation="slideDown">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Success Stories</h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeIn" delay={200}>
            <p className="text-black mb-6 text-md">
              Our students have achieved incredible milestones. Hear their inspiring
              stories of transformation and growth.
            </p>
          </AnimateOnScroll>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={carouselRef}
            className="carousel-container overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: getTransform() }}
            >
              {testimonials.map((testimonial, index) => (
                <AnimateOnScroll
                  key={index}
                  animation="slideUp"
                  delay={index * 100}
                  className="flex-shrink-0 w-full md:w-[calc(50%-8px)]"
                >
                  <div className="bg-primary text-white p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                    <div className="flex items-center justify-center mb-4">
                      <Quote className="text-secondary-yellow w-8 h-8" />
                    </div>
                    <blockquote className="text-sm italic mb-6">{testimonial.quote}</blockquote>
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-200">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => { handlePrev(); stopAutoPlay(); startAutoPlay(); }}
            className="absolute left-10 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            ←
          </button>
          <button
            onClick={() => { handleNext(); stopAutoPlay(); startAutoPlay(); }}
            className="absolute right-10 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
