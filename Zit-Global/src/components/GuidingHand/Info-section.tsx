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
                    < div className="hidden md:block md:relative right-[15rem] text-3xl font-bold text-blue-900 mb-6 bg-gray-100 py-4 px-12 hover:scale-105 hover:shadow-lg transition-transform duration-200 ">Why ICC Matters?</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">What is the Guiding Hands Program?</h2>


                    <ul className="mt-4 text-gray-600">
                        <li className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-4 bg-gray-400"></div>
                            <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lortm</p>
                        </li>
                        <li className="flex items-center space-x-4 mb-4">
                            <div className="w-3 h-4 bg-gray-400"></div>
                            <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lortm</p>
                        </li>
                        <li className="flex items-center space-x-4 ">
                            <div className="w-3 h-4 bg-gray-400"></div>
                            <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lortm</p>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
