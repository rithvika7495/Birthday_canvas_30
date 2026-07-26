import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

import type { Memory } from "@/lib/memories";

export function MemoryScene({
  memory,
  index,
  onEnter,
}: {
  memory: Memory;
  index: number;
  onEnter?: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const variant = memory.motion ?? "zoom";

  // Image motion based on variant
  const zoomScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.02, 1.28]);
  const stillScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const driftScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const rotateScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.14]);

  const scale =
    variant === "zoom"
      ? zoomScale
      : variant === "still"
      ? stillScale
      : variant === "drift"
      ? driftScale
      : rotateScale;

  const yImg = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const xDrift = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  const imgOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.78, 1],
    [0, 1, 1, 0],
  );

  const textY = useTransform(scrollYProgress, [0.15, 0.5], [80, 0]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0.22, 0.42, 0.7, 0.88],
    [0, 1, 1, 0],
  );

  const vignette = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.85, 0.55, 0.85],
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    [0, memory.glow ? 0.55 : 0, 0],
  );

  useProgressCallback(scrollYProgress, onEnter, index);

  const alignLeft = index % 2 === 0;

  // Build per-variant image style
  const imgStyle: Record<string, MotionValue<number> | MotionValue<string>> = { scale };
  if (variant === "drift") {
    imgStyle.x = xDrift;
    imgStyle.y = yImg;
  } else if (variant === "rotate") {
    imgStyle.rotate = rotate;
    imgStyle.y = yImg;
  } else {
    imgStyle.y = yImg;
  }

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ ...imgStyle, opacity: imgOpacity }}
          className="absolute inset-0"
        >
          <img
            src={memory.image}
            alt=""
            loading="lazy"
            width={1600}
            height={1067}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Celebratory glow for Top-3 style beats */}
        {memory.glow && (
          <motion.div
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute inset-0"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, rgba(255,210,140,0.55) 0%, rgba(255,170,90,0.15) 30%, rgba(0,0,0,0) 65%)",
                mixBlendMode: "screen",
              }}
            />
          </motion.div>
        )}

        <motion.div
          style={{
            opacity: vignette,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
          }}
          className="absolute inset-0 mix-blend-multiply"
        />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className={`absolute bottom-[14vh] w-full px-8 md:bottom-[16vh] md:px-16 ${
            alignLeft ? "text-left" : "text-right"
          }`}
        >
          <div
            className={`mx-auto max-w-3xl ${
              alignLeft ? "md:ml-0 md:mr-auto" : "md:mr-0 md:ml-auto"
            }`}
          >
            {memory.tag && (
              <p className="mb-4 font-serif text-xs italic tracking-wide text-amber-100/60 md:text-sm">
                {memory.tag}
              </p>
            )}
            <h2 className="font-serif text-3xl leading-[1.2] text-amber-50 md:text-5xl lg:text-6xl">
              {memory.caption}
            </h2>
            {memory.sub && (
              <p className="mt-6 font-serif text-base italic text-amber-100/70 md:text-lg">
                {memory.sub}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function useProgressCallback(
  progress: MotionValue<number>,
  onEnter: ((i: number) => void) | undefined,
  index: number,
) {
  const fired = useRef(false);
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      if (v > 0.35 && v < 0.65) {
        if (!fired.current) {
          fired.current = true;
          onEnter?.(index);
        }
      } else if (v < 0.2 || v > 0.85) {
        fired.current = false;
      }
    });
    return unsub;
  }, [progress, onEnter, index]);
}
