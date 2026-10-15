import { Composition, Folder, type CalculateMetadataFunction } from "remotion";
import { PaiexPromo } from "./PaiexPromo";
import { S01Hook } from "./scenes/S01Hook";
import { S02Problem } from "./scenes/S02Problem";
import { S03Brand } from "./scenes/S03Brand";
import { S04Centralize } from "./scenes/S04Centralize";
import { S05Find } from "./scenes/S05Find";
import { S06Contextualize } from "./scenes/S06Contextualize";
import { S07Trust } from "./scenes/S07Trust";
import { S08Transmit } from "./scenes/S08Transmit";
import { S09Cta } from "./scenes/S09Cta";
import { defaultPaiexProps, PaiexPropsSchema, type PaiexProps } from "./schema";
import { FPS, sequenceFrames, totalFrames } from "./timing";

// Durée totale = somme des scènes - somme des transitions (timing.ts).
const calculateMetadata: CalculateMetadataFunction<PaiexProps> = () => ({
  durationInFrames: totalFrames(FPS),
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PaiexPromo"
        component={PaiexPromo}
        schema={PaiexPropsSchema}
        defaultProps={defaultPaiexProps}
        calculateMetadata={calculateMetadata}
        durationInFrames={1800}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="PaiexPromoVertical"
        component={PaiexPromo}
        schema={PaiexPropsSchema}
        defaultProps={defaultPaiexProps}
        calculateMetadata={calculateMetadata}
        durationInFrames={1800}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* Chaque scène seule, pour la relecture image par image (16:9). */}
      <Folder name="Scenes">
        <Composition
          id="S01-Accroche"
          component={S01Hook}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("hook", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S02-Probleme"
          component={S02Problem}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("problem", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S03-Marque"
          component={S03Brand}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("brand", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S04-Centraliser"
          component={S04Centralize}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("centralize", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S05-Retrouver"
          component={S05Find}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("find", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S06-Contextualiser"
          component={S06Contextualize}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("contextualize", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S07-Confiance"
          component={S07Trust}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("trust", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S08-Transmettre"
          component={S08Transmit}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("transmit", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="S09-Appel"
          component={S09Cta}
          schema={PaiexPropsSchema}
          defaultProps={defaultPaiexProps}
          durationInFrames={sequenceFrames("cta", FPS)}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
