import { AbsoluteFill } from "remotion";
import { alpha, colors } from "../theme";

type Props = {
  readonly variant?: "creme" | "mineral" | "nuit";
  /** Intensité du halo framboise (0 à 1). */
  readonly glow?: number;
};

/** Fond clair avec halo radial framboise très léger et grain discret. */
export const Background: React.FC<Props> = ({ variant = "creme", glow = 1 }) => {
  const base =
    variant === "nuit"
      ? colors.bleuNuit
      : variant === "mineral"
        ? colors.mineral
        : colors.creme;
  const halo = variant === "nuit" ? alpha.framboise(0.35 * glow) : alpha.framboise(0.07 * glow);

  return (
    <AbsoluteFill style={{ backgroundColor: base }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 60% at 78% 18%, ${halo} 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 12% 92%, ${halo} 0%, transparent 65%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: variant === "nuit" ? 0.07 : 0.045 }}>
        <svg width="100%" height="100%">
          <filter id="paiex-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              stitchTiles="stitch"
              seed={7}
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paiex-grain)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
