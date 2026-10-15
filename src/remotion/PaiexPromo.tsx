import { Audio } from "@remotion/media";
import { springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { framboiseWipe } from "./components/framboiseWipe";
import { SafeArea } from "./components/SafeArea";
import { dbToGain, SoundProvider } from "./components/Sound";
import { S01Hook } from "./scenes/S01Hook";
import { S02Problem } from "./scenes/S02Problem";
import { S03Brand } from "./scenes/S03Brand";
import { S04Centralize } from "./scenes/S04Centralize";
import { S05Find } from "./scenes/S05Find";
import { S06Contextualize } from "./scenes/S06Contextualize";
import { S07Trust } from "./scenes/S07Trust";
import { S08Transmit } from "./scenes/S08Transmit";
import { S09Cta } from "./scenes/S09Cta";
import type { PaiexProps } from "./schema";
import { colors, s, SPRING } from "./theme";
import { SCENE_ORDER, sceneStartFrame, sequenceFrames, transitionFrames } from "./timing";

/**
 * Vidéo complète (16:9 et 9:16). Les scènes s'adaptent au format via useFormat().
 * Transitions : une seule famille, fondu + wipe framboise, 12 images, calées
 * sur les temps de la musique (voir timing.ts).
 */
export const PaiexPromo: React.FC<PaiexProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { audio } = props;
  const sfxVolume = audio.musicVolume * dbToGain(audio.sfxGainDb);
  const timing = springTiming({
    config: SPRING,
    durationInFrames: transitionFrames(fps),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.creme }}>
      <SoundProvider value={{ clickSrc: audio.clickSrc, sfxVolume }}>
        <TransitionSeries name="Scènes">
          <TransitionSeries.Sequence
            name="S1 Accroche"
            durationInFrames={sequenceFrames("hook", fps)}
            premountFor={fps}
          >
            <S01Hook {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
          <TransitionSeries.Sequence
            name="S2 Problème"
            durationInFrames={sequenceFrames("problem", fps)}
            premountFor={fps}
          >
            <S02Problem {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={framboiseWipe()} timing={timing} />
          <TransitionSeries.Sequence
            name="S3 Marque"
            durationInFrames={sequenceFrames("brand", fps)}
            premountFor={fps}
          >
            <S03Brand {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
          <TransitionSeries.Sequence
            name="S4 Centraliser"
            durationInFrames={sequenceFrames("centralize", fps)}
            premountFor={fps}
          >
            <S04Centralize {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
          <TransitionSeries.Sequence
            name="S5 Retrouver"
            durationInFrames={sequenceFrames("find", fps)}
            premountFor={fps}
          >
            <S05Find {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
          <TransitionSeries.Sequence
            name="S6 Contextualiser"
            durationInFrames={sequenceFrames("contextualize", fps)}
            premountFor={fps}
          >
            <S06Contextualize {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={framboiseWipe()} timing={timing} />
          <TransitionSeries.Sequence
            name="S7 Confiance"
            durationInFrames={sequenceFrames("trust", fps)}
            premountFor={fps}
          >
            <S07Trust {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={framboiseWipe()} timing={timing} />
          <TransitionSeries.Sequence
            name="S8 Transmettre"
            durationInFrames={sequenceFrames("transmit", fps)}
            premountFor={fps}
          >
            <S08Transmit {...props} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition presentation={fade()} timing={timing} />
          <TransitionSeries.Sequence
            name="S9 Appel à l'action"
            durationInFrames={sequenceFrames("cta", fps)}
            premountFor={fps}
          >
            <S09Cta {...props} />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {audio.musicSrc ? (
          <Audio
            name="Musique"
            src={staticFile(audio.musicSrc)}
            premountFor={fps}
            volume={
              audio.musicVolume *
              interpolate(
                frame,
                [0, s(0.5, fps), durationInFrames - s(1.5, fps), durationInFrames],
                [0, 1, 1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )
            }
          />
        ) : null}
        {audio.whooshSrc
          ? SCENE_ORDER.slice(1).map((key) => (
              <Audio
                key={key}
                name={`Whoosh ${key}`}
                src={staticFile(audio.whooshSrc)}
                from={sceneStartFrame(key, fps) - 3}
                volume={sfxVolume}
                premountFor={fps}
              />
            ))
          : null}
      </SoundProvider>
      <SafeArea show={props.showSafeArea} />
    </AbsoluteFill>
  );
};
