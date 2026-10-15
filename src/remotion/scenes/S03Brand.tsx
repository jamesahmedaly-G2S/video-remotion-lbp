import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Background } from "../components/Background";
import { FragmentChip, fragmentDot, fragmentPosition } from "../components/Fragments";
import { Kicker } from "../components/Kicker";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { colors, enter, fonts, radius, s, shadow } from "../theme";
import { SCENE_SEC } from "../timing";
import { SCATTER } from "./S02Problem";

/**
 * S3 — Révélation de la marque. Après le wipe framboise, les fragments
 * éparpillés sont aspirés et deviennent une pile de fiches bien rangée.
 */
export const S03Brand: React.FC<PaiexProps> = ({ hook, brand }) => {
  const frame = useCurrentFrame();
  const { fps, portrait, pick } = useFormat();
  const t = frame + s(SCENE_SEC.hook + SCENE_SEC.problem, fps);

  const rowH = pick(76, 66);
  const gap = pick(14, 12);
  const stackW = pick(580, 860);
  const stackX = pick(450, 0);
  const stackTop = pick(-(6 * rowH + 5 * gap) / 2, -670);

  return (
    <AbsoluteFill>
      <Background variant="mineral" />
      {hook.fragments.map((text, i) => {
        const p = enter(frame, fps, s(0.35, fps) + i * 3, 0.9);
        const start = fragmentPosition(i, t, portrait);
        const target = {
          x: stackX,
          y: stackTop + rowH / 2 + i * (rowH + gap),
        };
        const x = interpolate(p, [0, 1], [start.x * SCATTER.spread, target.x]);
        const y = interpolate(p, [0, 1], [start.y * SCATTER.spread, target.y]);
        const morph = interpolate(p, [0.55, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const fiche = brand.fiches[i];
        return (
          <div key={i}>
            <FragmentChip
              index={i}
              text={text}
              fontSize={26}
              style={{
                opacity:
                  interpolate(p, [0, 0.4], [SCATTER.opacity, 1], {
                    extrapolateRight: "clamp",
                  }) *
                  (1 - morph),
                filter: `blur(${interpolate(p, [0, 0.6], [SCATTER.blur, 0], { extrapolateRight: "clamp" })}px)`,
                translate: `calc(-50% + ${x}px) calc(-50% + ${y}px)`,
                rotate: `${interpolate(p, [0, 1], [start.rotate * 2, 0])}deg`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: stackW,
                height: rowH,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "0 26px 0 0",
                borderRadius: radius.sm,
                overflow: "hidden",
                backgroundColor: colors.blanc,
                border: `1px solid ${colors.ligne}`,
                boxShadow: shadow.soft,
                opacity: morph,
                translate: `calc(-50% + ${x}px) calc(-50% + ${y}px)`,
                scale: interpolate(morph, [0, 1], [0.7, 1]),
              }}
            >
              <div style={{ width: 8, alignSelf: "stretch", backgroundColor: fragmentDot(i) }} />
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 24,
                  color: colors.framboise,
                }}
              >
                {fiche.code}
              </div>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 500,
                  fontSize: 32,
                  letterSpacing: "-0.02em",
                  color: colors.encre,
                  whiteSpace: "nowrap",
                }}
              >
                {fiche.title}
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: pick(120, 80),
          width: pick(900, 920),
          top: pick(0, 840),
          bottom: pick(0, undefined),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: portrait ? "center" : "flex-start",
          gap: 28,
        }}
      >
        <Kicker text={brand.kicker} delay={s(1.3, fps)} />
        <AnimatedTitle
          text={brand.titleA}
          delay={s(1.5, fps)}
          fontSize={pick(104, 96)}
          align={portrait ? "center" : "left"}
        />
        <AnimatedTitle
          text={brand.titleB}
          delay={s(3.3, fps)}
          fontSize={pick(104, 96)}
          color={colors.framboise}
          align={portrait ? "center" : "left"}
        />
      </div>
    </AbsoluteFill>
  );
};
