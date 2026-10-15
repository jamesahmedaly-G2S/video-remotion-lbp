import { useVideoConfig } from "remotion";
import { SAFE } from "../theme";

/** Format courant : 16:9 (paysage) ou 9:16 (portrait), et ses zones de sécurité. */
export const useFormat = () => {
  const { width, height, fps } = useVideoConfig();
  const portrait = height > width;
  return {
    portrait,
    width,
    height,
    fps,
    safe: portrait ? SAFE.portrait : SAFE.landscape,
    /** Choisit une valeur selon le format. */
    pick: <T,>(landscape: T, vertical: T): T => (portrait ? vertical : landscape),
  };
};
