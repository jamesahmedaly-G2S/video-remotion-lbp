import { createContext, useContext } from "react";

type SoundSettings = {
  /** Chemin du bruitage de clic dans public/ (vide = aucun). */
  readonly clickSrc: string;
  /** Volume linéaire des bruitages (déjà converti depuis les dB). */
  readonly sfxVolume: number;
};

const SoundContext = createContext<SoundSettings>({ clickSrc: "", sfxVolume: 0 });

export const SoundProvider = SoundContext.Provider;
export const useSound = () => useContext(SoundContext);

/** Gain en dB -> facteur linéaire. */
export const dbToGain = (db: number) => Math.pow(10, db / 20);
