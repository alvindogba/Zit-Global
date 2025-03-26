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

                    <ul className="mt-4 text-gray-600">
                        <li className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-4 bg-gray-400"></div>
                            <p>Our Impact & Connect Center Program bridges the education gap in Liberia.</p>
                        </li>
                        <li className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-4 bg-gray-400"></div>
                            <p>It creates a culture of continuous learning.</p>
                        </li>
                        <li className="flex items-center space-x-4 ">
                            <div className="w-3 h-4 bg-gray-400"></div>
                            <p>Graduates pay it forward by becoming educators, tutors, or mentors.</p>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
