import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { bounce, colors, enter, fonts, radius, shadow, type } from "../theme";

type CardProps = {
  /** Image d'entrée (relative à la scène). Cascade : +6 images par carte. */
  readonly delay: number;
  /** Direction d'arrivée. */
  readonly from?: "right" | "bottom" | "left";
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
};

/** Carte d'interface fictive qui glisse en place, avec un flottement lent. */
export const FloatingCard: React.FC<CardProps> = ({
  delay,
  from = "right",
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);
  const offset = interpolate(p, [0, 1], [56, 0]);
  const drift = interpolate(frame, [delay, delay + 8 * fps], [0, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: colors.blanc,
        border: `1px solid ${colors.ligne}`,
        borderRadius: radius.md,
        boxShadow: shadow.float,
        opacity: p,
        filter: p < 1 ? `blur(${interpolate(p, [0, 1], [6, 0])}px)` : undefined,
        translate:
          from === "bottom"
            ? `0px ${offset + drift}px`
            : `${from === "left" ? -offset : offset}px ${drift}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Compteur qui défile de 0 à `to`. */
export const Counter: React.FC<{
  readonly to: number;
  readonly delay: number;
}> = ({ to, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay, 1.3);
  return <>{Math.round(interpolate(p, [0, 1], [0, to])).toLocaleString("fr-FR")}</>;
};

/** Badge vert (« Publié », « Applicable ») qui apparaît avec un petit rebond. */
export const Badge: React.FC<{
  readonly text: string;
  readonly delay: number;
  readonly fontSize?: number;
  readonly style?: React.CSSProperties;
}> = ({ text, delay, fontSize = 26, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = bounce(frame, fps, delay);
  const o = enter(frame, fps, delay, 0.3);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: fontSize * 0.4,
        padding: `${fontSize * 0.32}px ${fontSize * 0.7}px`,
        borderRadius: 999,
        backgroundColor: colors.vert,
        color: colors.blanc,
        fontFamily: fonts.sans,
        fontWeight: 700,
        fontSize,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        opacity: o,
        scale: interpolate(b, [0, 1], [0.4, 1]),
        ...style,
      }}
    >
      <svg width={fontSize * 0.8} height={fontSize * 0.8} viewBox="0 0 20 20">
        <path
          d="M4 10.5 L8.2 14.5 L16 6"
          stroke={colors.blanc}
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {text}
    </div>
  );
};

/** Petite étiquette mono en majuscules (dans les cartes). */
export const CardLabel: React.FC<{
  readonly children: React.ReactNode;
  readonly color?: string;
  readonly fontSize?: number;
}> = ({ children, color = colors.carbone, fontSize = 22 }) => (
  <div
    style={{
      fontFamily: fonts.mono,
      fontWeight: 500,
      fontSize,
      letterSpacing: type.kickerLetterSpacing,
      textTransform: "uppercase",
      color,
    }}
  >
    {children}
  </div>
);
