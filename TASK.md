# TASK.md — Vidéo de présentation PAIEX+

Backlog et cadrage de la vidéo promotionnelle PAIEX+ (par G2S), réalisée avec Remotion.
Méthode : prendre la prochaine tâche non cochée de la phase en cours, la terminer, la cocher, ajouter une entrée dans `CHANGELOG.md` (section `[Non publié]`), puis faire un commit (`feat:`, `fix:`, `chore:`, `docs:`).

---

## 1. Cadrage

### 1.1 Objectif

Présenter PAIEX+ en 60 secondes à un décideur qui ne connaît pas le produit. À la fin, il doit avoir compris trois choses et avoir envie de demander une démonstration :

1. **Le problème** : la connaissance paie de l'entreprise est dispersée (outils, documents, personnes).
2. **La solution** : PAIEX+ la rassemble dans un référentiel unique, adapté à l'entreprise (loi → CCN → accords internes).
3. **La confiance** : le contenu est tenu à jour et vérifié par les experts G2S avant publication.

**Appel à l'action unique** : « Demander une démonstration ».

### 1.2 Cible

DRH, responsables paie, gestionnaires paie, dirigeants de PME et d'ETI. Ce public est expert, pressé et attentif à la fiabilité.

### 1.3 Ton et style

- Premium, posé, expert, rassurant. SaaS moderne, sans esbroufe.
- Fonds clairs, beaucoup d'espace vide, mouvements fluides, typographie forte.
- **Une idée par plan.** Un seul message à l'écran à la fois.

### 1.4 Diffusion prévue

| Support | Format | Remarque |
|---|---|---|
| Site vitrine, e-mail, présentation commerciale | 16:9 · 1920×1080 | Version maîtresse |
| LinkedIn (fil), YouTube | 16:9 | Lecture souvent sans le son |
| LinkedIn, Instagram (stories / reels) | 9:16 · 1080×1920 | Respecter les zones masquées par l'interface |
| LinkedIn (fil), option | 1:1 · 1080×1080 | À décider en phase 0 |

### 1.5 Hors périmètre

- Voix off (option à trancher en phase 0 ; si oui, prévoir le script et les sous-titres).
- Rendu dans le cloud par AWS Lambda : le modèle l'inclut, mais le rendu se fait **en local** sauf décision contraire.
- Captures de données client réelles : **interdit**. Les captures ne montrent que des données fictives.

---

## 2. Charte graphique (source : `projet_lbp_v3/app/globals.css`)

Aucune couleur ni police en dehors de cette liste. Toutes les valeurs sont centralisées dans `src/remotion/theme.ts`.

| Rôle | Nom | Valeur |
|---|---|---|
| Marque, accents, bouton | Framboise | `#670626` |
| | Framboise foncé | `#3E0417` |
| | Framboise doux | `#F5E6EB` |
| Texte secondaire | Carbone | `#445068` |
| | Carbone foncé | `#364054` |
| Titres | Encre | `#25252A` |
| Fond sombre | Bleu nuit | `#29364A` |
| Fonds clairs | Minéral / Crème / Sable / Blanc | `#FAF9F7` / `#F5F0EC` / `#E8E0D6` / `#FFFFFF` |
| Filets | Ligne | `#DED9DB` |
| Validé, publié | Vert | `#0E8A87` |
| Familles de fiches (petites touches) | Sauge / Bleu ardoise / Lavande / Terre cuite / Sable | `#B8C4AC` / `#9FB6C7` / `#C3B2D4` / `#E0B3A7` / `#E3CE8C` |

**Polices** : Archivo (titres 700, texte 400/500) et IBM Plex Mono (numéros, étiquettes), chargées par `@remotion/google-fonts`.
**Titres** : interlettrage `-0.05em`. **Étiquettes** : majuscules, interlettrage `0.17em`, framboise.
**Logo** : « PAIEX+ » en encre, le « + » en framboise, mention « par G2S ».

---

## 3. Conventions de montage (à respecter sur chaque plan)

### 3.1 Rythme et lisibilité

- **Durée de lecture** : un texte reste à l'écran au moins **1 s + 0,3 s par mot**, et **2 s au minimum**, une fois l'animation d'entrée terminée.
- **Animation d'entrée** : 10 à 20 images (0,3 à 0,7 s). **Sortie** : plus rapide que l'entrée (6 à 12 images).
- **Accroche** : le premier message est lisible avant **3 s**. La première image doit être forte, car elle sert de vignette sur LinkedIn.
- **Respiration** : au moins 8 images de calme entre deux mouvements importants dans un même plan.
- **Coupes et transitions calées sur la musique** (temps fort ou mesure). La grille de tempo est notée dans `theme.ts`.
- **Plan final** : l'appel à l'action reste **immobile au moins 2 s** avant la fin, sans fondu au noir prématuré.

### 3.2 Mouvement

- Une seule courbe d'animation (même `spring` : damping 200) pour toute la vidéo, sauf exception justifiée.
- Pas plus de **deux éléments animés en même temps** dans le regard principal.
- Les mouvements partent de la direction logique (lecture de gauche à droite, empilement de bas en haut).
- Transitions : **une seule famille** (fondu + wipe framboise), 12 à 15 images. Pas de transitions décoratives variées.
- Le curseur de souris se déplace sur une courbe (pas en ligne droite) et ralentit avant le clic.

### 3.3 Cadre et composition

- **Zones de sécurité** en 16:9 : titres dans les 90 % centraux (marge de 96 px en largeur et 54 px en hauteur), marge de travail recommandée de 120 px.
- **Zones de sécurité** en 9:16 : rien d'important dans les 250 px du haut ni dans les 420 px du bas (interface des réseaux sociaux).
- Règle des tiers pour les captures d'écran et les cartes ; texte et image ne se superposent jamais sans fond.
- Taille de texte minimale : **36 px** en 1080p (texte courant), **72 à 110 px** pour les titres.
- Aucun texte coupé, aucune veuve (mot seul sur la dernière ligne d'un titre) : retours à la ligne forcés dans les props si besoin.

### 3.4 Accessibilité

- Contraste du texte : **4,5:1 minimum** (WCAG AA). Pas de texte carbone sur fond bleu nuit.
- **Pas plus de 3 flashs par seconde** (WCAG 2.3.1), pas de clignotement plein écran.
- La vidéo doit être compréhensible **sans le son** : tout le message est porté par le texte à l'écran.
- Si une voix off est ajoutée : sous-titres `.srt` livrés à part, 42 caractères par ligne maximum, 2 lignes maximum.

### 3.5 Son

- Musique sous licence (libre de droits ou achetée) : **la licence est enregistrée dans `assets/licences/`** avant la livraison.
- Fondu d'entrée de 0,5 s et fondu de sortie de 1,5 s. La musique se termine sur un temps fort, en même temps que l'image.
- Bruitages (clic, whoosh) discrets, entre -18 et -12 dB sous la musique.
- **Niveau final** : **-14 LUFS intégrés**, pic réel à **-1 dBTP** maximum (norme web : YouTube, LinkedIn). Contrôle avec `ffmpeg -af loudnorm=print_format=summary`.
- Avec une voix off : la musique baisse de 12 à 15 dB quand la voix parle (ducking).

### 3.6 Image et export

- Espace colorimétrique **Rec.709**, `yuv420p` (lisible partout, dont QuickTime et les navigateurs).
- 30 images par seconde, sans changement en cours de vidéo.
- Master : H.264, CRF 18, AAC 48 kHz 320 kbit/s.
- **Nommage** des livrables : `PAIEX_promo_<format>_v<NN>_<AAAAMMJJ>.mp4` (exemple : `PAIEX_promo_16x9_v03_20261020.mp4`). Une version n'est jamais écrasée.

---

## 4. Conventions techniques Remotion

- Toute animation dépend de `useCurrentFrame()` : **aucune** animation ou transition CSS, aucun `setTimeout`, aucun `Math.random()` (utiliser `random(seed)` de Remotion).
- `interpolate()` toujours avec `extrapolateLeft: "clamp"` et `extrapolateRight: "clamp"`.
- Les durées sont écrites en secondes et converties par une fonction `s(sec) => Math.round(sec * fps)`, jamais en nombres d'images en dur dans les scènes.
- Enchaînement par `<TransitionSeries>` (@remotion/transitions). **Attention** : une transition chevauche les deux scènes, la durée totale vaut donc la somme des scènes **moins** la somme des transitions. Le calcul est fait dans `calculateMetadata`.
- `premountFor` sur les séquences qui chargent des images ou des polices.
- Images par `<Img src={staticFile(...)} />`, son par `<Audio>` (@remotion/media). Pas de `<img>` ni d'URL externe.
- Polices chargées une seule fois (`loadFont` avec `subsets: ["latin"]` et seulement les graisses utilisées).
- Tous les textes, chiffres et URL sont des **props** validées par un schéma Zod : rien n'est écrit en dur dans les scènes.
- Une scène = un fichier dans `src/remotion/scenes/`. Composants réutilisables dans `src/remotion/components/`. Couleurs, polices, courbes et tempo dans `src/remotion/theme.ts`.
- Avant chaque commit : `npm run lint` et `npx tsc --noEmit` sans erreur.

### Arborescence cible

```
src/remotion/
  Root.tsx                 compositions PaiexPromo, PaiexPromoVertical (et PaiexPromoSquare si retenu)
  theme.ts                 couleurs, polices, spring, tempo, zones de sécurité
  schema.ts                schéma Zod des props + valeurs par défaut
  timing.ts                durées des scènes et des transitions, calcul de la durée totale
  scenes/                  S01Hook.tsx … S09Cta.tsx
  components/              BrowserFrame, Cursor, FloatingCard, AnimatedTitle, Kicker, Logo, SafeArea
public/
  captures/                vue-ensemble.jpg, bibliotheque.jpg, regles-applicables.jpg
  audio/                   musique et bruitages
assets/licences/           licences de la musique et des bruitages
out/                       rendus (ignoré par git)
```

---

## 5. Découpage (16:9, 30 i/s, 60 s = 1 800 images)

Durées calculées selon la règle de lecture du § 3.1, puis calées sur la grille de la musique (100 BPM, un temps = 0,6 s) : chaque coupe tombe sur un temps. Source : `src/remotion/timing.ts`.

| # | Scène | Images | Durée | Message à l'écran | Visuel |
|---|---|---|---|---|---|
| S1 | Accroche | 0–144 | 4,8 s | « La connaissance paie est partout. » | Mot « PAIE » au centre, fragments qui gravitent (accord, CCN, usage, note, e-mail, Excel) |
| S2 | Problème | 144–378 | 7,8 s | « Dans les outils. Dans les documents. Dans la tête des équipes. » puis « Qu'est-ce qui s'applique réellement chez nous ? » | Fragments qui se brouillent ; citation en carbone |
| S3 | Marque | 378–558 | 6 s | « PAIEX+ · PAR G2S » · « Votre paie a une histoire. Elle mérite une mémoire. » | Wipe framboise, fragments aspirés en pile de fiches |
| S4 | Centraliser | 558–792 | 7,8 s | « 01 / CENTRALISER » · « La connaissance, au même endroit. » | Capture `vue-ensemble.jpg` en 3D, cartes de chiffres |
| S5 | Retrouver | 792–1026 | 7,8 s | « 02 / BIBLIOTHÈQUE » · « Une réponse plus facile à retrouver. » | Capture `bibliotheque.jpg`, recherche tapée, fiche « 02.03 » |
| S6 | Contextualiser | 1026–1278 | 8,4 s | « 03 / RÈGLES APPLICABLES » · « Du cadre général à votre réalité. » | Trois couches : Code du travail → CCN → accord d'entreprise → « Ce qui s'applique chez vous » |
| S7 | Confiance | 1278–1494 | 7,2 s | « Chaque évolution est vérifiée par un expert avant d'arriver chez vous. » | Fond bleu nuit, frise veille → proposition → relecture → publié |
| S8 | Transmettre | 1494–1656 | 5,4 s | « Le savoir de vos équipes. Les règles de votre entreprise. Un même référentiel. » | Trois colonnes à filet framboise |
| S9 | Appel à l'action | 1656–1800 | 4,8 s | « Moins de recherches. Plus de repères. » · bouton « Demander une démonstration ↗ » · URL | Logo, clic du curseur, **immobile les 2 dernières secondes** |

---

## 6. Backlog

### Phase 0 — Validation du cadrage (bloquant)

- [ ] 0.1 Faire valider par G2S le message, le scénario et la durée (§ 1 et § 5).
- [ ] 0.2 Obtenir les **vrais chiffres** pour la scène 4 (nombre de fiches, de CCN suivies) ou décider de les retirer.
- [ ] 0.3 Confirmer l'**URL** affichée en fin de vidéo.
- [ ] 0.4 Trancher : voix off oui / non ; format 1:1 oui / non.
- [ ] 0.5 Vérifier que les trois captures de `projet_lbp_v3/public/site/` ne contiennent **que des données fictives** et sont en résolution suffisante (au moins 1 600 px de large). Sinon, refaire des captures propres depuis `lbp-staging`.
- [ ] 0.6 Choisir la musique (tempo 90 à 110 BPM), vérifier la licence pour un usage commercial sur le web et les réseaux sociaux.

### Phase 1 — Mise en place du projet

- [x] 1.1 Nettoyer le modèle : supprimer `src/remotion/MyComp/` et la composition `NextLogo`, remplacer l'auteur et le nom dans `package.json`, mettre à jour `README.md`.
- [ ] 1.2 Décider du sort de la partie Lambda (`src/lambda`, `src/app/api/lambda`, `deploy.mjs`, `config.mjs`) : la garder désactivée ou la supprimer.
- [x] 1.3 Ajouter `@remotion/transitions` et `@remotion/media` à la **même version exacte** que `remotion` (4.0.535).
- [x] 1.4 Ajouter `out/` au `.gitignore`.
- [x] 1.5 Copier les captures dans `public/captures/` et créer `public/audio/` et `assets/licences/`.
- [x] 1.6 Ajouter des scripts npm : `studio`, `render:16x9`, `render:9x16`, `still:poster`, `typecheck`.

### Phase 2 — Fondations

- [x] 2.1 `theme.ts` : couleurs (§ 2), polices, spring de référence, tempo, zones de sécurité par format.
- [x] 2.2 `schema.ts` : schéma Zod de tous les textes, chiffres, URL et chemins audio, avec valeurs par défaut.
- [x] 2.3 `timing.ts` : durées des scènes et des transitions en secondes, fonction `s()`, durée totale calculée.
- [x] 2.4 Compositions `PaiexPromo` (1920×1080) et `PaiexPromoVertical` (1080×1920) dans `Root.tsx`, avec `calculateMetadata`.
- [x] 2.5 Composant `SafeArea` de contrôle (cadre visible uniquement dans le Studio, désactivé au rendu).

### Phase 3 — Composants réutilisables

- [x] 3.1 `AnimatedTitle` : apparition mot par mot (montée de 30 px, flou de 8 px à 0, opacité), gestion des retours à la ligne.
- [x] 3.2 `Kicker` : étiquette en majuscules, framboise.
- [x] 3.3 `BrowserFrame` : fenêtre de navigateur (trois pastilles, URL), inclinaison 3D qui se redresse, zoom lent.
- [x] 3.4 `Cursor` : trajectoire en courbe, ralentissement, onde au clic.
- [x] 3.5 `FloatingCard` : carte d'interface fictive, apparition en cascade, badge « Publié » avec rebond.
- [x] 3.6 `Logo` : « PAIEX+ » avec le « + » framboise et la mention « par G2S ».
- [x] 3.7 `Background` : fond crème avec dégradé radial framboise très léger et grain discret.

### Phase 4 — Scènes

- [x] 4.1 S1 Accroche
- [x] 4.2 S2 Problème
- [x] 4.3 S3 Marque
- [x] 4.4 S4 Centraliser
- [x] 4.5 S5 Retrouver
- [x] 4.6 S6 Contextualiser
- [x] 4.7 S7 Confiance
- [x] 4.8 S8 Transmettre
- [x] 4.9 S9 Appel à l'action
- [x] 4.10 Transitions entre les scènes, calées sur le tempo de la musique.

Pour chaque scène : respecter les § 3.1 à 3.4, vérifier dans le Studio image par image les entrées et sorties, puis faire valider avant de passer à la suivante.

### Phase 5 — Son

- [ ] 5.1 Poser la musique, ses fondus, et caler la fin sur un temps fort.
- [ ] 5.2 Poser les bruitages (clics, transitions).
- [ ] 5.3 (Si voix off) Enregistrer, poser, régler le ducking, produire le `.srt`.
- [ ] 5.4 Mesurer le niveau sonore du rendu : -14 LUFS, -1 dBTP maximum. Corriger les volumes si besoin.

### Phase 6 — Déclinaisons

- [x] 6.1 Version 9:16 : réorganiser chaque scène (empilement vertical, captures recadrées), respecter les zones masquées.
- [ ] 6.2 (Si retenu) Version 1:1.
- [ ] 6.3 Image d'aperçu (poster) 1920×1080 en PNG avec `npx remotion still`.

### Phase 7 — Contrôle qualité

- [ ] 7.1 Relecture orthographique de tous les textes (accents, apostrophes typographiques ’, espaces insécables avant « ? ! : » et dans « « » »).
- [ ] 7.2 Contrôle de la charte : aucune couleur ni police en dehors du § 2.
- [ ] 7.3 Contrôle des durées de lecture (§ 3.1) en regardant la vidéo **sans le son**, une fois à vitesse normale.
- [ ] 7.4 Contrôle des zones de sécurité dans chaque format.
- [ ] 7.5 Contrôle des contrastes et des flashs (§ 3.4).
- [ ] 7.6 Lecture du fichier final sur au moins trois lecteurs : navigateur, VLC, téléphone.
- [ ] 7.7 Validation finale par G2S.

### Phase 8 — Livraison

- [ ] 8.1 Rendu final de chaque format (H.264, CRF 18, `yuv420p`, AAC 320 kbit/s) avec le nommage du § 3.6.
- [ ] 8.2 Livrer : vidéos, poster, `.srt` (si voix off), licences de la musique.
- [ ] 8.3 Étiqueter la version dans git (`v1.0.0`) et compléter `CHANGELOG.md`.

---

## 7. Définition de « terminé » pour une tâche

- Le rendu dans le Studio est conforme au découpage (§ 5) et aux conventions (§ 3 et § 4).
- `npm run lint` et `npx tsc --noEmit` passent.
- Aucun texte n'est écrit en dur dans une scène.
- La tâche est cochée ici et une entrée est ajoutée dans `CHANGELOG.md`.
