import { motion, AnimatePresence } from "framer-motion";

export function ProgressCounter({
  current,
  total,
  visible,
}: {
  current: number;
  total: number;
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none fixed bottom-6 right-6 z-40 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-amber-100/60 md:bottom-8 md:right-8 md:text-xs"
        >
          <span>Memory</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="tabular-nums text-amber-50/90"
            >
              {String(current).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="text-amber-100/30">/</span>
          <span className="tabular-nums">{String(total).padStart(2, "0")}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
