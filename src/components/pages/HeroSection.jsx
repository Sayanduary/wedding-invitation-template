import bgImage from "../../assets/bg.jpg";

function HeroSection() {
  const names = ["Sam", "sofia"];
  return (
    <div className="relative h-screen flex flex-col items-center justify-center sm:justify-between gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 text-center bg-[#f8f4f4] overflow-hidden px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 pt-6 xs:pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-6 xs:pb-8 sm:pb-10 md:pb-12 lg:pb-14">
      {/* Background Image Layer positioned at top to show trees */}
      <div
        className="absolute inset-0 z-0 opacity-10 bg-top bg-cover bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Gradient overlay to seamlessly fade the image out into the background color */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-[#f8f4f4]/80 to-[#ded1d1] pointer-events-none"></div>

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');`}
      </style>

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-[#5c2018] font-light text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl tracking-wider max-w-2xl relative z-10 mt-0 leading-relaxed px-2 xs:px-3 sm:px-4">
          YOU ARE CORDIALLY INVITED TO CELEBRATE THE WEDDING OF
        </div>
        <div className="relative flex flex-col items-center mt-4 xs:mt-6 sm:mt-8 md:mt-10 lg:mt-12 z-10 w-full max-w-4xl px-2 xs:px-3 sm:px-4">
          <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] text-[#5c2018] italic mt-2 xs:mt-3 sm:mt-4 md:mt-6 lg:mt-8 font-bold text-wide relative z-10">
            {names[0]}
          </div>
          <div className="text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] text-[#5c2018] italic font-bold relative z-10 my-1 xs:my-1.5 sm:my-2 md:my-3 lg:my-4">
            &
          </div>
          <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Playfair_Display'] text-[#5c2018] italic mb-2 xs:mb-3 sm:mb-4 md:mb-6 lg:mb-8 font-bold text-wide relative z-10">
            {names[1]}
          </div>
        </div>
        <div className="text-[#5c2018] font-light text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 relative z-10 leading-relaxed mt-10 sm:mt-0">
          WE WOULD LIKE TO INVITE YOU TO CELEBRATE WITH US THE MOST SPECIAL DAY
          OF OUR LIVES. IT WOULD BE AN HONOR TO HAVE YOU PRESENT AT THIS
          IMPORTANT MOMENT.
        </div>
      </div>
      <div
        className="flex flex-col items-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 animate-bounce mt-auto z-10 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <div className="text-[#4a1a13] font-medium tracking-[0.3em] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-sm">
          SCROLL
        </div>
        <div className="text-[#4a1a13] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/50 backdrop-blur-md shadow-sm border border-white/70">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
