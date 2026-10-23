# Changelog

Toutes les évolutions notables de la vidéo de présentation PAIEX+ sont consignées ici.

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Numérotation : [SemVer](https://semver.org/lang/fr/), appliquée aux livrables vidéo :

- **majeure** (`2.0.0`) : nouveau scénario ou nouveau message ;
- **mineure** (`1.1.0`) : scène ajoutée, nouveau format, nouvelle musique ;
- **correctif** (`1.0.1`) : correction de texte, de timing, de couleur ou de niveau sonore.

Chaque version livrée indique les fichiers produits (nommage du § 3.6 de `TASK.md`).

Rubriques : `Ajouté`, `Modifié`, `Corrigé`, `Supprimé`, `Livré`.

## [Non publié]

### Ajouté

- `TASK.md` : cadrage (objectif, cible, ton, diffusion), charte PAIEX+, conventions de montage (rythme, mouvement, cadre, accessibilité, son, export), conventions techniques Remotion, découpage en 9 scènes sur 60 s et backlog en 9 phases.
- `CHANGELOG.md` : ce journal.
- Mise en place (phase 1) : `@remotion/transitions` et `@remotion/media` 4.0.535, captures copiées dans `public/captures/`, dossiers `public/audio/` et `assets/licences/`, scripts npm `studio`, `render:16x9`, `render:9x16`, `still:poster`, `typecheck`.
- Fondations (phase 2) : `theme.ts` (charte, polices Archivo et IBM Plex Mono, spring damping 200, tempo 100 BPM, zones de sécurité), `schema.ts` (schéma Zod de tous les textes, chiffres, URL et chemins audio), `timing.ts` (durées en secondes, coupes calées sur les temps, durée totale = scènes − transitions), compositions `PaiexPromo` (1920×1080) et `PaiexPromoVertical` (1080×1920) avec `calculateMetadata`, composant `SafeArea` visible dans le Studio uniquement.
- Composants (phase 3) : `AnimatedTitle`, `Kicker`, `BrowserFrame`, `Cursor`, `FloatingCard` (avec `Counter`, `Badge`), `Logo`, `Background`, plus `Fragments`, `FeatureHeader`, `Highlight` et la transition `framboiseWipe`.
- Scènes S1 à S9 (phase 4), enchaînées par `TransitionSeries` (fondus et wipes framboise de 12 images), chaque scène aussi enregistrée seule dans le dossier `Scenes` du Studio.
- Version 9:16 (tâche 6.1) : les mêmes scènes, mise en page adaptée par `useFormat()`, zones masquées respectées.
- Pistes audio facultatives : musique (`audio.musicSrc`, fondus 0,5 s / 1,5 s), whooshs sur les coupes (`audio.whooshSrc`), clics du curseur (`audio.clickSrc`), à −15 dB sous la musique par défaut.

### Modifié

- Découpage (`TASK.md` § 5) : durées recalées sur la grille de la musique ; S2 passe à 7,8 s pour la lecture, S5 à 7,8 s et S6 à 8,4 s pour compenser (total inchangé : 60 s).
- Application Next.js : le `<Player>` affiche désormais `PaiexPromo` ; le champ texte modifie la promesse finale.
- `package.json` : nom `paiex-promo-video`, auteur G2S. `README.md` réécrit pour le projet.
- ESLint ignore les dossiers d'outillage `.agents/` et `.claude/`.

### Corrigé

- S2 Problème : guillemet fermant « » » ajouté à la fin de la question (framboise, apparaît après le dernier mot, jamais seul en début de ligne). Nouvelle option `trailing` sur `AnimatedTitle`.

### Supprimé

- Composition de démonstration du modèle (`src/remotion/MyComp/`, dont `NextLogo`).

## [0.1.0] - 2026-10-15

### Ajouté

- Initialisation du projet à partir du modèle Remotion + Next.js (Remotion 4.0.535, Next.js 16.4).
