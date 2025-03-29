import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import AnimateOnScroll from "../../common/AnimateOnScroll";
import image1 from "../../../asset/images/Alfred.jpg";
import image2 from "../../../asset/images/Abel B. Winn.jpg";
import image3 from "../../../asset/images/Paulfina.jpg";
import image4 from "../../../asset/images/Jarkuno.jpg";
import image5 from "../../../asset/images/ZIT-LOGO-White.png"

const SuccessStory = () => {
    const students = [
        { 
            name: "Omega B. Momo", 
            message: "ZIT’s comprehensive Web Development program gave me a solid foundation in coding and web design. Being here made a difference…", 
            role: "Web Development", 
            image: image5 
        },
        { 
            name: "Abel B. Winn", 
            message: "Learning starts with structured lessons led by experienced instructors. We focus on hands-on, practical training in tech, ensuring students gain in-depth knowledge and concepts.", 
            role: "Graphic Design", 
            image: image2 
        },
        { 
            name: "William Jarkuno", 
            message: "The Graphic Design program at ZIT provided me with the technical and creative skills", 
            role: "Graphic Design", 
            image: image4 
        },
        { 
            name: "Evelyn Yoko", 
            message: "I can now use Microsoft Office Suite like a pro because of the ZIT program. I’m thankful to ZIT for the skills I gained.", 
            role: "Microsoft Office Suite", 
            image: image5
        },
        { 
            name: "Alfred Weah", 
            message: "Learning starts with structured lessons led by experienced instructors. We focus on delivering hands-on, practical training in technology, ensuring students gain in-depth knowledge of essential tools and concepts.", 
            role: "Graphic Design", 
            image: image1 
        },
        { 
            name: "William Jarkuno", 
            message: "The Software Development course was a game-changer for me! The practical approach helped me land my first developer job.", 
            role: "Software Developer", 
            image: image4 
        },
        { 
            name: "Paulfina Neeo", 
            message: "ZIT’s Design program gave me the skills to create my own projects and collaborate with others. The practical approach and ongoing support helped me push my boundaries.", 
            role: "Graphic Design", 
            image: image3 
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Create extended array for seamless looping
    const extendedStudents = [...students, ...students, ...students];

    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev + 1;
            if (newIndex >= students.length * 2) {
                // When we reach the end of extended array, reset to middle
                return students.length;
            }
            return newIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - 1;
            if (newIndex < 0) {
                // When we go before start, reset to middle
                return students.length - 1;
            }
            return newIndex;
        });
    };

    // Handle auto-slide and reset position when needed
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Reset to middle section when at edges
    useEffect(() => {
        if (currentIndex >= students.length * 2) {
            setTimeout(() => {
                setCurrentIndex(students.length);
            }, 50);
        } else if (currentIndex < 0) {
            setTimeout(() => {
                setCurrentIndex(students.length - 1);
            }, 50);
        }
    }, [currentIndex]);

    // Calculate visible index (for dots)
    const visibleIndex = currentIndex % students.length;

    return (
        <div className="w-full bg-white mx-auto px-6 md:px-10 h-full py-20 overflow-hidden">
            <AnimateOnScroll animation="slideDown">
                <h2 className="text-3xl font-noto font-bold text-primary text-center mb-4">Our Success Story</h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={200}>
                <p className="text-lg font-roboto text-dparacolor text-center max-w-3xl mx-auto mb-12">
                    The Zongea Institute of Technology provides aspiring tech professionals with the skills and knowledge to succeed. 
                    Discover why our students choose ZIT, how they're making a difference in Liberia, and why so many of our graduates 
                    return to teach, mentor, and inspire the next generation.
                </p>
            </AnimateOnScroll>

            <div className="relative w-full max-w-4xl mx-auto">
                {/* Carousel container */}
                <div className="relative h-96 overflow-hidden" ref={carouselRef}>
                    <div className="flex items-center justify-center h-full">
                        {extendedStudents.map((student, index) => {
                            const offset = index - currentIndex;
                            const absOffset = Math.abs(offset);
                            const scale = absOffset > 0 ? 0.85 : 1;
                            const opacity = absOffset > 0 ? 0.6 : 1;
                            const blur = absOffset > 0 ? 'blur-sm' : '';
                            const zIndex = extendedStudents.length - absOffset;
                            const transform = `translateX(${offset * 30}%) scale(${scale})`;
                            
                            return (
                                <div 
                                    key={`${student.name}-${index}`}
                                    className={`absolute transition-all duration-500 ease-in-out ${blur}`}
                                    style={{
                                        transform,
                                        opacity,
                                        zIndex,
                                        width: '80%',
                                        maxWidth: '400px',
                                        left: '50%',
                                        marginLeft: '-200px' // Half of maxWidth
                                    }}
                                >
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-6 mx-auto h-full">
                                        <div className="flex justify-center w-full">
                                            <Quote className="text-secondary my-1" size={24} />
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-roboto text-gray-700 italic text-sm md:text-base">
                                                {student.message}
                                            </p>
                                        </div>
                                        <div className="flex justify-start items-center gap-4 pt-4">
                                            <img 
                                                src={student.image} 
                                                alt={student.name} 
                                                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="font-noto text-base md:text-lg font-bold text-primary">{student.name}</h4>
                                                <p className="font-roboto text-gray-600 text-xs md:text-sm">{student.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors z-20"
                >
                    &#10094;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors z-20"
                >
                    &#10095;
                </button>

                {/* Dots indicator - uses visibleIndex instead of currentIndex */}
                <div className="flex justify-center mt-8">
                    {students.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index + students.length)}
                            className={`w-3 h-3 mx-2 rounded-full transition-colors ${index === visibleIndex ? 'bg-primary' : 'bg-gray-300'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStory;