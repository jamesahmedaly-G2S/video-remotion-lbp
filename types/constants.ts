import {
  defaultPaiexProps,
  PaiexPropsSchema,
} from "../src/remotion/schema";
import { FPS, totalFrames } from "../src/remotion/timing";

// Constantes partagées par l'application Next.js (Player, rendu Lambda).
export const COMP_NAME = "PaiexPromo";

export const CompositionProps = PaiexPropsSchema;
export const defaultCompProps = defaultPaiexProps;

export const DURATION_IN_FRAMES = totalFrames(FPS);
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = FPS;
