import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { memories } from "@/lib/memories";

export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });


  // With offset [start end, end start], progress spans 0→1 as the section
  // travels through the viewport. Sticky is visible roughly 0.25→0.75.
  const collageScale = useTransform(scrollYProgress, [0.2, 0.55, 0.8], [1.4, 1, 0.95]);
  const nameOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const messageOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const finalFade = useTransform(scrollYProgress, [0.78, 0.88], [1, 0]);


  return (
    <section ref={ref} className="relative h-[240vh]">
      <motion.div
        style={{ opacity: finalFade }}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Collage — always visible while sticky, only scaled */}
        <motion.div style={{ scale: collageScale }} className="absolute inset-0">

          {memories.map((m, i) => {
            const cols = 4;
            const rows = Math.ceil(memories.length / cols);
            const col = i % cols;
            const row = Math.floor(i / cols);
            const jitterX = ((i * 37) % 11) - 5;
            const jitterY = ((i * 53) % 11) - 5;
            const rotate = ((i * 41) % 21) - 10;
            const left = ((col + 0.5) / cols) * 100 + jitterX;
            const top = ((row + 0.5) / rows) * 100 + jitterY;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80, rotate: rotate * 2, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, rotate, scale: 1 }}
                transition={{
                  duration: 1.6,
                  delay: 0.08 * i,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="absolute h-[28vh] w-[24vw] min-w-[200px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm bg-neutral-900 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              >
                <img
                  src={m.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            );
          })}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.75) 100%)",
            }}
          />

        </motion.div>


        {/* Name */}
        <motion.div
          style={{ opacity: nameOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h2
            className="font-serif text-[16vw] leading-none text-transparent md:text-[10vw]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,235,190,1) 0%, rgba(255,190,120,0.6) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextStroke: "1px rgba(255,220,170,0.15)",
            }}
          >
            Surya
          </h2>
        </motion.div>

        {/* Final message */}
        <motion.div
          style={{ opacity: messageOpacity }}
          className="absolute inset-x-0 bottom-[8vh] px-6 text-center"
        >
          <div className="mx-auto max-w-2xl space-y-2 font-serif text-lg text-amber-50/85 md:text-2xl">
            <p>Thank you.</p>
            <p>For your patience.</p>
            <p>For every lesson.</p>
            <p>For every laugh.</p>
            <p>For every memory.</p>
            <p className="pt-6 text-2xl italic text-amber-200 md:text-4xl">
              Happy Birthday, Surya.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
