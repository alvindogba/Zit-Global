import { useState, useEffect, useRef,} from "react";
import { Quote } from "lucide-react";
import AnimateOnScroll from "../../common/AnimateOnScroll";
import image1 from "../../../asset/images/Alfred.jpg";
import image2 from "../../../asset/images/Abel B. Winn.jpg";
import image3 from "../../../asset/images/Paulfina.jpg";
import image4 from "../../../asset/images/Alfred.jpg";
import image5 from "../../../asset/images/Student in tech Class.jpg";

const students = [
    { name: "John", message: `The Software Development course was a game-changer for me!`, role: "Software Developer", image: image1 },
    { name: "John", message: `I've always had an eye for design, but this course really helped me refine my skills.`, role: "Software Developer", image: image2 },
    { name: "John", message: `The Software Development course was a game-changer for me!`, role: "Software Developer", image: image3 },
    { name: "John", message: `The Cyber Security course gave me a deep understanding of how digital systems work.`, role: "Software Developer", image: image4 },
    { name: "John", message: `When I first signed up for the Software Development course, I wasn't sure if I'd be able to keep up.`, role: "Software Developer", image: image5 },
    { name: "John", message: `The Software Development course was a game-changer for me!`, role: "Software Developer", image: image1 },
    { name: "John", message: `The Software Development course was a game-changer for me!`, role: "Software Developer", image: image1 },

];

const SuccessStory = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(1);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateLayout = () => {
            setCardsPerView(window.innerWidth < 640 ? 1 : 2);
        };
        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    const handleNext = () => {
        setStartIndex(prev => (prev + 1 > students.length - cardsPerView ? prev : prev + 1));
    };

    const handlePrev = () => {
        setStartIndex(prev => (prev - 1 < 0 ? prev : prev - 1));
    };

    const getTransform = () => {
        const baseWidth = carouselRef.current?.clientWidth ?? 0;
        const cardWidth = baseWidth / cardsPerView;
        return `translateX(-${startIndex * (cardWidth + 20)}px)`;
    };

    return (
        <div className="width-full bg-white mx-auto px-6 md:px-10 h-full py-20">
            <AnimateOnScroll animation="slideDown">
                <h2 className="text-2xl font-noto font-bold text-primary text-center mb-2">Our Success Story</h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeIn" delay={200}>
                <p className="text-lg font-roboto text-black text-left md:text-center">
                    Listen to what some of our students have to say about the impact of our programs.
                </p>
            </AnimateOnScroll>
            <div className="relative">
                <div ref={carouselRef} className="carousel-container">
                    <div className="flex gap-2 transition-transform duration-500 ease-in-out" style={{ transform: getTransform() }}>
                        {students.map((student, index) => (
                            <AnimateOnScroll key={index} animation="slideUp" delay={index * 100} className="flex-shrink-0 w-full md:w-[calc(40%-8px)] mb-10">
                                <div className="border rounded-lg p-2 md:p-6 bg-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg h-full flex flex-col justify-between">
                                    <div className="text-center">
                                        <Quote className="mx-auto" />
                                        <p className="text-left font-roboto px-4">{student.message}</p>
                                    </div>
                                    <div className="flex gap-4 md:gap-8 items-center mt-4">
                                        <img className="w-16 h-16 md:w-24 md:h-24 rounded-full" src={student.image} alt={student.name} />
                                        <div>
                                            <h2 className="font-bold font-noto text-primary">{student.name}</h2>
                                            <p className="text-dparacolor  font-roboto">{student.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </div>
                <button onClick={handlePrev} disabled={startIndex === 0} className={`absolute left-0 md:left-10 bottom-10 md:top-1/5 md:-translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border-none outline-none transition-all duration-300 ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white'}`}>←</button>
                <button onClick={handleNext} disabled={startIndex + cardsPerView >= students.length} className={`absolute right-0 bottom-10 md:right-10 md:top-1/5 md:-translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-gray-100 transition-all duration-300 ${startIndex + cardsPerView >= students.length ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary hover:text-white'}`}>→</button>
            </div>
        </div>
    );
};

export default SuccessStory;
