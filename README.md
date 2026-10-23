# Vidéo de présentation PAIEX+

Vidéo promotionnelle de 60 s pour **PAIEX+, par G2S** — « la mémoire digitale de la paie de votre entreprise » — réalisée avec [Remotion](https://www.remotion.dev) (React + TypeScript).

Cadrage, charte, conventions et backlog : [`TASK.md`](TASK.md). Historique : [`CHANGELOG.md`](CHANGELOG.md).

## Compositions

| Identifiant | Format | Usage |
|---|---|---|
| `PaiexPromo` | 1920×1080, 30 i/s, 60 s | Version maîtresse 16:9 |
| `PaiexPromoVertical` | 1080×1920, 30 i/s, 60 s | Stories / reels 9:16 |
| `Scenes/S01-Accroche` … `S09-Appel` | 1920×1080 | Chaque scène seule, pour la relecture |

Tous les textes, chiffres, URL et chemins audio sont des props (schéma Zod dans `src/remotion/schema.ts`) et se modifient dans le panneau des props du Studio.

## Commandes

```bash
npm i                 # installation
npm run studio        # aperçu interactif (Remotion Studio)
npm run render:16x9   # rendu 16:9 -> out/paiex-promo-16x9.mp4
npm run render:9x16   # rendu 9:16 -> out/paiex-promo-9x16.mp4
npm run still:poster  # image d'aperçu -> out/paiex-poster.png
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
```

Rendu minimal demandé dans le brief :

```bash
npx remotion render PaiexPromo out/paiex-promo.mp4 --codec h264
```

Les livrables finaux suivent le nommage `PAIEX_promo_<format>_v<NN>_<AAAAMMJJ>.mp4` (TASK.md § 3.6).

## Arborescence

```
src/remotion/
  Root.tsx          compositions et calcul de la durée (calculateMetadata)
  PaiexPromo.tsx    enchaînement des 9 scènes (TransitionSeries), musique, bruitages
  theme.ts          couleurs, polices, courbe d'animation, tempo, zones de sécurité
  schema.ts         schéma Zod des props + valeurs par défaut
  timing.ts         durées des scènes et des transitions
  scenes/           S01Hook … S09Cta
  components/       BrowserFrame, Cursor, FloatingCard, AnimatedTitle, Kicker, Logo,
                    Background, SafeArea, Fragments, FeatureHeader, Highlight, framboiseWipe
public/captures/    captures d'écran (données fictives uniquement)
public/audio/       musique et bruitages
assets/licences/    licences de la musique et des bruitages
```

## Son

La musique et les bruitages sont facultatifs. Déposer les fichiers dans `public/audio/` puis renseigner les props `audio.musicSrc`, `audio.whooshSrc` et `audio.clickSrc` (ex. `audio/musique.mp3`). Fondu d'entrée 0,5 s, fondu de sortie 1,5 s ; bruitages à `audio.sfxGainDb` (−15 dB par défaut) sous la musique. Enregistrer la licence dans `assets/licences/` avant toute livraison.

## Application Next.js et Lambda

Le projet vient du modèle Remotion + Next.js : `npm run dev` affiche la vidéo dans un `<Player>`. Le rendu sur AWS Lambda (`src/lambda`, `src/app/api/lambda`, `deploy.mjs`, `config.mjs`) est conservé mais inutilisé : le rendu se fait en local (TASK.md § 1.5, tâche 1.2 à trancher).
# video-remotion-lbp
