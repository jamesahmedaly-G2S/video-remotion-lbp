import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { BrowserFrame } from "../components/BrowserFrame";
import { FeatureHeader } from "../components/FeatureHeader";
import { Badge, CardLabel } from "../components/FloatingCard";
import { Highlight } from "../components/Highlight";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { colors, enter, fonts, radius, s, shadow } from "../theme";
import { sequenceFrames } from "../timing";

const LAYER_COLORS = [colors.famille.ardoise, colors.famille.lavande, colors.famille.terreCuite];

/**
 * S6 — Contextualiser. Trois couches s'empilent (loi → CCN → accord
 * d'entreprise) puis fusionnent en « Ce qui s'applique chez vous ».
 */
export const S06Contextualize: React.FC<PaiexProps> = ({ url, contextualize }) => {
  const frame = useCurrentFrame();
  const { fps, portrait, pick } = useFormat();

  const layerAt = [s(1.9, fps), s(2.7, fps), s(3.5, fps)];
  const mergeAt = s(4.9, fps);
  const resultAt = s(5.25, fps);
  const badgeAt = s(5.8, fps);
  const merge = enter(frame, fps, mergeAt, 0.6);
  const res = enter(frame, fps, resultAt);

  // Colonne des couches
  const col = portrait
    ? { left: 80, width: 920, top: 990, step: 132, h: 112 }
    : { left: 1130, width: 670, top: 380, step: 150, h: 124 };
  const middleTop = col.top + col.step;

  return (
    <AbsoluteFill style={{ isolation: "isolate" }}>
      <Background variant="creme" />
      <FeatureHeader kicker={contextualize.kicker} title={contextualize.title} />
      <BrowserFrame
        src={contextualize.capture}
        url={url}
        width={pick(940, 920)}
        aspect={1.5}
        delay={s(1.0, fps)}
        zoomFrames={sequenceFrames("contextualize", fps)}
        zoomOrigin="50% 82%"
        style={{ left: pick(120, 80), top: pick(300, 560) }}
      >
        <Highlight x={12} y={79.5} w={76} h={5} from={resultAt} to={s(9, fps)} />
      </BrowserFrame>

      {contextualize.layers.map((layer, i) => {
        const p = enter(frame, fps, layerAt[i]);
        const top = interpolate(merge, [0, 1], [col.top + i * col.step, middleTop]);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: col.left,
              width: col.width,
              top,
              height: col.h,
              display: "flex",
              alignItems: "center",
              gap: 26,
              paddingRight: 30,
              borderRadius: radius.md,
              overflow: "hidden",
              backgroundColor: colors.blanc,
              border: `1px solid ${colors.ligne}`,
              boxShadow: shadow.float,
              opacity: p * (1 - merge),
              translate: `0px ${interpolate(p, [0, 1], [50, 0])}px`,
              scale: interpolate(merge, [0, 1], [1, 0.92]),
              zIndex: i,
            }}
          >
            <div style={{ width: 10, alignSelf: "stretch", backgroundColor: LAYER_COLORS[i] }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <CardLabel color={colors.framboise}>
                {String(i + 1).padStart(2, "0")} · {layer.tag}
              </CardLabel>
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontWeight: 500,
                  fontSize: 40,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: colors.encre,
                  whiteSpace: "nowrap",
                }}
              >
                {layer.label}
              </div>
            </div>
          </div>
        );
      })}

      {[0, 1].map((i) => (
        <div
          key={`plus-${i}`}
          style={{
            position: "absolute",
            left: col.left + col.width / 2 - 18,
            top: col.top + col.h + i * col.step + (col.step - col.h) / 2 - 18,
            width: 36,
            height: 36,
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.framboiseDoux,
            color: colors.framboise,
            fontFamily: fonts.sans,
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1,
            zIndex: 5,
            opacity: enter(frame, fps, layerAt[i + 1] - 4) * (1 - merge),
          }}
        >
          +
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: col.left,
          width: col.width,
          top: middleTop - pick(36, 30),
          height: col.h + pick(72, 60),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
          padding: "0 40px",
          borderRadius: radius.lg,
          backgroundColor: colors.blanc,
          border: `2px solid ${colors.vert}`,
          boxShadow: shadow.float,
          opacity: res,
          scale: interpolate(res, [0, 1], [0.9, 1]),
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {LAYER_COLORS.map((c) => (
              <div key={c} style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: c }} />
            ))}
          </div>
          <Badge text={contextualize.resultBadge} delay={badgeAt} fontSize={24} />
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontWeight: 700,
            fontSize: pick(46, 48),
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: colors.encre,
          }}
        >
          {contextualize.result}
        </div>
      </div>
    </AbsoluteFill>
  );
};
