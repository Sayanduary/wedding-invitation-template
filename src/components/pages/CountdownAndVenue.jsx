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
      className="min-h-screen h-auto flex flex-col items-center justify-center gap-6 sm:gap-10 text-center px-4 py-10 sm:py-0"
      style={{
        backgroundColor: "#f5e6e0",
      }}
    >
      <div className="text-3xl sm:text-5xl font-['Playfair_Display'] text-[#0e0c0b] italic">
        <h1>Countdown</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-2xl sm:text-4xl">
        <div className="flex flex-col items-center gap-2">
          <div className="border rounded p-3 sm:p-5 w-16 h-16 sm:w-20 sm:h-20 text-[#0e0c0b] font-['Playfair_Display']">
            {timeLeft.days}
          </div>
          <div className="text-sm text-[#0e0c0b]">DAYS</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="border rounded p-3 sm:p-5 w-16 h-16 sm:w-20 sm:h-20 text-[#0e0c0b] font-['Playfair_Display']">
            {timeLeft.hours}
          </div>
          <div className="text-sm text-[#0e0c0b]">HOURS</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="border rounded p-3 sm:p-5 w-16 h-16 sm:w-20 sm:h-20 text-[#0e0c0b] font-['Playfair_Display']">
            {timeLeft.minutes}
          </div>
          <div className="text-sm text-[#0e0c0b]">MINUTES</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="border rounded p-3 sm:p-5 w-16 h-16 sm:w-20 sm:h-20 text-[#0e0c0b] font-['Playfair_Display']">
            {timeLeft.seconds}
          </div>
          <div className="text-sm text-[#0e0c0b]">SECONDS</div>
        </div>
      </div>
      <div className="font-light text-[#0e0c0b] text-sm">Until The Big Day</div>

      <div className="flex flex-col items-center gap-2 mt-6 sm:mt-10">
        <h1 className="text-xl sm:text-2xl font-['Playfair_Display'] text-[#0e0c0b] px-3">
          THE CELEBRATION WILL TAKE PLACE AT
        </h1>
      </div>
      <div className="w-full max-w-2xl px-4 -mt-4">
        <img
          src={venueIllustration}
          alt="Venue Illustration"
          className="w-full h-auto object-cover"
        />
      </div>
      <div>
        <h1 className="text-lg sm:text-xl font-['Playfair_Display'] text-[#0e0c0b]">
          Venue Name
        </h1>
        <p className="text-base sm:text-lg text-[#0e0c0b] font-light px-3">
          123 Wedding Lane, City, State
        </p>
        <h1 className="text-lg sm:text-xl font-['Playfair_Display'] text-[#0e0c0b]">
          Date
        </h1>
        <h1 className="text-lg sm:text-xl font-['Playfair_Display'] text-[#0e0c0b]">
          Reception to Follow
        </h1>
      </div>
    </div>
  );
}

export default CountdownAndVenue;
