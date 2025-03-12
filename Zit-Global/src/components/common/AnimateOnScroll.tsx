import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
    children: React.ReactNode;
    animation: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
    delay?: number;
    className?: string;
}

const AnimateOnScroll = ({ children, animation, delay = 0, className = '' }: AnimateOnScrollProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    const getAnimationClass = () => {
        if (!isVisible) {
            return 'opacity-0';
        }

        const baseTransition = `transition-all duration-1000 ease-out`;
        const delayClass = delay ? `delay-[${delay}ms]` : '';

        switch (animation) {
            case 'fadeIn':
                return `${baseTransition} ${delayClass} opacity-100`;
            case 'slideUp':
                return `${baseTransition} ${delayClass} opacity-100 translate-y-0`;
            case 'slideDown':
                return `${baseTransition} ${delayClass} opacity-100 translate-y-0`;
            case 'slideLeft':
                return `${baseTransition} ${delayClass} opacity-100 translate-x-0`;
            case 'slideRight':
                return `${baseTransition} ${delayClass} opacity-100 translate-x-0`;
            default:
                return '';
        }
    };

    const getInitialClass = () => {
        switch (animation) {
            case 'slideUp':
                return 'translate-y-20';
            case 'slideDown':
                return '-translate-y-20';
            case 'slideLeft':
                return '-translate-x-20';
            case 'slideRight':
                return 'translate-x-20';
            default:
                return '';
        }
    };

    return (
        <div
            ref={elementRef}
            className={`${className} ${getInitialClass()} ${getAnimationClass()}`}
        >
            {children}
        </div>
    );
};

export default AnimateOnScroll;
