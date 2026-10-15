import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Background } from "../components/Background";
import { Cursor } from "../components/Cursor";
import { Logo } from "../components/Logo";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { alpha, colors, enter, fonts, s, shadow } from "../theme";

/**
 * S9 — Appel à l'action. Logo, promesse, bouton cliqué par le curseur, URL.
 * Tout est immobile pendant au moins les 2 dernières secondes.
 */
export const S09Cta: React.FC<PaiexProps> = ({ url, cta }) => {
  const frame = useCurrentFrame();
  const { fps, pick } = useFormat();

  const logo = enter(frame, fps, s(0.15, fps));
  const buttonAt = s(1.0, fps);
  const clickAt = s(2.0, fps);
  const button = enter(frame, fps, buttonAt);
  const press = interpolate(frame, [clickAt - 3, clickAt, clickAt + 6], [1, 0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonTop = pick(736, 1090);
  const buttonH = 104;

  return (
    <AbsoluteFill>
      <Background variant="creme" glow={1.6} />
      <Logo
        fontSize={pick(220, 180)}
        by={cta.by}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: pick(220, 540),
          opacity: logo,
          scale: interpolate(logo, [0, 1], [0.94, 1]),
        }}
      />
      <AnimatedTitle
        text={cta.tagline}
        delay={s(0.5, fps)}
        fontSize={72}
        weight={500}
        color={colors.carboneFonce}
        align="center"
        style={{
          position: "absolute",
          left: pick(160, 80),
          right: pick(160, 80),
          top: pick(580, 850),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: buttonTop,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: buttonH,
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "0 52px",
            borderRadius: 999,
            backgroundColor: colors.framboise,
            color: colors.blanc,
            fontFamily: fonts.sans,
            fontWeight: 500,
            fontSize: 40,
            letterSpacing: "-0.02em",
            boxShadow: `0 18px 40px ${alpha.framboise(0.28)}, ${shadow.soft}`,
            opacity: button,
            translate: `0px ${interpolate(button, [0, 1], [24, 0])}px`,
            scale: press,
          }}
        >
          {cta.button}
          <svg width="34" height="34" viewBox="0 0 24 24">
            <path
              d="M5 19 L19 5 M8 5 H19 V16"
              stroke={colors.blanc}
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: buttonTop + buttonH + 44,
          textAlign: "center",
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 32,
          color: colors.carbone,
          opacity: button,
        }}
      >
        {url}
      </div>
      <Cursor
        points={[
          { x: pick(1500, 900), y: pick(960, 1440), at: s(1.2, fps) },
          { x: pick(1215, 815), y: buttonTop + buttonH * 0.62, at: clickAt },
        ]}
        clicks={[clickAt]}
      />
    </AbsoluteFill>
  );
};
