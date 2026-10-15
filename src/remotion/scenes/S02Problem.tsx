import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Background } from "../components/Background";
import { FragmentChip, fragmentPosition } from "../components/Fragments";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { colors, enter, fonts, s } from "../theme";
import { SCENE_SEC } from "../timing";

/** Écart (multiplicateur de la position) et flou des fragments éparpillés. */
export const SCATTER = { spread: 1.55, blur: 5, opacity: 0.35 };

/**
 * S2 — Le problème. Les fragments s'éparpillent et se brouillent ; trois lieux
 * s'empilent, puis la question en carbone.
 */
export const S02Problem: React.FC<PaiexProps> = ({ hook, problem }) => {
  const frame = useCurrentFrame();
  const { fps, portrait, pick } = useFormat();
  // Continuité avec S1 : même horloge des fragments.
  const t = frame + s(SCENE_SEC.hook, fps);
  const scatter = enter(frame, fps, s(0.2, fps), 1.2);
  const questionAt = s(4.2, fps);

  return (
    <AbsoluteFill>
      <Background variant="creme" />
      {hook.fragments.map((text, i) => {
        const pos = fragmentPosition(i, t, portrait);
        const k = interpolate(scatter, [0, 1], [1, SCATTER.spread]);
        return (
          <FragmentChip
            key={i}
            index={i}
            text={text}
            fontSize={26}
            style={{
              opacity: interpolate(scatter, [0, 1], [1, SCATTER.opacity]),
              filter: `blur(${interpolate(scatter, [0, 1], [0, SCATTER.blur])}px)`,
              translate: `calc(-50% + ${pos.x * k}px) calc(-50% + ${pos.y * k}px)`,
              rotate: `${pos.rotate * (1 + scatter)}deg`,
            }}
          />
        );
      })}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <AnimatedTitle
          text={problem.places.join("\n")}
          mode="line"
          stagger={s(0.4, fps)}
          delay={s(0.3, fps)}
          exitAt={s(3.9, fps)}
          fontSize={pick(92, 80)}
          align="center"
          lineHeight={1.15}
          style={{ position: "absolute", width: pick(1500, 920) }}
        />
        <div
          style={{
            position: "absolute",
            width: pick(1440, 920),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontWeight: 700,
              fontSize: pick(150, 140),
              lineHeight: 0.6,
              height: pick(70, 64),
              color: colors.framboise,
              opacity: enter(frame, fps, questionAt - 4),
            }}
          >
            «
          </div>
          <AnimatedTitle
            text={problem.question}
            delay={questionAt}
            fontSize={pick(96, 84)}
            weight={500}
            color={colors.carbone}
            align="center"
            lineHeight={1.1}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
