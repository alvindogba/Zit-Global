// src/components/Benefits.tsx
import React from "react";
import { FaChalkboardTeacher, FaSchool, FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyJoin: React.FC = () => {
    return (
        <section className="bg-white py-20 px-2 md:px-40">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col justify-between md:items-center">
                    {/* Left Side: Heading */}
                    <div className="mb-6 md:mb-0">
                        <h2 className="font-noto text-3xl font-bold text-black mb-4">
                            Why Teach at ZIT?
                        </h2>
                    </div>

                    {/* Right Side: Three Cards */}
                    <div className="w-full flex flex-col md:flex-row mt-6 gap-6">
                        {/* Card: For Educators */}
                        <div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <FaChalkboardTeacher className="text-5xl text-primary mx-auto mb-4" />
                            <h3 className="font-noto text-xl font-semibold text-primary text-center mb-4">
                                For Educators
                            </h3>
                            <div className="space-y-3 text-black">
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Competitive compensation and benefits package
                                </p>
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Professional development opportunities
                                </p>
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Supportive work environment
                                </p>
                            </div>
                        </div>

                        {/* Card: For Schools */}
                        <div className="flex-1 bg-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <FaSchool className="text-5xl text-primary mx-auto mb-4" />
                            <h3 className="font-noto text-xl font-semibold text-primary text-center mb-4">
                                For Schools
                            </h3>
                            <div className="space-y-3 text-black">
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Access to qualified, vetted teachers
                                </p>
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Flexible staffing solutions
                                </p>
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Reduced recruitment workload
                                </p>
                            </div>
                        </div>

                        {/* Card: For Students */}
                        <div className="flex-1 bg-green-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <FaUserGraduate className="text-5xl text-primary mx-auto mb-4" />
                            <h3 className="font-noto text-xl font-semibold text-primary text-center mb-4">
                                For Students
                            </h3>
                            <div className="space-y-3 text-black">
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    High-quality instruction
                                </p>
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Diverse teaching perspectives
                                </p>
                                <p className="font-roboto flex items-start">
                                    <span className="mr-2">•</span>
                                    Consistent learning experience
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Section two - Call to Action */}
            <div className="bg-white py-20 md:mx-20">
                <div className="w-full flex flex-col md:flex-row justify-between md:items-center">
                    {/* Left side */}
                    <div className="md:w-[50%] mb-6 md:mb-0">
                        <h2 className="font-noto text-3xl font-bold text-black mb-8">
                            Join Our Teaching Community
                        </h2>
                        <p className="font-roboto text-gray-700">
                            Ready to make an impact in education? Whether you're an experienced educator or a school looking for talent, we have opportunities for you.
                        </p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <Link to="/icc/teacher">
                            <button
                                className="font-sans w-full md:w-64 bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
                            >
                                Apply as a Teacher
                            </button>
                        </Link>
                        {/* <Link to="/school-partnership">
                            <button
                                className="font-sans w-full md:w-64 bg-secondary text-white font-semibold px-6 py-3 rounded-md hover:bg-secondary-dark transition-colors"
                            >
                                School Partnership
                            </button>
                        </Link>
                        <Link to="/teaching-faq">
                            <button
                                className="font-sans w-full md:w-64 border border-primary text-primary font-semibold px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Learn More
                            </button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyJoin;