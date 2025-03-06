import { Link } from "react-router-dom";

export default function CopyRight () {
  return (
    <div className="bg-primary text-white py-4 w-full text-center mt-20">
      <hr className='border border-gray-500 w-[90%] mb-3 mx-auto' />
      <p className="text-xs flex justify-center items-center">© {new Date().getFullYear()} Zongea Institute of Technology<span className='w-4 h-[1px] mx-2 bg-secondary-yellow'></span> <Link to="https://walameninstitute.com" target="_blank">a Walamen Institute</Link></p>
    </div>
  );
}