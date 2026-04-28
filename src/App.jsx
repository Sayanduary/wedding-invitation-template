import React, { useEffect, useState } from "react";
import HeroSection from "./components/pages/HeroSection";
import Reveal from "./components/pages/Reveal";
import CountdownAndVenue from "./components/pages/CountdownAndVenue";
import DressCode from "./components/pages/DressCode";
import Transport from "./components/pages/Transport";
import ThankYou from "./components/pages/ThankYou";

function App() {
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    // Lock scrolling initially
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleHeroRevealed = () => {
      setHeroRevealed(true);
      // Unlock scrolling when hero is revealed
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };

    window.addEventListener("heroRevealed", handleHeroRevealed);

    return () => {
      window.removeEventListener("heroRevealed", handleHeroRevealed);
      // Clean up - unlock if component unmounts
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);
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

    const textNodes = Array.from(document.querySelectorAll(textSelectors)).filter(
      (node) => !node.closest(".no-reveal")
    );
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

  return (
    <div
      className="relative overflow-x-hidden font-sans antialiased text-gray-800"
      style={{
        backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
      }}
    >
      <style></style>

      <div
        className="pointer-events-none fixed inset-0 z-0 border border-white/0 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.005)_28%,rgba(255,255,255,0.015)_100%)] shadow-none backdrop-blur-[36px]"
        aria-hidden="true"
      />

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
