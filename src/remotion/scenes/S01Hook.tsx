import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Background } from "../components/Background";
import { FragmentChip, fragmentPosition } from "../components/Fragments";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { colors, enter, fonts, s, type } from "../theme";

/**
 * S1 — Accroche (0-4,8 s). « PAIE » au centre, visible dès la première image
 * (vignette LinkedIn), fragments qui gravitent et tremblent, phrase d'accroche
 * lisible avant 3 s.
 */
export const S01Hook: React.FC<PaiexProps> = ({ hook }) => {
  const frame = useCurrentFrame();
  const { fps, portrait, pick } = useFormat();
  const settle = enter(frame, fps, 0, 1.2);

  return (
    <AbsoluteFill>
      <Background variant="creme" />
      {hook.fragments.map((text, i) => {
        const p = enter(frame, fps, s(0.25, fps) + i * 4);
        const pos = fragmentPosition(i, frame, portrait);
        return (
          <FragmentChip
            key={i}
            index={i}
            text={text}
            fontSize={pick(26, 26)}
            style={{
              opacity: p,
              translate: `calc(-50% + ${pos.x}px) calc(-50% + ${pos.y + interpolate(p, [0, 1], [24, 0])}px)`,
              rotate: `${pos.rotate}deg`,
              scale: interpolate(p, [0, 1], [0.92, 1]),
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 700,
            fontSize: pick(300, 240),
            lineHeight: 1,
            letterSpacing: type.titleLetterSpacing,
            color: colors.encre,
            scale: interpolate(settle, [0, 1], [1.08, 1]),
            translate: `0px ${pick(-60, -80)}px`,
          }}
        >
          {hook.word}
        </div>
      </AbsoluteFill>
      <AnimatedTitle
        text={hook.line}
        delay={s(0.9, fps)}
        fontSize={72}
        weight={500}
        color={colors.carboneFonce}
        align="center"
        style={{
          position: "absolute",
          left: pick(160, 80),
          right: pick(160, 80),
          top: pick(700, 1090),
        }}
      />
    </AbsoluteFill>
  );
};
