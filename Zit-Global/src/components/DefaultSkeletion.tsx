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
      className="text-white overflow-hidden flex items-center justify-center min-h-96 w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${BgMap})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-center">
        {/* Blinking Logo While Loading */}
        <img
          src={Logo}
          alt="Loading Logo"
          className={`w-60 h-20 transition-opacity duration-500 ${
            showLogo ? "opacity-100" : "opacity-20"
          }`}
        />
        <h2 className="text-lg font-roboto font-thin text-white">
          The School For Everyone
        </h2>
      </div>
    </div>
  );
};

export default DefaultSkeletonPage;
