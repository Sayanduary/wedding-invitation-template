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

  return (
    <div
      className="min-h-screen h-auto flex flex-col items-center justify-center gap-4 sm:gap-10 text-center px-3 py-8 sm:py-0"
      style={{
        backgroundColor: "#f5e6e0",
      }}
    >
      <div className="text-2xl sm:text-5xl font-['Dancing_Script'] text-[#0e0c0b] italic">
        <h1>Countdown</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-6">
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <div className="border rounded p-2 sm:p-5 w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-4xl text-[#0e0c0b] font-['Dancing_Script']">
            {timeLeft.days}
          </div>
          <div className="text-xs sm:text-lg text-[#0e0c0b] font-medium font-['Dancing_Script']">
            Days
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <div className="border rounded p-2 sm:p-5 w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-4xl text-[#0e0c0b] font-['Dancing_Script']">
            {timeLeft.hours}
          </div>
          <div className="text-xs sm:text-lg text-[#0e0c0b] font-medium font-['Dancing_Script']">
            Hours
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <div className="border rounded p-2 sm:p-5 w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-4xl text-[#0e0c0b] font-['Dancing_Script']">
            {timeLeft.minutes}
          </div>
          <div className="text-xs sm:text-lg text-[#0e0c0b] font-medium font-['Dancing_Script']">
            Minutes
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 sm:gap-2">
          <div className="border rounded p-2 sm:p-5 w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-4xl text-[#0e0c0b] font-['Dancing_Script']">
            {timeLeft.seconds}
          </div>
          <div className="text-xs sm:text-lg text-[#0e0c0b] font-medium font-['Dancing_Script']">
            Seconds
          </div>
        </div>
      </div>
      <div className="font-light text-[#0e0c0b] text-base sm:text-3xl font-['Great_Vibes'] ">
        Until The Big Day
      </div>

      <div className="flex flex-col items-center gap-2 mt-4 sm:mt-10">
        <h1 className="text-sm sm:text-2xl font-['Playfair_Display'] text-[#0e0c0b] px-3 leading-snug">
          THE CELEBRATION WILL TAKE PLACE AT
        </h1>
      </div>
      <div className="w-full max-w-2xl px-2 sm:px-4 -mt-2">
        <img
          src={venueIllustration}
          alt="Venue Illustration"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="px-3">
        <h1 className="text-base sm:text-3xl font-['Great_Vibes'] text-[#0e0c0b] py-3 sm:py-5">
          Venue Name
        </h1>
        <p className="text-xs sm:text-2xl text-[oklch(28.6% 0.066 53.813)] px-2 sm:px-3 font-['Playfair_Display'] leading-relaxed">
          ITC Royal Bengal, JBS Haldane Ave, Tangra, Kolkata, West Bengal 700105
        </p>
        <h1 className="text-base sm:text-3xl font-['Great_Vibes'] text-[#0e0c0b] py-4 sm:py-9">
          17th May 2026
        </h1>
      </div>
    </div>
  );
}

export default CountdownAndVenue;
