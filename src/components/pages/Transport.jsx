import React from "react";

function Transport() {
  return (
    <div className="min-h-screen h-auto flex flex-col gap-4 sm:gap-5 items-center bg-transparent px-6 py-10 sm:p-20 text-center justify-center">
      <p className="text-[#5c2018] text-sm">HOW TO REACH US</p>
      <h1 className="text-3xl sm:text-4xl text-[#5c2018] text-spacing-wide">
        Transport
      </h1>
      <p className="text-[#5c2018] mt-6 sm:mt-10 italic text-light text-sm sm:text-base max-w-2xl">
        We have organized buses from the center of Florence to the villa so you
        can enjoy <br className="hidden sm:block" />
        the celebration without worries.
      </p>
      <p className="text-[#5c2018] mt-8 sm:mt-10 ">BUS DEPARTURE</p>
      <p className="text-[#5c2018] text-sm sm:text-base">
        10:00 AM - Piazza della Repubblica, Florence
      </p>
    </div>
  );
}

export default Transport;
