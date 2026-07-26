import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={ref} className="relative h-[140vh]">
      <motion.div
        style={{ scale, opacity, y }}
        className="sticky top-0 flex h-screen items-center justify-center"
      >
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8 text-xs uppercase tracking-[0.5em] text-amber-100/50"
          >
            An immersive letter
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2.2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-[18vw] leading-[0.9] text-transparent md:text-[14vw]"
            style={{
              WebkitTextStroke: "1px rgba(251,235,205,0.35)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,230,180,0.95) 0%, rgba(255,200,140,0.5) 60%, rgba(255,180,110,0.05) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Surya
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2.4 }}
            className="mt-10 font-serif text-lg italic text-amber-50/60"
          >
            scroll softly
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.2, delay: 2.8 }}
            className="mx-auto mt-6 h-14 w-[1px] bg-gradient-to-b from-amber-100/60 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
