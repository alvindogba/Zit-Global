import img from "../../asset/images/OT image .jpg"
// src/components/InfoSection.tsx
export default function InfoSection() {
    return (
        <section className="py-20 px-4 md:px-40  bg-gray-100 ">
            <div className=" mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Left Image */}
                <div className="md:w-[35%] bg-white">
                    <img src={img} alt="Speaker" className="rounded-lg shadow-lg h-[40rem] w-[100%] max-h-[400px]" />
                </div>

                {/* Right Text */}
                <div className=" w-full md:w-[60%] px-6 mt-6 md:mt-0">
                    
                    <h2 className="font-noto text-2xl md:text-3xl font-bold text-primary mb-6">What is the Impact & Connect Center Program?</h2>
                    <p className="text-dparacolor text-md">
                    This initiative bridges the education gap by fostering a cycle of knowledge, sharing and opportunity.</p>
                    <ul className="mt-4 text-dparacolor w-full">
                        <li className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-3 bg-secondary rounded-full"></div>
                            <div>
                                <h3 className="text-primary text-md text-bold font-noto">Close the Skills Gap</h3>
                                <p className="text-dparacolor font-roboto">Provides accessible, practical education to underserved communities.</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-3 bg-secondary rounded-full"></div>
                            <div>
                                <h3 className="text-primary text-md text-bold font-noto">Build a Learning Ecosystem</h3>
                                <p className="text-dparacolor font-roboto">Creates a culture where education doesn’t end at graduation, it grows.</p>
                            </div>
                        </li>
                        <li className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-3 bg-secondary rounded-full"></div>
                            <div>
                                <h3 className="text-primary text-md text-bold font-noto">Multiply Impact</h3>
                                <p className="text-dparacolor font-roboto">Graduates become teachers, mentors, and leaders, ensuring the next generation thrives.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
