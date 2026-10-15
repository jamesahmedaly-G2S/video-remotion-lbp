import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, enter, exit, fonts, type } from "../theme";

type Props = {
  readonly text: string;
  /** Image de départ de l'animation (relative à la scène). */
  readonly delay?: number;
  /** « word » : mot par mot ; « line » : ligne par ligne (lignes séparées par \n). */
  readonly mode?: "word" | "line";
  /** Images entre deux mots ou deux lignes. */
  readonly stagger?: number;
  /** Image de début de sortie (optionnelle). */
  readonly exitAt?: number;
  readonly fontSize: number;
  readonly color?: string;
  readonly weight?: 400 | 500 | 700;
  readonly align?: "left" | "center";
  readonly lineHeight?: number;
  readonly style?: React.CSSProperties;
};

/**
 * Titre animé : chaque mot (ou ligne) monte de 30 px, passe d'un flou de 8 px
 * à 0 et d'une opacité de 0 à 1 (spring damping 200). Les retours à la ligne
 * suivent les espaces normales ; « \n » force une ligne ; text-wrap: balance
 * évite les veuves.
 */
export const AnimatedTitle: React.FC<Props> = ({
  text,
  delay = 0,
  mode = "word",
  stagger,
  exitAt,
  fontSize,
  color = colors.encre,
  weight = 700,
  align = "left",
  lineHeight = 1.06,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = stagger ?? (mode === "word" ? 2 : 6);
  const lines = text.split("\n");

  const out = exitAt === undefined ? 0 : exit(frame, fps, exitAt);

  let index = 0;
  return (
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: weight,
        fontSize,
        lineHeight,
        letterSpacing: type.titleLetterSpacing,
        color,
        textAlign: align,
        textWrap: "balance",
        opacity: 1 - out,
        translate: `0px ${interpolate(out, [0, 1], [0, -20])}px`,
        filter: out > 0 ? `blur(${interpolate(out, [0, 1], [0, 6])}px)` : undefined,
        ...style,
      }}
    >
      {lines.map((line, li) => {
        const words = line.split(" ");
        const lineIndex = li;
        return (
          <div key={li}>
            {words.map((word, wi) => {
              const i = mode === "word" ? index++ : lineIndex;
              const p = enter(frame, fps, delay + i * step);
              return (
                <span key={wi}>
                  <span
                    style={{
                      display: "inline-block",
                      opacity: p,
                      translate: `0px ${interpolate(p, [0, 1], [30, 0])}px`,
                      filter: p < 1 ? `blur(${interpolate(p, [0, 1], [8, 0])}px)` : undefined,
                    }}
                  >
                    {word}
                  </span>
                  {wi < words.length - 1 ? " " : null}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
