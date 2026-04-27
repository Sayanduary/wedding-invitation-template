function HeroSection() {
  const confettiDots = [
    { top: "5%", left: "8%", color: "#ef476f", size: "w-5 h-5" },
    { top: "4%", left: "28%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "3%", left: "42%", color: "#f9c74f", size: "w-6 h-6" },
    { top: "5%", left: "61%", color: "#ef476f", size: "w-5 h-5" },
    { top: "4%", left: "78%", color: "#4d7cff", size: "w-6 h-6" },
    { top: "10%", left: "15%", color: "#f9c74f", size: "w-4 h-4" },
    { top: "12%", left: "36%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "11%", left: "56%", color: "#43a047", size: "w-5 h-5" },
    { top: "12%", left: "86%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "18%", left: "4%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "19%", left: "21%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "21%", left: "37%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "20%", left: "52%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "20%", left: "69%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "18%", left: "88%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "28%", left: "6%", color: "#43a047", size: "w-5 h-5" },
    { top: "29%", left: "22%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "31%", left: "39%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "30%", left: "62%", color: "#ef476f", size: "w-5 h-5" },
    { top: "29%", left: "84%", color: "#43a047", size: "w-5 h-5" },
    { top: "40%", left: "4%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "41%", left: "15%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "43%", left: "29%", color: "#ef476f", size: "w-5 h-5" },
    { top: "42%", left: "48%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "43%", left: "71%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "41%", left: "90%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "52%", left: "6%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "53%", left: "18%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "55%", left: "35%", color: "#43a047", size: "w-5 h-5" },
    { top: "54%", left: "60%", color: "#ef476f", size: "w-5 h-5" },
    { top: "53%", left: "82%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "64%", left: "4%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "66%", left: "23%", color: "#43a047", size: "w-5 h-5" },
    { top: "67%", left: "39%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "66%", left: "58%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "65%", left: "76%", color: "#ef476f", size: "w-5 h-5" },
    { top: "64%", left: "91%", color: "#43a047", size: "w-5 h-5" },
    { top: "76%", left: "8%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "77%", left: "26%", color: "#ef476f", size: "w-5 h-5" },
    { top: "78%", left: "44%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "77%", left: "63%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "78%", left: "82%", color: "#7b61ff", size: "w-5 h-5" },
    { top: "88%", left: "12%", color: "#f9c74f", size: "w-5 h-5" },
    { top: "89%", left: "30%", color: "#4d7cff", size: "w-5 h-5" },
    { top: "88%", left: "49%", color: "#43a047", size: "w-5 h-5" },
    { top: "89%", left: "68%", color: "#ef476f", size: "w-5 h-5" },
    { top: "88%", left: "88%", color: "#f9c74f", size: "w-5 h-5" },
  ];

  const safeConfettiDots = confettiDots.filter((dot) => {
    const top = Number.parseFloat(dot.top);
    const left = Number.parseFloat(dot.left);

    return !(top >= 34 && top <= 72 && left >= 24 && left <= 76);
  });

  return (
    <div className="relative min-h-svh overflow-hidden bg-transparent px-3 py-4 text-center text-[#26211d] sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=DM+Sans:wght@400;500;700;800&display=swap');

        @keyframes confetti-flow {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -7px, 0) scale(1.04);
          }
        }
        `}
      </style>

      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {safeConfettiDots.map((dot, index) => (
          <span
            key={`${dot.top}-${dot.left}-${index}`}
            className={`pointer-events-none absolute rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.24),0_0_14px_currentColor,0_0_28px_currentColor] ${dot.size}`}
            style={{
              top: dot.top,
              left: dot.left,
              backgroundColor: dot.color,
              color: dot.color,
              opacity: 0.96,
              animation: "confetti-flow 3.2s ease-in-out infinite",
              animationDelay: `${(index % 7) * 0.24}s`,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-1 border border-white/0 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.005)_28%,rgba(255,255,255,0.015)_100%)] shadow-none backdrop-blur-[36px]" />

      <div className="relative z-2 mx-auto flex min-h-[calc(100svh-2rem)] max-w-3xl flex-col items-center justify-center px-1">
        <div className="mb-5 max-w-xl text-[0.62rem] font-medium uppercase tracking-[0.3em] text-[#5b5248]/85 sm:mb-6 sm:text-sm sm:tracking-[0.38em]">
          You are cordially invited for a beautiful night of celebration and
          love
        </div>

        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="relative z-10 text-[1.55rem] leading-none text-[#26211d] sm:text-[2.4rem] lg:text-[3.1rem]">
            Celebrate
          </div>
          <div className="relative z-10 mt-1 text-[1.85rem] leading-tight font-['Special_Elite'] text-[#26211d] sm:text-[2.8rem] lg:text-[3.6rem]">
            Aria&apos;s first
          </div>
          <div className="relative z-10 text-[1.85rem] leading-tight font-['Special_Elite'] text-[#26211d] sm:text-[2.8rem] lg:text-[3.6rem]">
            Glamorous Year
          </div>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-5 left-1/2 z-2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#6d5748] transition-opacity hover:opacity-80 sm:bottom-6"
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.4em] sm:text-xs">
          Scroll
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c8b8a3] bg-white/75 text-sm shadow-sm backdrop-blur-sm sm:h-11 sm:w-11 sm:text-base">
          <i className="fa-solid fa-arrow-down" />
        </span>
      </button>
    </div>
  );
}

export default HeroSection;
