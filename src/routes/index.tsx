import { createFileRoute } from "@tanstack/react-router";
import { useState, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { memories } from "@/lib/memories";
import { Loader } from "@/components/experience/Loader";
import { Intro } from "@/components/experience/Intro";
import { OpeningLines } from "@/components/experience/OpeningLines";
import { MemoryScene } from "@/components/experience/MemoryScene";
import { CodeEditor } from "@/components/experience/CodeEditor";
import { Finale } from "@/components/experience/Finale";
import { ProgressCounter } from "@/components/experience/ProgressCounter";
import { MusicToggle } from "@/components/experience/MusicToggle";

const ParticleField = lazy(() =>
  import("@/components/experience/ParticleField").then((m) => ({
    default: m.ParticleField,
  })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Surya — A Museum of Memories" },
      {
        name: "description",
        content:
          "An immersive cinematic letter for Surya. Scroll through memories, laughter, and light.",
      },
      { property: "og:title", content: "For Surya — A Museum of Memories" },
      {
        property: "og:description",
        content:
          "An immersive cinematic letter for Surya. Scroll through memories, laughter, and light.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

function Experience() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(1);
  useLenis(ready && !reduced);

  return (
    <main className="relative min-h-screen bg-black text-amber-50 antialiased">
      {/* Warm cinematic backdrop */}
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(80,45,20,0.55) 0%, rgba(20,12,8,1) 55%, #000 100%)",
        }}
      />

      {/* Particles */}
      {ready && !reduced && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}

      {/* Loader */}
      <AnimatePresence>
        {!ready && <Loader onDone={() => setReady(true)} />}
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence>
        {ready && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="relative z-10"
          >
            <Intro />
            <OpeningLines />

            {memories.slice(0, 4).map((m, i) => (
              <MemoryScene
                key={i}
                memory={m}
                index={i}
                onEnter={(idx) => setCurrent(idx + 1)}
              />
            ))}

            <CodeEditor />

            {memories.slice(4).map((m, i) => (
              <MemoryScene
                key={i + 4}
                memory={m}
                index={i + 4}
                onEnter={(idx) => setCurrent(idx + 1)}
              />
            ))}

            <Finale />

            {/* Ending black */}
            <section className="relative h-[50vh] bg-black" />
          </motion.div>
        )}
      </AnimatePresence>

      <ProgressCounter
        current={current}
        total={memories.length}
        visible={ready}
      />
      <MusicToggle show={ready} />
    </main>
  );
}
