import { useVideoConfig } from "remotion";
import { s } from "../theme";
import { AnimatedTitle } from "./AnimatedTitle";
import { Kicker } from "./Kicker";
import { useFormat } from "./useFormat";

/** En-tête des scènes produit : étiquette « 0X / … » puis titre mot par mot. */
export const FeatureHeader: React.FC<{
  readonly kicker: string;
  readonly title: string;
  readonly color?: string;
  readonly kickerColor?: string;
}> = ({ kicker, title, color, kickerColor }) => {
  const { fps } = useVideoConfig();
  const { pick } = useFormat();
  return (
    <div
      style={{
        position: "absolute",
        left: pick(120, 80),
        right: pick(120, 80),
        top: pick(104, 270),
        display: "flex",
        flexDirection: "column",
        gap: pick(22, 26),
      }}
    >
      <Kicker text={kicker} delay={s(0.3, fps)} color={kickerColor} />
      <AnimatedTitle
        text={title}
        delay={s(0.45, fps)}
        fontSize={pick(88, 84)}
        color={color}
      />
    </div>
  );
};
