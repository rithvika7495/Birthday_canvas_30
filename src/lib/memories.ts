import mem01 from "@/assets/mem-01.jpg";
import mem02 from "@/assets/mem-02.jpg";
import mem03 from "@/assets/mem-03.jpg";
import mem04 from "@/assets/mem-04.jpg";
import mem05 from "@/assets/mem-05.jpg";
import mem06 from "@/assets/mem-06.jpg";
import mem07 from "@/assets/mem-07.jpg";
import mem08 from "@/assets/mem-08.jpg";
import photoUno from "@/assets/photo-uno.jpg.asset.json";
import photoMischief from "@/assets/photo-mischief.jpg.asset.json";
import photoHackNight from "@/assets/photo-hackathon-night.jpg.asset.json";
import photoOffice from "@/assets/photo-office.jpg.asset.json";
import photoAirportPeace from "@/assets/photo-airport-peace.jpg.asset.json";
import photoAirportTrio from "@/assets/photo-airport-trio.jpg.asset.json";

export type MotionVariant = "zoom" | "rotate" | "drift" | "still";

export type Memory = {
  image: string;
  caption: string;
  sub?: string;
  tag?: string; // small whispered line above the caption, no "Chapter"
  motion?: MotionVariant;
  glow?: boolean; // celebratory glow (used for the Top 3 moment)
};

// Ordered narrative. No chapters. No sections. Just one long exhale.
export const memories: Memory[] = [
  // ── The beginning of a friendship ───────────────────────────────
  {
    image: mem01,
    caption: "You were the first person who made me feel like I belonged.",
    sub: "Before I knew your name, I knew I was safe around you.",
    motion: "zoom",
  },
  {
    image: mem02,
    caption: "Every idea sounded better across a table from you.",
    sub: "You listened like every half-formed thought mattered.",
    motion: "drift",
  },

  // ── The hackathon: a sequence of its own ────────────────────────
  {
    image: photoHackNight,
    tag: "somewhere around 2 a.m.",
    caption: "The night the room was falling apart, and you were the reason it didn't.",
    sub: "Everyone was tired. You were still smiling for the rest of us.",
    motion: "zoom",
  },
  {
    image: mem01,
    caption: "Every time we got stuck, you'd sit down next to me and just… stay.",
    sub: "Not fixing it for me. Waiting until I could see it too.",
    motion: "still",
  },
  {
    image: photoOffice,
    caption: "You explained the same thing three times, and never once made me feel small.",
    sub: "That is the kind of teacher people write about, years later.",
    motion: "drift",
  },
  {
    image: photoHackNight,
    caption: "When the pressure was suffocating, you were the one making everyone laugh.",
    sub: "You carried the weight so quietly that we forgot it was even there.",
    motion: "rotate",
  },
  {
    image: mem04,
    caption: "And then — somehow — we were in the Top 3.",
    sub: "It wasn't just a result. It was proof that you believed in us before we did.",
    motion: "zoom",
    glow: true,
  },

  // ── The lighter moments ─────────────────────────────────────────
  {
    image: photoUno,
    tag: "UNO nights, forever undefeated in memory",
    caption: "Draw four. Skip. Reverse. You laughing while the rest of us screamed.",
    sub: "Nobody won those games. We were too busy being happy.",
    motion: "rotate",
  },
  {
    image: photoMischief,
    caption: "This face. This exact face. I will remember this face forever.",
    sub: "Half tired, half plotting, entirely you.",
    motion: "drift",
  },

  // ── The night you came home ─────────────────────────────────────
  {
    image: mem03,
    tag: "the night you showed up unannounced",
    caption: "I opened the door and there you were, like it was nothing.",
    sub: "You had come all that way, just because.",
    motion: "zoom",
  },
  {
    image: mem06,
    caption: "An ordinary evening turned into a late-night ride I still replay in my head.",
    sub: "The streets were empty. The city felt like it belonged to us.",
    motion: "drift",
  },
  {
    image: mem03,
    caption: "I still smile when I think about that night.",
    sub: "Some kindness is loud. Yours was the quiet kind that never left.",
    motion: "still",
  },

  // ── Patience, again, differently ────────────────────────────────
  {
    image: mem04,
    caption: "You had patience the way other people have talent.",
    sub: "Endless, effortless, and always aimed at the people who needed it most.",
    motion: "zoom",
  },
  {
    image: mem05,
    caption: "You showed up. For the small things. Especially for the small things.",
    sub: "The ones nobody would have noticed if you hadn't.",
    motion: "drift",
  },

  // ── Airports, goodbyes, hellos ──────────────────────────────────
  {
    image: photoAirportTrio,
    caption: "Even the goodbyes felt like beginnings when you were in the frame.",
    sub: "Somehow you made 1 a.m. at an airport feel like the best part of the trip.",
    motion: "rotate",
  },
  {
    image: photoAirportPeace,
    caption: "Peace signs. Tired eyes. Full hearts.",
    sub: "This is what happiness looks like at the end of a long night.",
    motion: "zoom",
  },

  // ── Quiet close ─────────────────────────────────────────────────
  {
    image: mem07,
    caption: "The small rituals with you always felt like anchors.",
    sub: "Two cups. One quiet morning. A friendship you can lean on.",
    motion: "drift",
  },
  {
    image: mem08,
    caption: "Some light only exists because of the people around it.",
    sub: "You have always been one of those people, Surya.",
    motion: "zoom",
  },
];
