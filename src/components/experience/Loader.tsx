import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  "Preparing memories",
  "Collecting laughter",
  "Finding photographs",
  "Almost there",
  "Welcome",
];

export function Loader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (i >= lines.length) {
      const t = setTimeout(() => {
        setGone(true);
        setTimeout(onDone, 900);
      }, 700);
      return () => clearTimeout(t);
    }
    const delay = i === lines.length - 1 ? 900 : 850;
    const t = setTimeout(() => setI(i + 1), delay);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="w-full max-w-xl px-8 text-center">
            <div className="mb-10 flex items-center justify-center gap-1.5">
              {lines.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-[2px] transition-all duration-700 ${
                    idx <= i ? "w-8 bg-amber-200/80" : "w-4 bg-white/10"
                  }`}
                />
              ))}
            </div>
            <div className="relative h-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={i}
                  initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
                  className="font-serif text-2xl tracking-[0.02em] text-amber-50/90 md:text-3xl"
                >
                  {lines[Math.min(i, lines.length - 1)]}
                  {i < lines.length - 1 ? "…" : "."}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
