import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { BrowserFrame } from "../components/BrowserFrame";
import { Cursor } from "../components/Cursor";
import { FeatureHeader } from "../components/FeatureHeader";
import { CardLabel, Counter, FloatingCard } from "../components/FloatingCard";
import { Highlight } from "../components/Highlight";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { colors, fonts, s, STAGGER_SEC } from "../theme";
import { sequenceFrames } from "../timing";

// Tuiles « Les chiffres clés » de vue-ensemble.jpg (1440×900), en %.
const TILES = [
  { x: 9.0, w: 19.8 },
  { x: 29.7, w: 19.8 },
  { x: 50.4, w: 19.8 },
];
const TILE_Y = 86.2;
const TILE_H = 12;
const IMG_W = 1440;
const TILE_CENTERS_PX = [272, 570, 868];
const TILE_CENTER_Y_PX = 830;

/**
 * S4 — Centraliser. Capture de la vue d'ensemble, curseur qui survole les
 * tuiles, cartes de chiffres en cascade.
 */
export const S04Centralize: React.FC<PaiexProps> = ({ url, centralize }) => {
  const { fps, portrait, pick } = useFormat();

  const frameW = pick(1040, 920);
  const left = pick(120, 80);
  const top = pick(300, 560);
  const k = frameW / IMG_W;
  const contentTop = top + 46;
  const tile = (i: number) => ({
    x: left + TILE_CENTERS_PX[i] * k,
    y: contentTop + TILE_CENTER_Y_PX * k,
  });
  const hover = [s(2.9, fps), s(3.6, fps), s(4.3, fps)];
  const cardsAt = s(3.0, fps);
  const stagger = s(STAGGER_SEC, fps);

  return (
    <AbsoluteFill>
      <Background variant="creme" />
      <FeatureHeader kicker={centralize.kicker} title={centralize.title} />
      <BrowserFrame
        src={centralize.capture}
        url={url}
        width={frameW}
        aspect={1.6}
        delay={s(1.1, fps)}
        zoomFrames={sequenceFrames("centralize", fps)}
        zoomOrigin="50% 70%"
        style={{ left, top }}
      >
        {TILES.map((t, i) => (
          <Highlight
            key={i}
            x={t.x}
            y={TILE_Y}
            w={t.w}
            h={TILE_H}
            from={hover[i] - 4}
            to={i < 2 ? hover[i + 1] - 2 : s(5.6, fps)}
          />
        ))}
      </BrowserFrame>
      {centralize.stats.map((stat, i) => (
        <FloatingCard
          key={i}
          delay={cardsAt + i * stagger}
          from="right"
          style={
            portrait
              ? {
                  left: 80,
                  width: 920,
                  top: 1222 + i * 92,
                  height: 78,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 32px",
                }
              : {
                  left: 1250,
                  width: 520,
                  top: 360 + i * 196,
                  height: 170,
                  padding: "28px 36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }
          }
        >
          <CardLabel>{stat.label}</CardLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontFamily: fonts.sans,
              fontWeight: 700,
              fontSize: stat.countTo > 0 ? pick(76, 48) : pick(56, 40),
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: stat.countTo > 0 ? colors.encre : colors.vert,
            }}
          >
            {stat.countTo > 0 ? null : (
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: colors.vert,
                }}
              />
            )}
            {stat.countTo > 0 ? (
              <Counter to={stat.countTo} delay={cardsAt + i * stagger} />
            ) : (
              stat.value
            )}
          </div>
        </FloatingCard>
      ))}
      <Cursor
        points={[
          { x: pick(820, 640), y: pick(640, 880), at: s(2.2, fps) },
          { ...tile(0), at: hover[0] },
          { ...tile(1), at: hover[1] },
          { ...tile(2), at: hover[2] },
        ]}
      />
    </AbsoluteFill>
  );
};
