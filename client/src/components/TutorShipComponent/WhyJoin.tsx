// src/components/Benefits.tsx
import React from "react";
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyJoin: React.FC = () => {
    return (
        <section className="bg-white py-20 px-2 md:px-40">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col  justify-between md:items-center">
                    {/* Left Side: Heading */}
                    <div className=" mb-6 md:mb-0">
                        <h2 className="font-noto text-3xl font-bold text-primary mb-4">
                            Why Join the ICC Tutorship Program?
                        </h2>
                    </div>

                    {/* Right Side: Two Cards */}
                    <div className="w-full flex flex-col md:flex-row mt-6 gap-4">
                        {/* Card: For Students */}
                        <div className="flex-1 bg-yellow-50 p-6 rounded shadow">
                            <FaGraduationCap className="text-6xl text-secondary  mb-2" />

                            <h3 className="font-noto text-xl font-semibold text-primary  mb-4">
                                For Students
                            </h3>
                            <div className="space-y-2 text-dparacolor">
                                <p className="font-roboto mb-2">Learn directly from industry experts</p>
                                <p className="font-roboto mb-2">Get career advice and networking opportunities</p>
                                <p className="font-roboto mb-2">Gain confidence and clarity about your future</p>
                            </div>
                        </div>

                        {/* Card: For Tutor */}
                        <div className="flex-1 bg-green-50 p-6 rounded shadow">
                            <FaChalkboardTeacher className="text-6xl text-secondary text-center mb-2" />

                            <h3 className="font-noto text-xl font-semibold text-primary  mb-4">
                                For Tutor
                            </h3>
                            <div className="space-y-2 text-dparacolor">
                                <p className="font-roboto mb-2">Make an impact by guiding young professionals</p>
                                <p className="font-roboto mb-2">Expand your leadership and coaching skills</p>
                                <p className="font-roboto mb-2">Give back to the next generation of talent</p>
                            </div>
                        </div>
                        {/* Last two cards ================================= */}
                        {/* Card: For Parents  */}
                        <div className="flex-1 bg-yellow-50 p-6 rounded shadow">
                            <FaGraduationCap className="text-6xl text-secondary  mb-2" />

                            <h3 className="font-noto text-xl font-semibold text-primary mb-4">
                                For Parents / Guardians
                            </h3>
                            <div className="space-y-2 text-dparacolor">
                                <p className="font-roboto mb-2">Understand how to support your child's growth</p>
                                <p className="font-roboto mb-2">Access resources to guide their career path</p>
                                <p className="font-roboto mb-2">Connect with other families and experts</p>
                            </div>
                        </div>

                        {/* Card: For School Admin */}
                        <div className="flex-1 bg-green-50 p-6 rounded shadow">
                            <FaChalkboardTeacher className="text-6xl text-secondary   mb-2" />

                            <h3 className="font-noto text-xl font-semibold text-primary  mb-4">
                                For School Administration
                            </h3>
                            <div className="space-y-2 text-dparacolor">
                                <p className="font-roboto mb-2">Align programs with curriculum goals</p>
                                <p className="font-roboto mb-2">Monitor students progress and outcomes</p>
                                <p className="font-roboto mb-2">Foster partnerships with industry leaders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section two  */}

            <div className="bg-white py-20 md:mx-20">
                <div className=" w-full flex flex-col md:flex-row   justify-between  md:items-center">
                    {/* Left side  */}
                    <div className="md:w-[50%] mb-6 md:mb-0">
                        <h2 className="font-noto text-3xl font-bold text-primary mb-8">
                            We provide supportive learnning that gets results
                        </h2>
                        <p className="font-roboto text-dparacolor">Are you desiring to explore and know more?
                            Tell us more about who is requesting Tutoring
                        </p>
                    </div>

                    {/* Right side  */}
                    <div className=" flex flex-col  gap-2">
                     
                        <Link to="/icc-student">
                            <button
                                className="font-sans w-full bg-secondary text-white hover:font-semibold px-3 py-2 rounded-md hover:bg-primary"
                            >
                            I'm a Student
                            </button>
                        </Link>                    
                        <Link to="/icc/parent-guardian">
                            <button
                                className="font-sans w-full bg-secondary text-white hover:font-semibold px-3 py-2 rounded-md hover:bg-primary"
                            >
                                I'm a Parent or Guardian
                            </button>
                        </Link>
                        <Link to="/icc/administration">
                            <button
                                className="font-sans w-full bg-secondary text-white hover:font-semibold px-3 py-2 rounded-md hover:bg-primary"
                            >
                                I'm a School Administration
                            </button>
                        </Link>
                     
                    </div>


                </div>

            </div>
        </section>
    );
};

export default WhyJoin;
