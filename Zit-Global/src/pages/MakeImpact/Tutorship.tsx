import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaChalkboardTeacher, FaSearch, FaArrowRight, FaGlobe, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa';
import img1 from '../../asset/images/Graduation-Bg-Img.jpg';
import img2 from '../../asset/images/herobg3.jpg';
import img3 from '../../asset/images/herobg2.jpg';
const GetMentorShip = () => {
    const [activeTab, setActiveTab] = useState('find');
    const [showForm, setShowForm] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Slideshow images and content
    const slides = [
        {
            image: img1,
            alt: "Students learning together",
            placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiJRslKigvLykmKy0wMTU5ODYyPS0xOj5FREVUVFZaX2BfYUlEZWlpZ2n/2wBDARUXFx4aHh4pISE9MyU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        },
        {
            image: img2,
            alt: "Mentor guiding student",
            placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiJRslKigvLykmKy0wMTU5ODYyPS0xOj5FREVUVFZaX2BfYUlEZWlpZ2n/2wBDARUXFx4aHh4pISE9MyU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        },
        {
            image: img3,
            alt: "Group mentorship session",
            placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHyAiJRslKigvLykmKy0wMTU5ODYyPS0xOj5FREVUVFZaX2BfYUlEZWlpZ2n/2wBDARUXFx4aHh4pISE9MyU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        }
    ];

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 10000); // Change slide every 10 seconds

        return () => clearInterval(timer);
    }, []);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        community: '',
        expertise: '',
        motivation: '',
        interests: '',
        goals: '',
        preferredSchedule: '',
        mentorPreferences: ''
    });

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, []);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Image Slideshow */}
            <div className="relative h-[80vh] pt-28 md:pt-10 overflow-hidden">
                {/* Slideshow */}
                <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div 
                                className="w-full h-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slides[currentSlide].image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'
                                }}
                            >
                                {/* Placeholder for progressive loading */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center blur-xl"
                                    style={{
                                        backgroundImage: `url(${slides[currentSlide].placeholder})`,
                                        opacity: 0
                                    }}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-primary opacity-80 blur-xl" />
                
                {/* Content */}
                <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-1 sm:px-1">
                        <motion.div 
                            className="max-w-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                                Connect. Learn. Grow.
                            </h1>
                            <p className="text-xl sm:text-2xl text-white/90 mb-8 sm:mb-12">
                                Join our mentorship community and be part of something extraordinary.
                            </p>

                            {/* Slide indicators */}
                            <div className="flex gap-2 mb-6 sm:mb-8">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            currentSlide === index 
                                                ? 'bg-white w-6' 
                                                : 'bg-white/50'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Glass Effect Tabs */}
                            <div className="flex  flex-col w-fit sm:flex-row bg-[#1c1752]/30 backdrop-blur-xl rounded-2xl border border-[#1c1752]/30">
                                <button
                                    onClick={() => setActiveTab('find')}
                                    className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl transition-all border-none outline-none ${
                                        activeTab === 'find'
                                            ? 'bg-white text-primary'
                                            : 'text-white hover:bg-[#1c1752]/50'
                                    }`}
                                >
                                    Find a Mentor
                                </button>
                                <button
                                    onClick={() => setActiveTab('become')}
                                    className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-xl transition-all border-none outline-none ${
                                        activeTab === 'become'
                                            ? 'bg-white text-primary'
                                            : 'text-white hover:bg-[#1c1752]/50'
                                    }`}
                                >
                                    Become a Mentor
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="container mx-auto px-4 sm:px-6 py-20">
                {activeTab === 'find' ? (
                    <motion.div {...fadeIn}>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold text-gray-900">
                                    Find Your Perfect Mentor
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Connect with experienced professionals who can guide you through your journey.
                                </p>
                                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg space-y-4 border border-gray-100">
                                    <div className="flex items-center gap-4 text-gray-700">
                                        <FaSearch className="w-6 h-6 text-primary" />
                                        <span>Browse mentors by expertise</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-700">
                                        <FaUserGraduate className="w-6 h-6 text-primary" />
                                        <span>Schedule one-on-one sessions</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-700">
                                        <FaArrowRight className="w-6 h-6 text-primary" />
                                        <span>Track your progress</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    Get Started
                                </button>
                            </div>
                            <div className="relative">
                                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Featured Mentors</h3>
                                    <div className="space-y-6">
                                        {[1, 2, 3].map((_, index) => (
                                            <div key={index} className="flex items-center gap-4 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">John Doe</h4>
                                                    <p className="text-gray-600">Senior Software Engineer</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div {...fadeIn}>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-bold text-gray-900">
                                    Share Your Expertise
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Help shape the future by becoming a mentor and sharing your knowledge.
                                </p>
                                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg space-y-4 border border-gray-100">
                                    <div className="flex items-center gap-4 text-gray-700">
                                        <FaChalkboardTeacher className="w-6 h-6 text-primary" />
                                        <span>Create your mentor profile</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-700">
                                        <FaUserGraduate className="w-6 h-6 text-primary" />
                                        <span>Connect with mentees</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-700">
                                        <FaArrowRight className="w-6 h-6 text-primary" />
                                        <span>Make a difference</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    Apply Now
                                </button>
                            </div>
                            <div className="relative">
                                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Become a Mentor?</h3>
                                    <div className="space-y-6">
                                        {['Share Knowledge', 'Build Network', 'Make Impact'].map((item, index) => (
                                            <div key={index} className="bg-gray-50/80 p-6 rounded-xl border border-gray-100">
                                                <h4 className="font-semibold text-gray-900 mb-2">{item}</h4>
                                                <p className="text-gray-600">Help others learn and grow while expanding your own horizons</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* How It Works Section */}
            <section className="py-12 sm:py-20 relative overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="container mx-auto px-4 sm:px-6 relative">
                    <motion.div 
                        className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-12 border border-gray-100 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">How It Works</h2>
                        <p className="text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
                            Our mentorship program follows a simple, effective process to connect mentors and mentees
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center relative">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-primary">1</span>
                                </div>
                                {/* Desktop connector line - hidden on mobile */}
                                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-primary/20" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up</h3>
                                <p className="text-gray-600">
                                    Create your profile as either a mentor or mentee. Tell us about your expertise or learning goals.
                                </p>
                            </div>

                            <div className="text-center relative">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-primary">2</span>
                                </div>
                                {/* Desktop connector line - hidden on mobile */}
                                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-primary/20" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Matched</h3>
                                <p className="text-gray-600">
                                    Our system matches you with the perfect mentor or mentee based on goals, expertise, and location.
                                </p>
                            </div>

                            <div className="text-center relative">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-primary">3</span>
                                </div>
                                {/* Desktop connector line - hidden on mobile */}
                                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-primary/20" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect</h3>
                                <p className="text-gray-600">
                                    Schedule your first meeting and start your mentorship journey together.
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-primary">4</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Grow Together</h3>
                                <p className="text-gray-600">
                                    Meet regularly, track progress, and achieve your goals with ongoing support.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 sm:mt-12 text-center">
                            <button
                                onClick={() => setShowForm(true)}
                                className="bg-primary text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                            >
                                Start Your Journey
                                <FaArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Future Vision Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div 
                        className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-gray-100 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Vision for the Future</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="bg-gray-50/80 p-8 rounded-xl border border-gray-100">
                                    <FaRocket className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Expanding Our Reach</h3>
                                    <p className="text-gray-600">
                                        We aim to bring mentorship opportunities to underserved communities worldwide,
                                        breaking down barriers to education and professional development.
                                    </p>
                                </div>
                                <div className="bg-gray-50/80 p-8 rounded-xl border border-gray-100">
                                    <FaLightbulb className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation in Learning</h3>
                                    <p className="text-gray-600">
                                        Implementing cutting-edge technology to create more effective and engaging
                                        mentorship experiences through AI-powered matching and virtual reality sessions.
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gray-50/80 p-8 rounded-xl border border-gray-100">
                                    <FaUsers className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Building Communities</h3>
                                    <p className="text-gray-600">
                                        Creating lasting networks of professionals and learners who support
                                        each other's growth and development across industries and borders.
                                    </p>
                                </div>
                                <div className="bg-gray-50/80 p-8 rounded-xl border border-gray-100">
                                    <FaGlobe className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Impact</h3>
                                    <p className="text-gray-600">
                                        Fostering cross-cultural exchange and understanding through
                                        international mentorship programs and cultural initiatives.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {activeTab === 'find' ? 'Find a Mentor' : 'Become a Mentor'}
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Form content - update grid columns for mobile */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Location Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="e.g., Liberia"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">State/Region</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="e.g., Montserrado"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2">Community</label>
                                    <input
                                        type="text"
                                        name="community"
                                        value={formData.community}
                                        onChange={handleChange}
                                        placeholder="e.g., Paynesville"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Conditional Fields */}
                            {activeTab === 'become' ? (
                                // Mentor-specific fields
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Area of Expertise</label>
                                        <input
                                            type="text"
                                            name="expertise"
                                            value={formData.expertise}
                                            onChange={handleChange}
                                            placeholder="e.g., Software Development, Business Management"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Why do you want to be a mentor?</label>
                                        <textarea
                                            name="motivation"
                                            value={formData.motivation}
                                            onChange={handleChange}
                                            placeholder="Share your motivation and what you hope to contribute as a mentor"
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </>
                            ) : (
                                // Mentee-specific fields
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Areas of Interest</label>
                                        <input
                                            type="text"
                                            name="interests"
                                            value={formData.interests}
                                            onChange={handleChange}
                                            placeholder="e.g., Web Development, Machine Learning, UI/UX Design"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">What are your learning goals?</label>
                                        <textarea
                                            name="goals"
                                            value={formData.goals}
                                            onChange={handleChange}
                                            placeholder="Describe what you hope to achieve through mentorship"
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Schedule</label>
                                        <input
                                            type="text"
                                            name="preferredSchedule"
                                            value={formData.preferredSchedule}
                                            onChange={handleChange}
                                            placeholder="e.g., Weekends, Weekday evenings"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Mentor Preferences</label>
                                        <textarea
                                            name="mentorPreferences"
                                            value={formData.mentorPreferences}
                                            onChange={handleChange}
                                            placeholder="Describe your ideal mentor (expertise areas, teaching style, etc.)"
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                {activeTab === 'find' ? 'Submit Request' : 'Submit Application'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default GetMentorShip;
