import { interpolate, useCurrentFrame } from "remotion";
import { alpha, colors } from "../theme";

/**
 * Contour framboise posé sur une zone d'une capture (coordonnées en % de la
 * capture), visible entre `from` et `to` (images de la scène).
 */
export const Highlight: React.FC<{
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly from: number;
  readonly to: number;
}> = ({ x, y, w, h, from, to }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [from, from + 6, to - 6, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        height: `${h}%`,
        borderRadius: 12,
        border: `3px solid ${colors.framboise}`,
        backgroundColor: alpha.framboise(0.06),
        boxShadow: `0 0 0 6px ${alpha.framboise(0.12)}`,
        opacity: o,
      }}
    />
  );
};
