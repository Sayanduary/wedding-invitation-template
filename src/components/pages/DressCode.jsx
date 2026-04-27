import React from "react";
import dressCodePng from "../../assets/Dress Code.png";
function DressCode() {
  return (
    <div className="min-h-screen h-auto flex flex-col items-center justify-center gap-6 sm:gap-10 text-center bg-transparent px-4 py-10 sm:py-0">
      <div className="text-3xl sm:text-5xl font-['Playfair_Display'] text-[#5c2018] italic">
        <h1>Dress Code</h1>
      </div>
      <div className="w-full max-w-md px-4 -mt-4 flex justify-center">
        <img
          src={dressCodePng}
          alt="Dress Code "
          className="w-full h-auto object-cover"
        />
      </div>
      <p className="text-sm sm:text-base text-[#5c2018] max-w-2xl px-2">
        We invite you to dress elegantly and formally to celebrate this special
        day with us.
      </p>
      <h1 className="text-2xl sm:text-3xl font-['Playfair_Display'] text-[#5c2018] ">
        Formal Attire
      </h1>
      <h2 className="font-['Playfair_Display'] italic text-[#5c2018] text-xl sm:text-2xl">
        Please avoid wearing white
      </h2>
    </div>
  );
}

export default DressCode;
