import React, { useEffect, useRef, useState } from "react";
import HeroSection from "./components/pages/HeroSection";
import Reveal from "./components/pages/Reveal";
import CountdownAndVenue from "./components/pages/CountdownAndVenue";
import DressCode from "./components/pages/DressCode";
import Transport from "./components/pages/Transport";
import ThankYou from "./components/pages/ThankYou";

const GLOBAL_FLOWER_COUNT = 36;
const GLOBAL_FLOWER_DURATION_MS = 7000;
const GLOBAL_DOT_COLORS = [
  "#ef476f",
  "#7b61ff",
  "#f9c74f",
  "#4d7cff",
  "#43a047",
];

const generateGlobalFlowerParticles = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    size: 16 + Math.random() * 9,
    duration: 6 + Math.random() * 7,
    delay: Math.random() * 1.8,
    sway: 18 + Math.random() * 42,
    color: GLOBAL_DOT_COLORS[index % GLOBAL_DOT_COLORS.length],
  }));

function App() {
  const stopFlowerRainTimerRef = useRef(null);
  const [showGlobalFlowerRain, setShowGlobalFlowerRain] = useState(false);
  const [globalFlowerParticles, setGlobalFlowerParticles] = useState([]);

  useEffect(() => {
    const textSelectors = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "label",
      "li",
      "button",
      "a",
    ].join(", ");

    const textNodes = Array.from(document.querySelectorAll(textSelectors));
    textNodes.forEach((node) => node.classList.add("text-reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("text-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    textNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const triggerGlobalFlowerRain = () => {
      setGlobalFlowerParticles(
        generateGlobalFlowerParticles(GLOBAL_FLOWER_COUNT),
      );
      setShowGlobalFlowerRain(true);

      if (stopFlowerRainTimerRef.current) {
        window.clearTimeout(stopFlowerRainTimerRef.current);
      }

      stopFlowerRainTimerRef.current = window.setTimeout(() => {
        setShowGlobalFlowerRain(false);
      }, GLOBAL_FLOWER_DURATION_MS);
    };

    window.addEventListener("wedding:flowerRain", triggerGlobalFlowerRain);

    return () => {
      window.removeEventListener("wedding:flowerRain", triggerGlobalFlowerRain);
      if (stopFlowerRainTimerRef.current) {
        window.clearTimeout(stopFlowerRainTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative font-sans antialiased text-gray-800 selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden bg-[#f7f2e9]">
      <style>
        {`
          .app-paper-base {
            background:
              radial-gradient(circle at top, rgba(255, 252, 247, 0.95), rgba(247, 242, 233, 0.98) 48%, rgba(241, 233, 221, 1) 100%);
          }

          .app-paper-speckle {
            background-image: radial-gradient(rgba(92, 74, 56, 0.18) 0.8px, transparent 0.8px);
            background-size: 10px 10px;
          }

          .global-dot-rain {
            z-index: 80;
          }

          .global-dot-drop {
            position: absolute;
            display: block;
            opacity: 0;
            will-change: transform, opacity;
            animation: global-dot-fall linear forwards;
          }

          .global-dot-sway {
            display: block;
            width: 100%;
            height: 100%;
            will-change: transform;
            animation: global-dot-sway ease-in-out infinite;
            animation-duration: 3.2s;
          }

          .global-dot-core {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .global-dot-shape {
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
          }

          @keyframes global-dot-fall {
            0% {
              opacity: 0;
              transform: translate3d(0, -10vh, 0);
            }
            15% {
              opacity: 0.95;
            }
            85% {
              opacity: 0.95;
            }
            100% {
              opacity: 0;
              transform: translate3d(0, 120vh, 0);
            }
          }

          @keyframes global-dot-sway {
            0%,
            100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(var(--sway));
            }
          }
        `}
      </style>

      <div
        className="pointer-events-none fixed inset-0 z-0 app-paper-base"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 app-paper-speckle opacity-35"
        aria-hidden="true"
      />

      {showGlobalFlowerRain && (
        <div
          className="global-dot-rain pointer-events-none fixed inset-0"
          aria-hidden="true"
        >
          {globalFlowerParticles.map((particle) => (
            <div
              key={particle.id}
              className="global-dot-drop"
              style={{
                left: `${particle.left}%`,
                top: `-${particle.size}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            >
              <div
                className="global-dot-sway"
                style={{
                  "--sway": `${particle.sway}px`,
                  color: particle.color,
                }}
              >
                <div className="global-dot-core" aria-hidden="true">
                  <span
                    className="global-dot-shape"
                    style={{ backgroundColor: particle.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        <HeroSection />
        <Reveal />
        <CountdownAndVenue />

        <DressCode />
        <ThankYou />
      </div>
    </div>
  );
}

export default App;
