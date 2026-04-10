import React, { useRef, useState, useEffect } from "react";
import scratchTexture from "../../assets/Scratch Cards1.png";

const FLOWER_COUNT = 30;
const CELEBRATION_DURATION_MS = 7000;
const FLOWER_START_DELAY_MS = 0.5;
const MOBILE_CANVAS_SIZE = 112;
const DESKTOP_CANVAS_SIZE = 160;

const generateFlowerParticles = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    left: Math.random() * 100,
    size: 18 + Math.random() * 24,
    duration: 6 + Math.random() * 7,
    delay: Math.random() * 2.5,
    sway: 30 + Math.random() * 70,
    rotateStart: Math.random() * 180,
    rotateEnd: 180 + Math.random() * 360,
  }));

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
  const [showFlowerRain, setShowFlowerRain] = useState(false);
  const [canvasSize, setCanvasSize] = useState(() =>
    window.innerWidth >= 640 ? DESKTOP_CANVAS_SIZE : MOBILE_CANVAS_SIZE,
  );
  const [flowerParticles] = useState(() =>
    generateFlowerParticles(FLOWER_COUNT),
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
      setShowFlowerRain(true);
      window.dispatchEvent(new Event("wedding:flowerRain"));
    }, FLOWER_START_DELAY_MS);

    const stopTimer = window.setTimeout(() => {
      setShowFlowerRain(false);
    }, CELEBRATION_DURATION_MS);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(stopTimer);
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
    <div className="relative min-h-screen h-auto bg-[#faf8f5] flex flex-col items-center justify-center gap-8 sm:gap-14 text-center overflow-hidden px-4 py-10 sm:py-0">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

.flower-rain {
  z-index: 30;
}

.flower-drop {
  position: absolute;
  top: -12%;
  display: block;
  opacity: 0;
  will-change: transform;
  animation: flower-fall linear forwards;
}

.flower-sway {
  display: block;
  width: 100%;
  height: 100%;
  will-change: transform;
  animation: flower-sway ease-in-out infinite, flower-rotate ease-in-out infinite;
  animation-duration: 3.2s, 2.8s;
  animation-delay: 0s, 0s;
}

.flower-core {
  position: relative;
  width: 100%;
  height: 100%;
}

.flower-petal {
  position: absolute;
  inset: 34% 22% 34% 22%;
  border-radius: 50% 50% 45% 45%;
  background: radial-gradient(circle at 35% 35%, #ffe6ef 0%, #f39bb8 55%, #d85082 100%);
  transform-origin: center;
}

.flower-petal:nth-child(1) { transform: rotate(0deg) translateY(-42%); }
.flower-petal:nth-child(2) { transform: rotate(60deg) translateY(-42%); }
.flower-petal:nth-child(3) { transform: rotate(120deg) translateY(-42%); }
.flower-petal:nth-child(4) { transform: rotate(180deg) translateY(-42%); }
.flower-petal:nth-child(5) { transform: rotate(240deg) translateY(-42%); }
.flower-petal:nth-child(6) { transform: rotate(300deg) translateY(-42%); }

.flower-center {
  position: absolute;
  inset: 34%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff8bf 0%, #f6c445 60%, #d8a500 100%);
  box-shadow: 0 0 8px rgba(246, 196, 69, 0.55);
}

@keyframes flower-fall {
  from {
    opacity: 0.95;
    transform: translate3d(0, -10vh, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 120vh, 0);
  }
}

@keyframes flower-sway {
  0% {
    margin-left: 0;
  }
  50% {
    margin-left: var(--sway);
  }
  100% {
    margin-left: calc(var(--sway) * -0.6);
  }
}

@keyframes flower-rotate {
  from {
    rotate: var(--rotate-start);
  }
  to {
    rotate: var(--rotate-end);
  }
}`}
      </style>

      {showFlowerRain && (
        <div
          className="flower-rain absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {flowerParticles.map((particle) => (
            <div
              key={particle.id}
              className="flower-drop"
              style={{
                left: `${particle.left}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            >
              <div
                className="flower-sway"
                style={{
                  animationDelay: `${particle.delay}s, ${particle.delay}s`,
                  "--sway": `${particle.sway}px`,
                  "--rotate-start": `${particle.rotateStart}deg`,
                  "--rotate-end": `${particle.rotateEnd}deg`,
                }}
              >
                <div className="flower-core" aria-hidden="true">
                  <span className="flower-petal" />
                  <span className="flower-petal" />
                  <span className="flower-petal" />
                  <span className="flower-petal" />
                  <span className="flower-petal" />
                  <span className="flower-petal" />
                  <span className="flower-center" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <h1 className=" text-5xl sm:text-7xl font-['Playfair_Display'] text-[#5c2018] italic mt-4 sm:mt-10 ">
          Reveal
        </h1>
      </div>

      <div>
        <p className=" text-lg sm:text-2xl font-['Playfair_Display'] text-[#5c2018] italic">
          SCRATCH TO DISCOVER THE DATE
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-10 text-3xl sm:text-4xl font-bold">
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center border-2 border-[#ffffff] rounded-full bg-white overflow-hidden text-[#5c2018] font-light">
          <span className={isScratched1 ? "opacity-100" : "opacity-0"}>10</span>
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
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center border-2 border-[#ffffff] rounded-full bg-white overflow-hidden text-[#5c2018] font-light">
          <span className={isScratched2 ? "opacity-100" : "opacity-0"}>10</span>
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
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center border-2 border-[#ffffff] rounded-full bg-white overflow-hidden text-[#5c2018] font-light">
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
      <div>
        <h1 className=" text-2xl sm:text-4xl font-['Playfair_Display'] text-[#5c2018] italic">
          We're getting married!
        </h1>
      </div>
    </div>
  );
}

export default Reveal;
