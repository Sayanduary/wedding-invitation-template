import React, { useEffect } from "react";
import HeroSection from "./components/pages/HeroSection";
import Reveal from "./components/pages/Reveal";
import CountdownAndVenue from "./components/pages/CountdownAndVenue";
import DressCode from "./components/pages/DressCode";
import Transport from "./components/pages/Transport";
import ThankYou from "./components/pages/ThankYou";

function App() {
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

  return (
    <div className="relative overflow-x-hidden bg-gradient-to-br from-red-50 via-red-100 to-red-200 font-sans antialiased text-gray-800 selection:bg-pink-200 selection:text-pink-900">
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
