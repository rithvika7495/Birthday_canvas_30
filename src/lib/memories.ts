import mem01 from "@/assets/mem-01.jpg";
import mem02 from "@/assets/mem-02.jpg";
import mem03 from "@/assets/mem-03.jpg";
import mem04 from "@/assets/mem-04.jpg";
import mem05 from "@/assets/mem-05.jpg";
import mem06 from "@/assets/mem-06.jpg";
import mem07 from "@/assets/mem-07.jpg";
import mem08 from "@/assets/mem-08.jpg";

export type Memory = {
  image: string;
  caption: string;
  sub?: string;
};

export const memories: Memory[] = [
  {
    image: mem01,
    caption: "You were the first person who made me feel like I belonged.",
    sub: "The first hackathon — 3 a.m., screens still glowing.",
  },
  {
    image: mem02,
    caption: "Every idea sounded better across a table from you.",
    sub: "Coffee that went cold before either of us noticed.",
  },
  {
    image: mem03,
    caption: "Some conversations only make sense above the city.",
    sub: "The night we forgot what time it was.",
  },
  {
    image: mem04,
    caption: "I still don't know how you stayed so patient while teaching me.",
    sub: "Whiteboards, warm lamps, quiet lessons.",
  },
  {
    image: mem05,
    caption: "You showed up. You always showed up.",
    sub: "The surprise none of us saw coming.",
  },
  {
    image: mem06,
    caption: "The best walks were the ones without a destination.",
    sub: "Long road, longer shadows.",
  },
  {
    image: mem07,
    caption: "A small ritual that felt like an anchor.",
    sub: "Two cups. One quiet morning.",
  },
  {
    image: mem08,
    caption: "Some light only exists because of the people around it.",
    sub: "Candles. Faces. A moment that stayed.",
  },
];
