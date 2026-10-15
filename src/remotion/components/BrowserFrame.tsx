import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, enter, fonts, radius, shadow } from "../theme";

export const BAR_HEIGHT = 46;

type Props = {
  /** Chemin dans public/ (ex. « captures/vue-ensemble.jpg »). */
  readonly src: string;
  readonly url: string;
  readonly width: number;
  /** Rapport largeur / hauteur de la zone de contenu. */
  readonly aspect: number;
  /** Image d'entrée (relative à la scène). */
  readonly delay?: number;
  /** Durée du zoom lent (Ken Burns), en images. */
  readonly zoomFrames: number;
  /** Point fixe du zoom. */
  readonly zoomOrigin?: string;
  /** Superpositions dans la zone de contenu (suivent le zoom). */
  readonly children?: React.ReactNode;
  readonly style?: React.CSSProperties;
};

/**
 * Fenêtre de navigateur stylisée : barre avec trois pastilles et l'URL.
 * Entrée : montée + inclinaison 3D (rotateX 8°, rotateY -10°) qui se redresse.
 * Contenu : zoom lent de 1 à 1,06.
 */
export const BrowserFrame: React.FC<Props> = ({
  src,
  url,
  width,
  aspect,
  delay = 0,
  zoomFrames,
  zoomOrigin = "50% 30%",
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = enter(frame, fps, delay, 0.8);
  const tilt = enter(frame, fps, delay, 1.4);
  const contentHeight = Math.round(width / aspect);

  return (
    <div
      style={{
        position: "absolute",
        width,
        perspective: 2200,
        opacity: p,
        translate: `0px ${interpolate(p, [0, 1], [70, 0])}px`,
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: radius.lg,
          overflow: "hidden",
          backgroundColor: colors.blanc,
          border: `1px solid ${colors.ligne}`,
          boxShadow: shadow.float,
          transform: `rotateX(${interpolate(tilt, [0, 1], [8, 0])}deg) rotateY(${interpolate(tilt, [0, 1], [-10, 0])}deg)`,
          transformOrigin: "50% 100%",
        }}
      >
        <div
          style={{
            height: BAR_HEIGHT,
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            gap: 9,
            borderBottom: `1px solid ${colors.ligne}`,
            backgroundColor: colors.mineral,
          }}
        >
          <Dot color={colors.famille.terreCuite} />
          <Dot color={colors.famille.sable} />
          <Dot color={colors.famille.sauge} />
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 28,
              padding: "0 22px",
              borderRadius: 14,
              backgroundColor: colors.blanc,
              border: `1px solid ${colors.ligne}`,
              fontFamily: fonts.mono,
              fontSize: 17,
              color: colors.carbone,
              translate: "-27px 0px",
            }}
          >
            <svg width="12" height="14" viewBox="0 0 12 14">
              <rect x="1" y="6" width="10" height="7.5" rx="2" fill={colors.carbone} />
              <path d="M3.5 6V4.2a2.5 2.5 0 0 1 5 0V6" stroke={colors.carbone} strokeWidth="1.6" fill="none" />
            </svg>
            {url}
          </div>
        </div>
        <div style={{ position: "relative", width, height: contentHeight, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              scale: interpolate(frame, [delay, delay + zoomFrames], [1, 1.06], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transformOrigin: zoomOrigin,
            }}
          >
            <Img
              src={staticFile(src)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 0%",
              }}
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dot: React.FC<{ readonly color: string }> = ({ color }) => (
  <div style={{ width: 13, height: 13, borderRadius: 7, backgroundColor: color }} />
);

/** Hauteur totale de la fenêtre (barre + contenu). */
export const browserHeight = (width: number, aspect: number) =>
  BAR_HEIGHT + Math.round(width / aspect);
