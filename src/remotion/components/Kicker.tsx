import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, enter, fonts, type } from "../theme";

type Props = {
  readonly text: string;
  readonly delay?: number;
  readonly color?: string;
  readonly fontSize?: number;
  readonly style?: React.CSSProperties;
};

/** Petite étiquette en majuscules espacées (IBM Plex Mono), précédée d'un filet. */
export const Kicker: React.FC<Props> = ({
  text,
  delay = 0,
  color = colors.framboise,
  fontSize = 28,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: fontSize * 0.7,
        fontFamily: fonts.mono,
        fontWeight: 500,
        fontSize,
        letterSpacing: type.kickerLetterSpacing,
        textTransform: "uppercase",
        color,
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [14, 0])}px`,
        ...style,
      }}
    >
      <div
        style={{
          width: fontSize * 1.4,
          height: 3,
          borderRadius: 2,
          backgroundColor: color,
          scale: `${p} 1`,
          transformOrigin: "left center",
        }}
      />
      {text}
    </div>
  );
};
