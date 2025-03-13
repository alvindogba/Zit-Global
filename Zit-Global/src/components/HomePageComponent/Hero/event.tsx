import { useState, useEffect, useRef, TouchEvent } from "react";
//import dynamic from 'next/dynamic';
import AnimateOnScroll from "../../common/AnimateOnScroll";

const events = [
  { date: "July 23, 2024", title: "Top 10 Tech Innovations to Watch in 2025", time: "5:00 pm – 6:00 pm", description: "Get ahead of the game by exploring the top tech innovations that will shape the future. From AI to blockchain, stay informed!" },
  { date: "Dec 30, 2023", title: "ZIT's Coding Bootcamp: A Student's Journey", time: "5:00 pm – 6:00 pm", description: "Follow a student's experience through ZIT's intensive coding bootcamp, learning how to build a real-world app." },
  { date: "Feb 26, 2024", title: "Zongea Tech Leaders: Interview with Industry Leaders", time: "5:00 pm – 6:00 pm", description: "Learn from the best! Zongea's fireside chat session features some of the brightest minds in the tech industry." },
  { date: "Nov 25, 2023", title: "Breaking Barriers: Women in Tech at ZIT", time: "5:00 pm – 6:00 pm", description: "Discover how women at ZIT are making strides in the tech field, from coding workshops to leadership roles." },
  { date: "Mar 15, 2024", title: "AI & Machine Learning Trends in 2025", time: "4:00 pm – 5:00 pm", description: "Explore the latest advancements in AI and machine learning and how they are transforming industries." },
  { date: "Apr 10, 2024", title: "Cybersecurity Best Practices for 2025", time: "3:00 pm – 4:00 pm", description: "Stay ahead of cyber threats! Learn the best cybersecurity practices for 2025 to protect data and systems." },
  { date: "May 22, 2024", title: "Blockchain in Finance: What's Next?", time: "6:00 pm – 7:00 pm", description: "An insightful discussion on how blockchain is revolutionizing the finance industry and what to expect next." },
  { date: "Jun 18, 2024", title: "The Future of Remote Work & Tech", time: "2:00 pm – 3:00 pm", description: "Discover how technology is shaping the future of remote work and what tools are essential for success." }
];

const Events = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
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
      return events.length - cardsPerView;
    }
    if (index > events.length - cardsPerView) {
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

  // Calculate transform based on index
  const getTransform = () => {
    const baseWidth = carouselRef.current?.clientWidth ?? 0;
    const cardWidth = (baseWidth / cardsPerView);
    const gapWidth = 16; // gap-4 = 1rem = 16px
    return `translateX(-${startIndex * (cardWidth + gapWidth)}px)`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <AnimateOnScroll animation="slideDown">
        <h2 className="text-2xl font-bold text-primary text-center mb-6">Upcoming Events</h2>
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeIn" delay={200}>
        <p className="text-lg text-gray-600 mb-6 text-left md:text-center">
          Stay updated with our latest events and activities
        </p>
      </AnimateOnScroll>
      <div className="relative">
        <div 
          ref={carouselRef}
          className="carousel-container overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ transform: getTransform() }}
          >
            {events.map((event, index) => (
              <AnimateOnScroll 
                key={index}
                animation="slideUp"
                delay={index * 100}
                className="flex-shrink-0 w-full md:w-[calc(50%-8px)]"
              >
                <div className="border rounded-lg p-6 bg-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg h-full flex flex-col justify-between">
                  <p className="text-sm text-gray-500">{event.date}</p>
                  <hr className="mt-4 h-1 bg-primary"/>
                  <h3 className="text-lg font-semibold text-primary mt-2">{event.title}</h3>
                  <p className="text-gray-700 mt-1">{event.time}</p>
                  <p className="text-gray-600 mt-2 line-clamp-3">{event.description}</p>
                  <button className="text-primary font-semibold hover:underline mt-4 flex items-center group">
                    Read More 
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Always enabled */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Events;
