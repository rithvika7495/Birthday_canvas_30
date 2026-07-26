import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINES = [
  "Some people become colleagues.",
  "Some become mentors.",
  "Some quietly change your life forever.",
];

export function OpeningLines() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-8">
        <div className="relative mx-auto w-full max-w-4xl text-center">
          {LINES.map((line, i) => {
            const start = 0.1 + i * 0.25;
            const end = start + 0.2;
            return (
              <Line
                key={i}
                text={line}
                progress={scrollYProgress}
                start={start}
                end={end}
                fadeStart={end + 0.05}
                fadeEnd={end + 0.18}
                emphasis={i === 2}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Line({
  text,
  progress,
  start,
  end,
  fadeStart,
  fadeEnd,
  emphasis,
}: {
  text: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  fadeStart: number;
  fadeEnd: number;
  emphasis?: boolean;
}) {
  const opacity = useTransform(
    progress,
    [start, end, fadeStart, fadeEnd],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, end], [40, 0]);
  const filter = useTransform(
    progress,
    [start, end, fadeStart, fadeEnd],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(10px)"],
  );

  return (
    <motion.p
      style={{ opacity, y, filter }}
      className={`absolute inset-x-0 font-serif leading-[1.15] tracking-tight ${
        emphasis
          ? "text-4xl text-amber-50 md:text-6xl lg:text-7xl"
          : "text-3xl text-amber-50/85 md:text-5xl lg:text-6xl"
      }`}
    >
      {text}
    </motion.p>
  );
}

