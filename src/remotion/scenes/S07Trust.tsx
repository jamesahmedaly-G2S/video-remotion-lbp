import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Background } from "../components/Background";
import { Badge } from "../components/FloatingCard";
import { Kicker } from "../components/Kicker";
import { useFormat } from "../components/useFormat";
import { alpha, colors, enter, fonts, s, type } from "../theme";
import type { PaiexProps } from "../schema";

/**
 * S7 — Toujours à jour. Fond bleu nuit, frise des étapes de publication qui
 * s'allument à tour de rôle ; badge « Publié » en dernier.
 */
export const S07Trust: React.FC<PaiexProps> = ({ trust }) => {
  const frame = useCurrentFrame();
  const { fps, portrait, pick } = useFormat();

  const frizeAt = s(1.6, fps);
  const stepAt = [s(2.2, fps), s(2.9, fps), s(3.6, fps), s(4.3, fps)];
  const badgeAt = s(4.9, fps);
  const base = enter(frame, fps, frizeAt);
  const fill = interpolate(frame, stepAt, [0, 1 / 3, 2 / 3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Géométrie de la frise
  const n = trust.steps.length;
  const start = pick(310, 780);
  const end = pick(1610, 1350);
  const axis = pick(700, 140); // y (paysage) ou x (portrait) de la ligne
  const nodePos = (i: number) => start + ((end - start) * i) / (n - 1);

  return (
    <AbsoluteFill>
      <Background variant="nuit" />
      <div
        style={{
          position: "absolute",
          left: pick(120, 80),
          right: pick(120, 80),
          top: pick(150, 270),
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <Kicker text={trust.kicker} delay={s(0.3, fps)} color={colors.framboiseDoux} />
        <AnimatedTitle
          text={trust.text}
          delay={s(0.45, fps)}
          fontSize={pick(80, 76)}
          color={colors.mineral}
          style={{ maxWidth: pick(1500, 920) }}
        />
      </div>

      {/* Ligne de fond et ligne de progression */}
      <div
        style={{
          position: "absolute",
          backgroundColor: alpha.mineral(0.22),
          opacity: base,
          ...(portrait
            ? { left: axis - 1.5, top: start, width: 3, height: end - start }
            : { top: axis - 1.5, left: start, height: 3, width: end - start }),
        }}
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: colors.mineral,
          ...(portrait
            ? { left: axis - 1.5, top: start, width: 3, height: (end - start) * fill }
            : { top: axis - 1.5, left: start, height: 3, width: (end - start) * fill }),
        }}
      />

      {trust.steps.map((label, i) => {
        const lit = enter(frame, fps, stepAt[i], 0.4);
        const last = i === n - 1;
        const pos = nodePos(i);
        return (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                width: 34,
                height: 34,
                borderRadius: 17,
                left: (portrait ? axis : pos) - 17,
                top: (portrait ? pos : axis) - 17,
                backgroundColor: lit > 0.5 ? (last ? colors.vert : colors.mineral) : colors.bleuNuit,
                border: `3px solid ${lit > 0.5 ? (last ? colors.vert : colors.mineral) : alpha.mineral(0.35)}`,
                boxShadow: `0 0 0 ${10 * lit}px ${last ? alpha.vert(0.25) : alpha.mineral(0.12)}`,
                opacity: base,
                scale: interpolate(lit, [0, 0.5, 1], [1, 1.25, 1]),
              }}
            />
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                opacity: base * interpolate(lit, [0, 1], [0.45, 1]),
                ...(portrait
                  ? { left: axis + 56, top: pos - 40, width: 820, alignItems: "flex-start" }
                  : { left: pos - 190, top: axis - 84, width: 380, alignItems: "center" }),
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontWeight: 500,
                  fontSize: 24,
                  letterSpacing: type.kickerLetterSpacing,
                  color: colors.framboiseDoux,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  marginTop: portrait ? 0 : 84,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  fontFamily: fonts.sans,
                  fontWeight: 500,
                  fontSize: pick(36, 42),
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: colors.mineral,
                  textAlign: portrait ? "left" : "center",
                  textWrap: "balance",
                }}
              >
                {label}
                {portrait && last ? <Badge text={trust.badge} delay={badgeAt} fontSize={30} /> : null}
              </div>
            </div>
          </div>
        );
      })}
      {portrait ? null : (
        <div
          style={{
            position: "absolute",
            left: nodePos(n - 1) - 190,
            width: 380,
            top: axis + 150,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Badge text={trust.badge} delay={badgeAt} fontSize={30} />
        </div>
      )}
    </AbsoluteFill>
  );
};
