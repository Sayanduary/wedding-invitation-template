import React, { useEffect, useRef, useState } from "react";
import HeroSection from "./components/pages/HeroSection";
import Reveal from "./components/pages/Reveal";
import CountdownAndVenue from "./components/pages/CountdownAndVenue";
import DressCode from "./components/pages/DressCode";
import Transport from "./components/pages/Transport";
import ThankYou from "./components/pages/ThankYou";

const GLOBAL_FLOWER_COUNT = 36;
const GLOBAL_FLOWER_DURATION_MS = 7000;

const generateGlobalFlowerParticles = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    size: 18 + Math.random() * 24,
    duration: 6 + Math.random() * 7,
    delay: Math.random() * 1.8,
    sway: 30 + Math.random() * 70,
    rotateStart: Math.random() * 180,
    rotateEnd: 180 + Math.random() * 360,
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
    <div className="font-sans antialiased text-gray-800 selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      <style>
        {`
          .global-flower-rain {
            z-index: 80;
          }

          .global-flower-drop {
            position: absolute;
            top: -12%;
            display: block;
            opacity: 0;
            will-change: transform, opacity;
            animation: global-flower-fall linear forwards;
          }

          .global-flower-sway {
            display: block;
            width: 100%;
            height: 100%;
            will-change: transform, rotate;
            animation: global-flower-sway ease-in-out infinite, global-flower-rotate linear infinite;
            animation-duration: 3.2s, 4.5s;
            animation-delay: 0s, 0s;
          }

          .global-flower-core {
            position: relative;
            width: 100%;
            height: 100%;
            filter: drop-shadow(0 4px 6px rgba(216, 80, 130, 0.25));
          }

          .global-flower-petal {
            position: absolute;
            inset: 34% 22% 34% 22%;
            border-radius: 50% 50% 45% 45%;
            background: radial-gradient(circle at 35% 35%, #fff0f5 0%, #f4abc4 40%, #e05e8d 80%, #c93b6e 100%);
            transform-origin: center;
          }

          .global-flower-petal:nth-child(1) { transform: rotate(0deg) translateY(-42%); }
          .global-flower-petal:nth-child(2) { transform: rotate(60deg) translateY(-42%); }
          .global-flower-petal:nth-child(3) { transform: rotate(120deg) translateY(-42%); }
          .global-flower-petal:nth-child(4) { transform: rotate(180deg) translateY(-42%); }
          .global-flower-petal:nth-child(5) { transform: rotate(240deg) translateY(-42%); }
          .global-flower-petal:nth-child(6) { transform: rotate(300deg) translateY(-42%); }

          .global-flower-center {
            position: absolute;
            inset: 34%;
            border-radius: 50%;
            background: radial-gradient(circle at 35% 35%, #fffbe6 0%, #fad15c 50%, #e09f00 100%);
            box-shadow: 0 0 10px rgba(250, 209, 92, 0.6), inset 0 -2px 4px rgba(224, 159, 0, 0.4);
          }

          @keyframes global-flower-fall {
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

          @keyframes global-flower-sway {
            0%, 100% {
              transform: translateX(0);
            }
            33% {
              transform: translateX(var(--sway));
            }
            66% {
              transform: translateX(calc(var(--sway) * -0.75));
            }
          }

          @keyframes global-flower-rotate {
            from {
              rotate: var(--rotate-start);
            }
            to {
              rotate: var(--rotate-end);
            }
          }
        `}
      </style>

      {showGlobalFlowerRain && (
        <div
          className="global-flower-rain pointer-events-none fixed inset-0"
          aria-hidden="true"
        >
          {globalFlowerParticles.map((particle) => (
            <div
              key={particle.id}
              className="global-flower-drop"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            >
              <div
                className="global-flower-sway"
                style={{
                  animationDelay: `${particle.delay}s, ${particle.delay}s`,
                  "--sway": `${particle.sway}px`,
                  "--rotate-start": `${particle.rotateStart}deg`,
                  "--rotate-end": `${particle.rotateEnd}deg`,
                }}
              >
                <div className="global-flower-core" aria-hidden="true">
                  <span className="global-flower-petal" />
                  <span className="global-flower-petal" />
                  <span className="global-flower-petal" />
                  <span className="global-flower-petal" />
                  <span className="global-flower-petal" />
                  <span className="global-flower-petal" />
                  <span className="global-flower-center" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <HeroSection />
      <Reveal />
      <CountdownAndVenue />
      <Transport />
      <DressCode />
      <ThankYou />
    </div>
  );
}

export default App;
