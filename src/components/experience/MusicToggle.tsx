import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Ambient drone synthesized with WebAudio — no autoplay, requires user action.
export function MusicToggle({ show }: { show: boolean }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[] } | null>(
    null,
  );
  const [on, setOn] = useState(false);

  const toggle = async () => {
    if (!on) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      // Warm pad: 3 detuned sines + slow LFO on filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;
      filter.Q.value = 0.6;
      filter.connect(master);

      const freqs = [110, 164.81, 220]; // A2, E3, A3
      const oscs = freqs.map((f) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = 0.14;
        o.connect(g).connect(filter);
        o.start();
        return o;
      });

      // LFO for filter shimmer
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 300;
      lfo.connect(lfoGain).connect(filter.frequency);
      lfo.start();

      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.5);
      nodesRef.current = { gain: master, oscs: [...oscs, lfo] };
      setOn(true);
    } else {
      const ctx = ctxRef.current;
      const nodes = nodesRef.current;
      if (ctx && nodes) {
        nodes.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => {
          nodes.oscs.forEach((o) => o.stop());
          ctx.close();
        }, 1300);
      }
      ctxRef.current = null;
      nodesRef.current = null;
      setOn(false);
    }
  };

  useEffect(
    () => () => {
      ctxRef.current?.close();
    },
    [],
  );

  if (!show) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      onClick={toggle}
      className="group fixed left-6 bottom-6 z-40 flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 backdrop-blur-md transition-all hover:border-amber-200/40 hover:bg-black/50 md:left-8 md:bottom-8"
      aria-label={on ? "Turn music off" : "Turn music on"}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inset-0 rounded-full ${
            on ? "bg-amber-200" : "bg-white/40"
          }`}
        />
        {on && (
          <span className="absolute inset-0 animate-ping rounded-full bg-amber-200/60" />
        )}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-50/80">
        {on ? "Music on" : "Turn on music"}
      </span>
    </motion.button>
  );
}
