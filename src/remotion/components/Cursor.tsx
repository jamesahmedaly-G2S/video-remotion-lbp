import { Audio } from "@remotion/media";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { alpha, colors, SPRING } from "../theme";
import { useSound } from "./Sound";

export type CursorPoint = {
  readonly x: number;
  readonly y: number;
  /** Image à laquelle le curseur atteint ce point (relative à la scène). */
  readonly at: number;
};

type Props = {
  /** Trajet : le curseur apparaît au premier point, puis rejoint les suivants. */
  readonly points: CursorPoint[];
  /** Images des clics (relatives à la scène). */
  readonly clicks?: number[];
  /** Courbure du trajet (fraction de la longueur du segment). */
  readonly bend?: number;
};

const RIPPLE_FRAMES = 18;

/**
 * Curseur de souris : trajet en courbe (Bézier quadratique), ralentit avant
 * d'arriver (spring damping 200), onde au clic.
 */
export const Cursor: React.FC<Props> = ({ points, clicks = [], bend = 0.22 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { clickSrc, sfxVolume } = useSound();

  // Position courante
  let x = points[0].x;
  let y = points[0].y;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (frame < a.at) {
      break;
    }
    const t = spring({
      frame: frame - a.at,
      fps,
      config: SPRING,
      durationInFrames: b.at - a.at,
    });
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const side = i % 2 === 0 ? 1 : -1;
    const cx = (a.x + b.x) / 2 - dy * bend * side;
    const cy = (a.y + b.y) / 2 + dx * bend * side;
    x = (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * cx + t * t * b.x;
    y = (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * cy + t * t * b.y;
  }

  const appear = interpolate(frame, [points[0].at - 8, points[0].at], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const press = clicks.reduce(
    (acc, c) =>
      Math.min(
        acc,
        interpolate(frame, [c - 3, c, c + 6], [1, 0.82, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      ),
    1,
  );

  return (
    <>
      {clicks.map((c) => {
        const r = interpolate(frame, [c, c + RIPPLE_FRAMES], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        if (frame < c || frame > c + RIPPLE_FRAMES) {
          return null;
        }
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: x - 40,
              top: y - 40,
              width: 80,
              height: 80,
              borderRadius: 40,
              border: `3px solid ${colors.framboise}`,
              backgroundColor: alpha.framboise(0.12),
              scale: interpolate(r, [0, 1], [0.15, 1]),
              opacity: interpolate(r, [0, 1], [0.7, 0]),
            }}
          />
        );
      })}
      {clickSrc
        ? clicks.map((c) => (
            <Audio
              key={`sfx-${c}`}
              src={staticFile(clickSrc)}
              from={c}
              volume={sfxVolume}
              premountFor={fps}
            />
          ))
        : null}
      <svg
        width="40"
        height="46"
        viewBox="0 0 40 46"
        style={{
          position: "absolute",
          left: x - 6,
          top: y - 4,
          opacity: appear,
          scale: press,
          transformOrigin: "6px 4px",
          filter: `drop-shadow(0 4px 8px ${alpha.encre(0.25)})`,
        }}
      >
        <path
          d="M6 4 L6 36 L14 28.5 L19.5 41 L25 38.6 L19.6 26.4 L30.5 26.4 Z"
          fill={colors.encre}
          stroke={colors.blanc}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
