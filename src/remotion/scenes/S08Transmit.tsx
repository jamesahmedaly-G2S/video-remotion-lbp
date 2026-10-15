import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Background } from "../components/Background";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { colors, enter, fonts, s, STAGGER_SEC, type } from "../theme";

/**
 * S8 — Transmettre. Le message en trois lignes, puis trois colonnes à filet
 * framboise : Centraliser · Contextualiser · Transmettre.
 */
export const S08Transmit: React.FC<PaiexProps> = ({ transmit }) => {
  const frame = useCurrentFrame();
  const { fps, portrait, pick } = useFormat();
  const colsAt = s(1.3, fps);
  const stagger = s(STAGGER_SEC, fps);

  return (
    <AbsoluteFill>
      <Background variant="mineral" />
      <AnimatedTitle
        text={transmit.lines.join("\n")}
        mode="line"
        delay={s(0.3, fps)}
        stagger={s(STAGGER_SEC, fps)}
        fontSize={pick(88, 80)}
        lineHeight={1.08}
        style={{
          position: "absolute",
          left: pick(120, 80),
          right: pick(120, 80),
          top: pick(150, 270),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: pick(120, 80),
          right: pick(120, 80),
          top: pick(620, 880),
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          gap: pick(48, 40),
        }}
      >
        {transmit.columns.map((title, i) => {
          const p = enter(frame, fps, colsAt + i * stagger);
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: pick(26, 18),
                opacity: p,
                translate: `0px ${interpolate(p, [0, 1], [30, 0])}px`,
              }}
            >
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: colors.framboise,
                  scale: `${p} 1`,
                  transformOrigin: "left center",
                }}
              />
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 26,
                  letterSpacing: type.kickerLetterSpacing,
                  color: colors.framboise,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 700,
                  fontSize: pick(60, 64),
                  lineHeight: 1,
                  letterSpacing: type.titleLetterSpacing,
                  color: colors.encre,
                }}
              >
                {title}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
