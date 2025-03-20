import { useEffect, useState } from "react";
import Logo from "../asset/images/zongea-logo.png";
import BgMap from "../asset/images/basic_earth_map_continents_Basic Earth Map Continents.svg";

const DefaultSkeletonPage = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Make logo blink while loading
    const blinkInterval = setInterval(() => {
      setShowLogo((prev) => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(blinkInterval); // Cleanup when component unmounts
  }, []);

  return (
    <div
      className="text-white  transition-all duration-700 flex items-center flex-col justify-center h-screen w-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${BgMap})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blinking Logo While Loading */}
      <img
        src={Logo}
        alt="Loading Logo"
        className={`w-60 h-20 transition-opacity duration-500 ${
          showLogo ? "opacity-100" : "opacity-20"
        }`}
      />
      <h2 className="text-2xl font-bold mb-6 text-white">
        The School For Everyone
      </h2>
    </div>
  );
};

export default DefaultSkeletonPage;
