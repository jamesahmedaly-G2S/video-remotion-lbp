import { AbsoluteFill, getRemotionEnvironment } from "remotion";
import { colors } from "../theme";
import { useFormat } from "./useFormat";

/**
 * Cadre de contrôle des zones de sécurité (TASK.md § 3.3).
 * Visible uniquement dans le Studio et si `show` est vrai ; jamais au rendu.
 */
export const SafeArea: React.FC<{ readonly show: boolean }> = ({ show }) => {
  const { safe, portrait } = useFormat();
  if (!show || !getRemotionEnvironment().isStudio) {
    return null;
  }
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: safe.top,
          bottom: safe.bottom,
          left: safe.left,
          right: safe.right,
          border: `2px dashed ${colors.framboise}`,
        }}
      />
      {portrait ? null : (
        <div
          style={{
            position: "absolute",
            inset: safe.work,
            border: `1px dashed ${colors.vert}`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
