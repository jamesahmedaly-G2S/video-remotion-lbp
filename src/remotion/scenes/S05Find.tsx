import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { BrowserFrame } from "../components/BrowserFrame";
import { Cursor } from "../components/Cursor";
import { FeatureHeader } from "../components/FeatureHeader";
import { Badge, CardLabel, FloatingCard } from "../components/FloatingCard";
import { useFormat } from "../components/useFormat";
import type { PaiexProps } from "../schema";
import { alpha, colors, fonts, radius, s, shadow } from "../theme";
import { sequenceFrames } from "../timing";

/**
 * S5 — Retrouver. La recherche se tape toute seule dans la bibliothèque,
 * la fiche « 02.03 — Congés payés » ressort, le curseur la sélectionne.
 */
export const S05Find: React.FC<PaiexProps> = ({ url, find }) => {
  const frame = useCurrentFrame();
  const { fps, portrait, pick } = useFormat();

  const frameW = pick(1040, 920);
  const left = pick(120, 80);
  const top = pick(300, 560);
  const contentH = frameW / 1.6;
  const searchCenter = { x: left + frameW * 0.5, y: top + 46 + contentH * 0.265 };

  const focusAt = s(1.85, fps);
  const typeFrom = s(2.0, fps);
  const typeTo = s(3.4, fps);
  const dimAt = s(3.5, fps);
  const resultAt = s(3.7, fps);
  const badgeAt = s(4.3, fps);
  const selectAt = s(5.3, fps);

  const typed = find.query.slice(
    0,
    Math.round(
      interpolate(frame, [typeFrom, typeTo], [0, find.query.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  const focused = frame >= focusAt;
  const caretOn = frame < typeTo + 6 || Math.floor((frame - typeTo) / 15) % 2 === 1;
  const selected = interpolate(frame, [selectAt, selectAt + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const result = portrait
    ? { left: 80, top: 1206, width: 920, height: 270 }
    : { left: 1210, top: 392, width: 590, height: 340 };

  return (
    <AbsoluteFill>
      <Background variant="creme" />
      <FeatureHeader kicker={find.kicker} title={find.title} />
      <BrowserFrame
        src={find.capture}
        url={url}
        width={frameW}
        aspect={1.6}
        delay={s(1.1, fps)}
        zoomFrames={sequenceFrames("find", fps)}
        zoomOrigin="50% 26%"
        style={{ left, top }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: alpha.mineral(0.72),
            opacity: interpolate(frame, [dimAt, dimAt + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "7%",
            width: "86%",
            top: "20%",
            height: "13%",
            display: "flex",
            alignItems: "center",
            gap: 22,
            padding: "0 30px",
            borderRadius: radius.md,
            backgroundColor: colors.blanc,
            border: `2px solid ${focused ? colors.framboise : colors.ligne}`,
            boxShadow: focused ? `0 0 0 6px ${alpha.framboise(0.1)}, ${shadow.float}` : shadow.float,
            opacity: interpolate(frame, [s(1.3, fps), s(1.6, fps)], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.sans,
            fontSize: pick(36, 32),
            color: colors.encre,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24">
            <circle cx="10.5" cy="10.5" r="6.5" stroke={colors.carbone} strokeWidth="2.2" fill="none" />
            <path d="M15.5 15.5 L20 20" stroke={colors.carbone} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", alignItems: "center", whiteSpace: "pre" }}>
            {typed.length > 0 ? (
              typed
            ) : (
              <span style={{ color: colors.carbone }}>{find.placeholder}</span>
            )}
            {focused ? (
              <div
                style={{
                  width: 3,
                  height: pick(40, 36),
                  marginLeft: 3,
                  backgroundColor: colors.framboise,
                  opacity: caretOn ? 1 : 0,
                }}
              />
            ) : null}
          </div>
        </div>
      </BrowserFrame>
      <FloatingCard
        delay={resultAt}
        from={portrait ? "bottom" : "left"}
        style={{
          ...result,
          padding: pick("34px 40px", "28px 36px"),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `2px solid ${selected > 0 ? colors.framboise : colors.ligne}`,
          boxShadow: `0 0 0 ${8 * selected}px ${alpha.framboise(0.12)}, ${shadow.float}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: colors.famille.sable,
              }}
            />
            <CardLabel>{find.resultFamily}</CardLabel>
          </div>
          <Badge text={find.resultBadge} delay={badgeAt} fontSize={24} />
        </div>
        <div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 30,
              color: colors.framboise,
              marginBottom: 6,
            }}
          >
            {find.resultCode}
          </div>
          <div
            style={{
              fontFamily: fonts.sans,
              fontWeight: 700,
              fontSize: pick(64, 56),
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: colors.encre,
            }}
          >
            {find.resultTitle}
          </div>
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 30,
            color: colors.carbone,
            whiteSpace: "nowrap",
          }}
        >
          {find.resultMeta}
        </div>
      </FloatingCard>
      <Cursor
        points={[
          { x: pick(900, 820), y: pick(800, 1000), at: s(1.2, fps) },
          { ...searchCenter, at: focusAt },
          { ...searchCenter, at: s(4.4, fps) },
          {
            x: result.left + result.width * 0.62,
            y: result.top + result.height * 0.5,
            at: selectAt,
          },
        ]}
        clicks={[focusAt, selectAt]}
      />
    </AbsoluteFill>
  );
};
