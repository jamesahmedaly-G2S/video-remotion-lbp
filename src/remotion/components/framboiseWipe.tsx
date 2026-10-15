import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { colors } from "../theme";

type WipeProps = Record<string, never>;

// Largeur de la bande framboise, en % de l'image.
const BAND = 34;

/**
 * Wipe framboise : une bande framboise (filet framboise foncé en tête) balaie
 * l'image de gauche à droite et découvre la scène suivante derrière elle.
 */
const FramboiseWipe: React.FC<TransitionPresentationComponentProps<WipeProps>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill style={{ isolation: "isolate" }}>{children}</AbsoluteFill>;
  }
  const lead = presentationProgress * (100 + BAND);
  const trail = lead - BAND;
  return (
    <AbsoluteFill style={{ isolation: "isolate" }}>
      <AbsoluteFill
        style={{ clipPath: `inset(0 ${100 - Math.max(0, trail)}% 0 0)` }}
      >
        {children}
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${trail}%`,
          width: `${BAND}%`,
          backgroundColor: colors.framboise,
          borderRight: `14px solid ${colors.framboiseFonce}`,
        }}
      />
    </AbsoluteFill>
  );
};

export const framboiseWipe = (): TransitionPresentation<WipeProps> => ({
  component: FramboiseWipe,
  props: {},
});
