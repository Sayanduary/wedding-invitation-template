import React from "react";
import thankYouBanner from "../../assets/thankyou.png";
function ThankYou() {
  return (
    <div
      className="min-h-screen h-auto flex justify-center items-center px-4 py-10 sm:py-0 relative"
      style={{
        backgroundColor: "#f5e6e0",
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
        <div className="flex flex-col absolute inset-0 z-0 items-center justify-center px-4 py-6 sm:p-10">
          <h1 className=" px-4 py-2 text-center text-[#0e0c0b] text-3xl sm:text-4xl font-['Playfair_Display'] leading-relaxed italic">
            Thank You{" "}
          </h1>

          <h1 className=" px-12 py-3 text-center text-[#0e0c0b] text-base sm:text-lg font-['Playfair_Display'] leading-relaxed">
            For joining us on this special day.Your presence is the best gift we
            could receive.
          </h1>
          <h1 className=" px-4 py-2 text-center text-[#0e0c0b] text-3xl sm:text-4xl font-['Playfair_Display'] leading-relaxed italic">
            Sam & Sofía
          </h1>
        </div>

        <img
          src={thankYouBanner}
          alt="Thank You"
          className="relative z-10 block w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
}

export default ThankYou;
