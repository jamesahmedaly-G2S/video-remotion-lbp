import { loadFont as loadArchivo } from "@remotion/google-fonts/Archivo";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { spring, type SpringConfig } from "remotion";

// ---------------------------------------------------------------------------
// Charte PAIEX+ (TASK.md § 2). Aucune couleur en dehors de cette liste.
// ---------------------------------------------------------------------------
export const colors = {
  framboise: "#670626",
  framboiseFonce: "#3E0417",
  framboiseDoux: "#F5E6EB",
  carbone: "#445068",
  carboneFonce: "#364054",
  encre: "#25252A",
  bleuNuit: "#29364A",
  mineral: "#FAF9F7",
  creme: "#F5F0EC",
  sable: "#E8E0D6",
  blanc: "#FFFFFF",
  ligne: "#DED9DB",
  vert: "#0E8A87",
  famille: {
    sauge: "#B8C4AC",
    ardoise: "#9FB6C7",
    lavande: "#C3B2D4",
    terreCuite: "#E0B3A7",
    sable: "#E3CE8C",
  },
} as const;

// Variantes transparentes des couleurs de la charte (ombres, voiles, halos).
export const alpha = {
  framboise: (a: number) => `rgba(103, 6, 38, ${a})`,
  encre: (a: number) => `rgba(37, 37, 42, ${a})`,
  bleuNuit: (a: number) => `rgba(41, 54, 74, ${a})`,
  mineral: (a: number) => `rgba(250, 249, 247, ${a})`,
  vert: (a: number) => `rgba(14, 138, 135, ${a})`,
};

// ---------------------------------------------------------------------------
// Polices (chargées une seule fois, seulement les graisses utilisées).
// ---------------------------------------------------------------------------
const archivo = loadArchivo("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});
const plexMono = loadPlexMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const fonts = {
  sans: archivo.fontFamily,
  mono: plexMono.fontFamily,
};

export const type = {
  titleLetterSpacing: "-0.05em",
  kickerLetterSpacing: "0.17em",
};

// ---------------------------------------------------------------------------
// Formes
// ---------------------------------------------------------------------------
export const radius = { sm: 14, md: 16, lg: 20 };

export const shadow = {
  soft: `0 1px 2px ${alpha.encre(0.04)}, 0 12px 32px ${alpha.encre(0.07)}`,
  float: `0 2px 4px ${alpha.encre(0.05)}, 0 24px 60px ${alpha.encre(0.12)}`,
};

// ---------------------------------------------------------------------------
// Mouvement : une seule courbe (spring damping 200), sauf le rebond des badges.
// ---------------------------------------------------------------------------
export const SPRING: Partial<SpringConfig> = { damping: 200 };
export const BOUNCE: Partial<SpringConfig> = {
  damping: 11,
  stiffness: 170,
  mass: 0.7,
};

export const ENTER_SEC = 0.55; // 16-17 images : dans la plage 10-20 du § 3.1
export const EXIT_SEC = 0.3; // 9 images : sortie plus rapide que l'entrée
export const STAGGER_SEC = 0.2; // 6 images entre deux cartes

/** Secondes -> images (TASK.md § 4). */
export const s = (sec: number, fps: number) => Math.round(sec * fps);

/** Progression 0 -> 1 d'une entrée qui démarre à `delay` (en images). */
export const enter = (frame: number, fps: number, delay = 0, sec = ENTER_SEC) =>
  spring({
    frame: frame - delay,
    fps,
    config: SPRING,
    durationInFrames: s(sec, fps),
  });

/** Progression 0 -> 1 d'une sortie qui démarre à `start` (en images). */
export const exit = (frame: number, fps: number, start: number) =>
  spring({
    frame: frame - start,
    fps,
    config: SPRING,
    durationInFrames: s(EXIT_SEC, fps),
  });

/** Petit rebond (badges « Publié »). */
export const bounce = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: BOUNCE });

// ---------------------------------------------------------------------------
// Tempo de la musique : 100 BPM, un temps = 0,6 s, une mesure = 2,4 s.
// Toutes les coupes (timing.ts) tombent sur un temps.
// ---------------------------------------------------------------------------
export const TEMPO = { bpm: 100, beatSec: 60 / 100, barSec: (60 / 100) * 4 };

// ---------------------------------------------------------------------------
// Zones de sécurité (TASK.md § 3.3)
// ---------------------------------------------------------------------------
export const SAFE = {
  landscape: { top: 54, bottom: 54, left: 96, right: 96, work: 120 },
  portrait: { top: 250, bottom: 420, left: 80, right: 80, work: 80 },
};
