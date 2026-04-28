import React, { useState } from "react";
import logo1 from "../../assets/img1.png";
import logo2 from "../../assets/logo_2.png";

const HeroSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleLogoClick = () => {
    setIsRevealed(true);
    window.dispatchEvent(new CustomEvent("heroRevealed", { detail: true }));
  };

  return (
    <div className="hero-wrapper relative w-screen h-screen overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Great+Vibes&display=swap');

        .hero-wrapper {
          perspective: 1200px;
        }

        .hero-logo-container {
          transition: all 3s ease-out;
          transform-origin: top center;
          transform-style: preserve-3d;
        }

        .hero-logo-container.revealed {
          transform: rotateX(90deg);
          opacity: 0;
          pointer-events: none;
        }

        .hero-content {
          transition: all 3s ease-out;
          transform-origin: bottom center;
          transform-style: preserve-3d;
          transform: rotateX(-90deg);
          opacity: 0;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }

        .hero-content.revealed {
          transform: rotateX(0deg);
          opacity: 1;
        }

        .hero-logo-img {
          cursor: pointer;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-logo-img:hover {
          opacity: 0.95;
        }
      `}</style>

      {/* Logo Section - Initial State */}
      <div
        className={`hero-logo-container absolute inset-0 w-screen h-screen flex items-center justify-center ${
          isRevealed ? "revealed" : ""
        }`}
      >
        <button
          onClick={handleLogoClick}
          className="w-full h-full p-0 border-0 bg-transparent focus:outline-none focus:ring-4 focus:ring-yellow-400"
          aria-label="Open invitation"
        >
          <img
            src={logo1}
            alt="Wedding invitation seal"
            className="hero-logo-img"
          />
        </button>
        <div className="absolute bottom-24 sm:bottom-12 text-center no-reveal">
          <button
            onClick={handleLogoClick}
            className="inline-block rounded-full px-6 py-3 border-0 bg-transparent cursor-pointer "
            aria-label="Open slide"
          >
            <div
              className="text-2xl sm:text-6xl font-bold tracking-widest text-white no-reveal"
              style={{
                fontFamily: "Great Vibes",
              }}
            >
              Click anywhere to open the slide
            </div>
          </button>
        </div>
      </div>

      {/* Hero Content Section - Revealed State */}
      <div
        className={`hero-content absolute inset-0 w-screen h-screen flex flex-col items-center justify-center ${
          isRevealed ? "revealed" : ""
        }`}
      >
        <div className="absolute top-8 left-0 right-0 px-6 text-center">
          <div className="inline-block rounded-full px-8 py-6 ">
            <p
              className="text-2xl sm:text-6xl rounded-full"
              style={{
                fontFamily: "Great Vibes",
                fontWeight: 800,
                color: "oklch(14.7% 0.004 49.3)",
                textShadow:
                  "0 0 5px rgba(212, 175, 55, 0.3), 0 0 10px rgba(212, 175, 55, 0.2), 0 2px 4px rgba(0,0,0,0.25)",
              }}
            >
              You are cordially invited for a beautiful night of celebration and
              love
            </p>
          </div>
        </div>
        <img src={logo2} alt="AS Logo" className="w-full h-full object-cover" />
        <div className="absolute bottom-16 left-0 right-0 px-6 text-center no-reveal">
          <div className="inline-block rounded-full px-8 py-4 ">
            <p
              className="text-2xl sm:text-6xl whitespace-nowrap no-reveal"
              style={{
                fontFamily: "Dancing Script",
                fontWeight: 800,
                color: "oklch(14.7% 0.004 49.3)",
                textShadow:
                  "0 0 5px rgba(212, 175, 55, 0.3), 0 0 10px rgba(212, 175, 55, 0.2), 0 2px 4px rgba(0,0,0,0.25)",
              }}
            >
              Aria's First Glamorous Year...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
