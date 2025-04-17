import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";

export default function CancelButton() {
  const navigate = useNavigate();

  // Navigate to home function
  const cancelAndGoHome = () => {
    navigate("/");
  };

  return (
    <button
      onClick={cancelAndGoHome}
      className="fixed shadow-black/50 right-6 top-6 z-50 md:p-3 p-2 rounded-full bg-red-500 text-white shadow-lg transition-opacity duration-300 
        hover:bg-red-600 focus:outline-none"
      aria-label="Cancel and go home"
    >
      <FaXmark />
    </button>
  );
}