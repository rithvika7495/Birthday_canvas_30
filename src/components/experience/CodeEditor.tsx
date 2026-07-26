import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CODE_LINES = [
  { t: "// A small function I keep running in my head.", c: "text-neutral-500" },
  { t: "", c: "" },
  {
    t: "function whatMakesSomeoneUnforgettable(person) {",
    c: "text-[#c586c0]",
  },
  { t: "  const patience   = person.time;", c: "text-neutral-300" },
  { t: "  const kindness   = person.quiet_acts;", c: "text-neutral-300" },
  { t: "  const showing_up = person.every_time_it_mattered;", c: "text-neutral-300" },
  { t: "", c: "" },
  {
    t: "  return patience + kindness + showing_up;",
    c: "text-[#4ec9b0]",
  },
  { t: "}", c: "text-[#c586c0]" },
  { t: "", c: "" },
  {
    t: "// Best mentor I've ever had.",
    c: "text-amber-300",
  },
];

export function CodeEditor() {
  const ref = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.06]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.25 && !started) setStarted(true);
    });
  }, [scrollYProgress, started]);

  useEffect(() => {
    if (!started || !codeRef.current) return;
    const lineEls = codeRef.current.querySelectorAll("[data-line]");
    const tl = gsap.timeline();
    lineEls.forEach((el, idx) => {
      const text = (el as HTMLElement).dataset.text ?? "";
      const span = el.querySelector("[data-text]") as HTMLElement;
      if (!span) return;
      span.textContent = "";
      if (text.length === 0) {
        tl.to({}, { duration: 0.08 });
        return;
      }
      tl.to(
        span,
        {
          duration: Math.min(1.6, 0.03 * text.length + 0.2),
          ease: "none",
          onUpdate: function () {
            const p = this.progress();
            span.textContent = text.slice(0, Math.ceil(text.length * p));
          },
        },
        idx === 0 ? 0.2 : `+=${0.08}`,
      );
    });
    return () => {
      tl.kill();
    };
  }, [started]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 md:px-8">
        <motion.div
          style={{ opacity, scale }}
          className="w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 shadow-[0_50px_120px_-30px_rgba(255,180,90,0.15)] backdrop-blur-sm"
        >
          {/* Titlebar */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#1e1e1e]/95 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 font-mono text-xs text-neutral-400">
              memories/for-surya.ts
            </span>
          </div>
          {/* Editor */}
          <div className="flex bg-[#1e1e1e]/95 font-mono text-[13px] leading-[1.75] md:text-[15px]">
            <div className="select-none border-r border-white/5 px-3 py-6 text-right text-neutral-600">
              {CODE_LINES.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div ref={codeRef} className="flex-1 px-5 py-6">
              {CODE_LINES.map((l, i) => (
                <div
                  key={i}
                  data-line
                  data-text={l.t}
                  className={`min-h-[1.75em] ${l.c}`}
                >
                  <span data-text />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
