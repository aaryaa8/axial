// One source for the product list, so the home page and the products page
// always show the same thing.

const BASE = import.meta.env.BASE_URL;

export interface Product {
  name: string;
  status: string;
  live?: boolean;
  body: string;
  href?: string;
  cta?: string;
}

export const YOUNG_LEARNERS: Product[] = [
  {
    name: "Axial Read",
    status: "Live demo",
    live: true,
    body: "A reading tutor for four to eight year olds. The child reads aloud, the model finds the skill underneath that is blocking them, and the teaching changes in response.",
    href: `${BASE}read/`,
    cta: "See it work",
  },
  {
    name: "Axial Write",
    status: "Coming soon",
    body: "Letter formation through to sentences, reading from the same profile the tutor already holds.",
    href: `${BASE}write/`,
    cta: "What is coming",
  },
  {
    name: "Axial Arithmetic",
    status: "Coming soon",
    body: "Early number sense through to arithmetic, running on the same cognitive model.",
    href: `${BASE}arithmetic/`,
    cta: "What is coming",
  },
];

export const WIDER: Product[] = [
  {
    name: "Axial for Schools",
    status: "Coming soon",
    body: "One view of a whole class, so a teacher can see thirty cognitive maps at once and group and target instruction accordingly.",
  },
  {
    name: "Axial for Older Learners",
    status: "Research",
    body: "The metacognitive layer for students who work hard and underperform, which is where the model began.",
  },
];
