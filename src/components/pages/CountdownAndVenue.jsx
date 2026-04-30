import React, { useState, useEffect } from "react";
import venueIllustration from "../../assets/venue.png";

const WEDDING_DATE = new Date("2026-05-17T10:00:00");

function CountdownAndVenue() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const venueAddress =
    "ITC Royal Bengal, 1, JBS Haldane Ave, Tangra, Kolkata, West Bengal 700105";

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venueAddress,
  )}`;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = WEDDING_DATE - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div className="border border-[#0e0c0b]/30 rounded-xl backdrop-blur-md shadow-sm p-2 sm:p-5 w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-4xl text-[#0e0c0b] font-['Dancing_Script']">
        {value}
      </div>
      <div className="text-xs sm:text-lg text-[#0e0c0b] font-medium font-['Dancing_Script']">
        {label}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-10 text-center px-4 py-10 bg-[#f5e6e0]">
      {/* Heading */}
      <h1 className="text-3xl sm:text-5xl font-['Dancing_Script'] text-[#0e0c0b] italic">
        Countdown
      </h1>

      {/* Timer */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
        <TimeBox value={timeLeft.days} label="Days" />
        <TimeBox value={timeLeft.hours} label="Hours" />
        <TimeBox value={timeLeft.minutes} label="Minutes" />
        <TimeBox value={timeLeft.seconds} label="Seconds" />
      </div>

      <p className="font-light text-[#0e0c0b] text-lg sm:text-3xl font-['Great_Vibes']">
        Until The Big Day
      </p>

      {/* Venue Section */}
      <div className="flex flex-col items-center gap-2 mt-6 sm:mt-10">
        <h2 className="text-sm sm:text-2xl font-['Playfair_Display'] text-[#0e0c0b] tracking-wide">
          THE CELEBRATION WILL TAKE PLACE AT
        </h2>
      </div>

      {/* Image */}
      <div className="w-full max-w-2xl px-2 sm:px-4">
        <img
          src={venueIllustration}
          alt="Venue Illustration"
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Venue Info */}
      <div className="px-3 flex flex-col items-center gap-3">
        <h1 className="text-xl sm:text-3xl font-['Great_Vibes'] text-[#0e0c0b]">
          Venue Name
        </h1>

        {/* Clickable Address */}
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-xl text-[oklch(28.6% 0.066 53.813)] font-['Playfair_Display'] leading-relaxed underline hover:text-[#000] transition"
        >
          ITC Royal Bengal, JBS Haldane Ave, Tangra, Kolkata
        </a>

        <h1 className="text-lg sm:text-3xl font-['Great_Vibes'] text-[#0e0c0b] mt-2">
          17th May 2026
        </h1>
      </div>
    </div>
  );
}

export default CountdownAndVenue;
