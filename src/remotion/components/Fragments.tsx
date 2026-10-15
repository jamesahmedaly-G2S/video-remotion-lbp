import { random } from "remotion";
import { alpha, colors, fonts, radius } from "../theme";

// Fragments de « désordre » partagés par les scènes 1, 2 et 3.
// Positions de base (par rapport au centre de l'image), choisies pour ne
// jamais croiser les textes et rester dans les zones de sécurité.
const BASE_LANDSCAPE = [
  { x: -600, y: -300 },
  { x: 560, y: -320 },
  { x: -680, y: 20 },
  { x: 690, y: 0 },
  { x: -520, y: 330 },
  { x: 540, y: 340 },
];
const BASE_PORTRAIT = [
  { x: -170, y: -560 },
  { x: 190, y: -430 },
  { x: -200, y: -300 },
  { x: 190, y: 360 },
  { x: -180, y: 440 },
  { x: 160, y: 510 },
];

const DOTS = [
  colors.famille.terreCuite,
  colors.famille.lavande,
  colors.famille.sauge,
  colors.famille.ardoise,
  colors.famille.sable,
  colors.famille.sauge,
];

export const fragmentDot = (i: number) => DOTS[i % DOTS.length];

/**
 * Position d'un fragment à l'image `t` (temps global depuis le début de la
 * vidéo) : lente gravitation autour de la position de base + léger tremblement.
 */
export const fragmentPosition = (i: number, t: number, portrait: boolean) => {
  const base = (portrait ? BASE_PORTRAIT : BASE_LANDSCAPE)[i];
  const phase = random(`frag-phase-${i}`) * Math.PI * 2;
  const dir = random(`frag-dir-${i}`) > 0.5 ? 1 : -1;
  const orbit = 22;
  const angle = phase + dir * t * 0.035;
  const tremble = 1.6;
  return {
    x: base.x + Math.cos(angle) * orbit + Math.sin(t * 0.9 + phase) * tremble,
    y: base.y + Math.sin(angle) * orbit * 0.7 + Math.cos(t * 1.1 + phase) * tremble,
    rotate: Math.sin(t * 0.05 + phase) * 3 + (random(`frag-rot-${i}`) - 0.5) * 8,
  };
};

/** Visuel d'un fragment : pastille blanche, point de couleur, texte mono. */
export const FragmentChip: React.FC<{
  readonly text: string;
  readonly index: number;
  readonly fontSize: number;
  readonly style?: React.CSSProperties;
}> = ({ text, index, fontSize, style }) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      display: "flex",
      alignItems: "center",
      gap: fontSize * 0.5,
      padding: `${fontSize * 0.5}px ${fontSize * 0.85}px`,
      borderRadius: radius.sm,
      backgroundColor: colors.blanc,
      border: `1px solid ${colors.ligne}`,
      boxShadow: `0 10px 30px ${alpha.encre(0.08)}`,
      fontFamily: fonts.mono,
      fontWeight: 500,
      fontSize,
      color: colors.carboneFonce,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <div
      style={{
        width: fontSize * 0.45,
        height: fontSize * 0.45,
        borderRadius: fontSize,
        backgroundColor: fragmentDot(index),
      }}
    />
    {text}
  </div>
);
