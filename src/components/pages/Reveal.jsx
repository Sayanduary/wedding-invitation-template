import React, { useEffect, useRef, useState } from "react";
import scratchTexture from "../../assets/Scratch Cards1.png";

const CELEBRATION_DURATION_MS = 7000;
const DOT_START_DELAY_MS = 0.5;
const MOBILE_CANVAS_SIZE = 112;
const DESKTOP_CANVAS_SIZE = 160;

function Reveal() {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const canvasRef3 = useRef(null);
  const celebrationStartedRef = useRef(false);
  const [isScratched1, setIsScratched1] = useState(false);
  const [isScratched2, setIsScratched2] = useState(false);
  const [isScratched3, setIsScratched3] = useState(false);
  const [isDrawing1, setIsDrawing1] = useState(false);
  const [isDrawing2, setIsDrawing2] = useState(false);
  const [isDrawing3, setIsDrawing3] = useState(false);
  const [canvasSize, setCanvasSize] = useState(() =>
    window.innerWidth >= 640 ? DESKTOP_CANVAS_SIZE : MOBILE_CANVAS_SIZE,
  );

  const allScratched = isScratched1 && isScratched2 && isScratched3;

  useEffect(() => {
    const updateCanvasSize = () => {
      setCanvasSize(
        window.innerWidth >= 640 ? DESKTOP_CANVAS_SIZE : MOBILE_CANVAS_SIZE,
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    const paintTexture = () => {
      [canvasRef1, canvasRef2, canvasRef3].forEach((ref) => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(textureImage, 0, 0, canvas.width, canvas.height);
      });
    };

    const textureImage = new Image();
    textureImage.src = scratchTexture;

    if (textureImage.complete) {
      paintTexture();
      return undefined;
    }

    textureImage.onload = paintTexture;
    return () => {
      textureImage.onload = null;
    };
  }, [canvasSize]);

  useEffect(() => {
    if (!allScratched || celebrationStartedRef.current) return undefined;

    celebrationStartedRef.current = true;
    const startTimer = window.setTimeout(() => {
      window.dispatchEvent(new Event("wedding:flowerRain"));
    }, DOT_START_DELAY_MS);

    return () => {
      window.clearTimeout(startTimer);
    };
  }, [allScratched]);

  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const scratch = (e, canvasRef, setIsScratched, isDrawing) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getMousePos(canvas, e.touches ? e.touches[0] : e);
    const scratchRadius = Math.max(14, canvas.width * 0.18);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, scratchRadius, 0, Math.PI * 2);
    ctx.fill();

    checkScratch(canvas, setIsScratched);
  };

  const checkScratch = (canvas, setIsScratched) => {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage =
      (transparentPixels / (canvas.width * canvas.height)) * 100;
    if (percentage > 50) {
      setIsScratched(true);
    }
  };

  return (
    <div
      className="relative min-h-screen h-auto overflow-hidden px-4 py-10 text-center text-[#26211d] sm:py-0"
      style={{
        backgroundColor: "#f5e6e0",
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

@keyframes paper-speckle-drift {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-1px, 1px, 0);
  }
}
`}
      </style>

      <div className="pointer-events-none absolute inset-0 z-[1] border border-white/0 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.005)_28%,rgba(255,255,255,0.015)_100%)] shadow-none backdrop-blur-[36px]" />

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(92,74,56,0.24) 0.7px, transparent 0.7px), radial-gradient(rgba(92,74,56,0.12) 0.9px, transparent 0.9px)",
          backgroundSize: "8px 8px, 13px 13px",
          backgroundPosition: "0 0, 4px 6px",
          animation: "paper-speckle-drift 9s ease-in-out infinite",
        }}
      />

      <div className="relative z-2 flex min-h-[calc(100svh-2rem)] flex-col items-center justify-center gap-8 text-center sm:gap-14">
        <div>
          <h1 className="text-4xl sm:text-5xl  text-[#0e0c0b] italic mt-4 sm:mt-10 font-['Playfair_Display']">
            Reveal The Date
          </h1>
        </div>

        <div>
          <p className="text-lg sm:text-2xl font-['Playfair_Display']  text-[#0e0c0b] italic">
            SCRATCH TO DISCOVER THE DATE
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-3xl font-bold sm:gap-10 sm:text-4xl">
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[#ffffff] bg-white font-light text-[#5c2018] sm:h-40 sm:w-40">
            <span className={isScratched1 ? "opacity-100" : "opacity-0"}>
              10
            </span>
            {!isScratched1 && (
              <canvas
                ref={canvasRef1}
                width={canvasSize}
                height={canvasSize}
                className="absolute inset-0 cursor-pointer touch-none"
                onMouseDown={() => setIsDrawing1(true)}
                onMouseUp={() => setIsDrawing1(false)}
                onMouseMove={(e) =>
                  scratch(e, canvasRef1, setIsScratched1, isDrawing1)
                }
                onMouseLeave={() => setIsDrawing1(false)}
                onTouchStart={() => setIsDrawing1(true)}
                onTouchEnd={() => setIsDrawing1(false)}
                onTouchMove={(e) =>
                  scratch(e, canvasRef1, setIsScratched1, isDrawing1)
                }
              />
            )}
          </div>

          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[#ffffff] bg-white font-light text-[#5c2018] sm:h-40 sm:w-40">
            <span className={isScratched2 ? "opacity-100" : "opacity-0"}>
              10
            </span>
            {!isScratched2 && (
              <canvas
                ref={canvasRef2}
                width={canvasSize}
                height={canvasSize}
                className="absolute inset-0 cursor-pointer touch-none"
                onMouseDown={() => setIsDrawing2(true)}
                onMouseUp={() => setIsDrawing2(false)}
                onMouseMove={(e) =>
                  scratch(e, canvasRef2, setIsScratched2, isDrawing2)
                }
                onMouseLeave={() => setIsDrawing2(false)}
                onTouchStart={() => setIsDrawing2(true)}
                onTouchEnd={() => setIsDrawing2(false)}
                onTouchMove={(e) =>
                  scratch(e, canvasRef2, setIsScratched2, isDrawing2)
                }
              />
            )}
          </div>

          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[#ffffff] bg-white font-light text-[#5c2018] sm:h-40 sm:w-40">
            <span className={isScratched3 ? "opacity-100" : "opacity-0"}>
              2026
            </span>
            {!isScratched3 && (
              <canvas
                ref={canvasRef3}
                width={canvasSize}
                height={canvasSize}
                className="absolute inset-0 cursor-pointer touch-none"
                onMouseDown={() => setIsDrawing3(true)}
                onMouseUp={() => setIsDrawing3(false)}
                onMouseMove={(e) =>
                  scratch(e, canvasRef3, setIsScratched3, isDrawing3)
                }
                onMouseLeave={() => setIsDrawing3(false)}
                onTouchStart={() => setIsDrawing3(true)}
                onTouchEnd={() => setIsDrawing3(false)}
                onTouchMove={(e) =>
                  scratch(e, canvasRef3, setIsScratched3, isDrawing3)
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reveal;
