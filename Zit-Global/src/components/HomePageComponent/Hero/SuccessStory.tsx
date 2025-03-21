import { useState, useEffect, useRef, TouchEvent } from "react";
import { Quote } from "lucide-react";
import AnimateOnScroll from "../../common/AnimateOnScroll";
import image1 from "../../../asset/images/Alfred.jpg";
import image2 from "../../../asset/images/Abel B. Winn.jpg";
import image3 from "../../../asset/images/Paulfina.jpg";
import image4 from "../../../asset/images/Alfred.jpg";
import image5 from "../../../asset/images/Student in tech Class.jpg";

const students = [
    {
        name: "John",
        message: `The Software Development course was a game-changer for me! I started with little programming experience, but now I feel confident building full-stack applications. `,
        role: "Software Developer",
        image: image1
    },
    {
        name: "John",
        message: ` I've always had an eye for design, but this course really helped me refine my skills. From learning the ins and outs of Photoshop and Illustrator to understanding.`,
        role: "Software Developer",
        image: image2
    },
    {
        name: "John",
        message: `The Software Development course was a game-changer for me! I started with little programming experience, but now I feel confident building full-stack applications.  `,
        role: "Software Developer",
        image: image3
    },
    {
        name: "John",
        message: `The Cyber Security course gave me a deep understanding of how digital systems work and how to protect them. I had no prior experience in the field.  `,
        role: "Software Developer",
        image: image4
    },
    {
        name: "John",
        message: `When I first signed up for the Software Development course, I wasn't sure if I'd be able to keep up, but the program's pace was perfect for beginners. `,
        role: "Software Developer",
        image: image5
    },
];

const SuccessStory = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(1);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const autoPlayRef = useRef<number | null>(null);
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

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, []);

    const startAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
        autoPlayRef.current = setInterval(() => {
            handleNext();
        }, 5000);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };

    const normalizeIndex = (index: number) => {
        // Handle infinite scrolling
        if (index < 0) {
            return students.length - cardsPerView;
        }
        if (index > students.length - cardsPerView) {
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
        stopAutoPlay();
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
        startAutoPlay();
    };

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart(e.clientX);
        stopAutoPlay();
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setTouchEnd(e.clientX);
    };

    const onMouseUp = () => {
        if (!isDragging) return;
        
        if (dragStart && touchEnd) {
            const distance = dragStart - touchEnd;
            const isLeftSwipe = distance > minSwipeDistance;
            const isRightSwipe = distance < -minSwipeDistance;

            if (isLeftSwipe) {
                handleNext();
            }
            if (isRightSwipe) {
                handlePrev();
            }
        }
        
        setIsDragging(false);
        setTouchEnd(null);
        startAutoPlay();
    };

    // Calculate transform based on index
    const getTransform = () => {
        const baseWidth = carouselRef.current?.clientWidth ?? 0;
        const cardWidth = (baseWidth / cardsPerView);
        const gapWidth = 20; // gap-4 = 1rem = 16px
        return `translateX(-${startIndex * (cardWidth + gapWidth)}px)`;
    };

    return (
        <div className="max-w-7xl bg-white mx-auto px-6 md:px-10 py-12 h-full py-20">
            <AnimateOnScroll animation="slideDown">
                <h2 className="text-2xl font-bold text-primary text-center mb-2">Our Success Story</h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={200}>
                <p className="text-lg text-black mb-2 text-left md:text-center">
                    Listen to what some of our students have to say about the impact of our programs and how it helps in their careers.
                </p>
            </AnimateOnScroll>
            <div className="relative">
                <div 
                    ref={carouselRef}
                    className="carousel-container"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    <div
                        className="flex gap-4 transition-transform duration-500 ease-in-out"
                        style={{ transform: getTransform() }}
                    >
                        {students.map((student, index) => (
                            <AnimateOnScroll 
                                key={index}
                                animation="slideUp"
                                delay={index * 100}
                                className="flex-shrink-0 w-full md:w-[calc(50%-8px)]"
                            >
                                <div className="border rounded-lg p-6 bg-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg h-full flex flex-col justify-between">
                                    <div className="text-center">
                                        <Quote className="mx-auto" />
                                        <p className="text-left px-4">{student.message}</p>
                                    </div>
                                    <div className="flex gap-4 md:gap-8 items-center mt-4">
                                        <img className="w-16 h-16 md:w-24 md:h-24 rounded-full" src={student.image} alt={student.name} />
                                        <div>
                                            <h2 className="font-bold text-primary">{student.name}</h2>
                                            <p className="text-gray-600">{student.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows - Always enabled */}
                <button
                    onClick={() => { handlePrev(); stopAutoPlay(); startAutoPlay(); }}
                    className="absolute left-10 top-1/5 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                    ←
                </button>
                <button
                    onClick={() => { handleNext(); stopAutoPlay(); startAutoPlay(); }}
                    className="absolute right-10 top-1/5 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-gray-200 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default SuccessStory;
