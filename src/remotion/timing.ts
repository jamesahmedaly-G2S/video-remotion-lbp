import { s } from "./theme";

// 30 images par seconde, sans changement en cours de vidéo (TASK.md § 3.6).
export const FPS = 30;

// Durée de chaque scène à l'écran, en secondes (TASK.md § 5).
// Chaque coupe tombe sur un temps de la musique à 100 BPM (multiple de 0,6 s) :
// 4,8 · 12,6 · 18,6 · 26,4 · 34,2 · 42,6 · 49,8 · 55,2 · 60,0.
export const SCENE_SEC = {
  hook: 4.8,
  problem: 7.8,
  brand: 6.0,
  centralize: 7.8,
  find: 7.8,
  contextualize: 8.4,
  trust: 7.2,
  transmit: 5.4,
  cta: 4.8,
} as const;

export type SceneKey = keyof typeof SCENE_SEC;

export const SCENE_ORDER: SceneKey[] = [
  "hook",
  "problem",
  "brand",
  "centralize",
  "find",
  "contextualize",
  "trust",
  "transmit",
  "cta",
];

// Durée d'une transition (fondu ou wipe framboise) : 0,4 s = 12 images.
export const TRANSITION_SEC = 0.4;

export const transitionFrames = (fps: number) => s(TRANSITION_SEC, fps);

/**
 * Durée d'une <TransitionSeries.Sequence>. Une transition chevauche les deux
 * scènes : chaque scène (sauf la dernière) est prolongée de la durée de la
 * transition qui la suit, pour que la scène suivante démarre pile sur la coupe.
 */
export const sequenceFrames = (key: SceneKey, fps: number) =>
  s(SCENE_SEC[key], fps) +
  (key === SCENE_ORDER[SCENE_ORDER.length - 1] ? 0 : transitionFrames(fps));

/** Image de début de chaque scène dans la vidéo complète. */
export const sceneStartFrame = (key: SceneKey, fps: number) => {
  let start = 0;
  for (const k of SCENE_ORDER) {
    if (k === key) {
      return start;
    }
    start += s(SCENE_SEC[k], fps);
  }
  return start;
};

/**
 * Durée totale = somme des séquences - somme des transitions
 * = somme des durées à l'écran (60 s).
 */
export const totalFrames = (fps: number) =>
  SCENE_ORDER.reduce((sum, k) => sum + sequenceFrames(k, fps), 0) -
  (SCENE_ORDER.length - 1) * transitionFrames(fps);
