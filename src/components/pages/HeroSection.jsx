import React from "react";
import floralBouquet from "../../assets/1.png";
import floralLeaf from "../../assets/2.png";

function HeroSection() {
  const names = ["Sam", "Sofia"];
  return (
    <div className="relative min-h-screen h-auto flex flex-col items-center justify-center gap-6 sm:gap-10 text-center bg-[#f8f4f4] overflow-hidden px-4 py-10 sm:py-">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');`}
      </style>
      <div className="text-[#5c2018] font-light text-xs sm:text-sm max-w-2xl">
        YOU ARE CORDIALLY INVITED TO CELEBRATE THE WEDDING OF
      </div>
      <div className="relative flex flex-col items-center mt-10">
        <img
          src={floralBouquet}
          alt="Floral bouquet"
          className="pointer-events-none absolute -left-20 -top-5 w-20 opacity-80 sm:-left-40 sm:-top-8 sm:w-48 sm:opacity-90 md:-left-56 md:w-60"
        />

        <img
          src={floralLeaf}
          alt="Floral leaves"
          className="pointer-events-none absolute -right-18 top-24 w-20 opacity-80 sm:-right-36 sm:top-10 sm:w-40 sm:opacity-90 md:-right-52 md:top-8 md:w-52"
        />

        <div className="text-5xl sm:text-7xl font-['Playfair_Display'] text-[#5c2018] italic mt-8 sm:mt-10 font-bold text-wide relative z-10">
          {names[0]}
        </div>
        <div className="text-4xl sm:text-5xl font-['Playfair_Display'] text-[#5c2018] italic font-bold relative z-10">
          &
        </div>
        <div className="text-5xl sm:text-7xl font-['Playfair_Display'] text-[#5c2018] italic mb-10 sm:mb-20 font-bold text-wide relative z-10">
          {names[1]}
        </div>
      </div>
      <div className="text-[#5c2018] font-light text-sm sm:text-base max-w-3xl px-2">
        WE WOULD LIKE TO INVITE YOU TO CELEBRATE WITH US THE MOST SPECIAL DAY OF
        OUR LIVES. IT WOULD BE AN HONOR TO HAVE YOU PRESENT AT THIS IMPORTANT
        MOMENT.
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 animate-bounce mt-50 sm:mt-50">
        <div className="text-[#5c2018] font-light">SCROLL</div>
        <div className=" text-[#5c2018] text-2xl">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
