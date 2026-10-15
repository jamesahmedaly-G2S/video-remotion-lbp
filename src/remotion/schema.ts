import { z } from "zod";

// Tous les textes, chiffres, URL et chemins de fichiers de la vidéo.
// Typographie française : apostrophe ’, espace insécable (U+00A0) avant « ? ! : »
// Retours à la ligne forcés possibles avec « \n » dans les titres.

const fiche = z.object({ code: z.string(), title: z.string() });
const stat = z.object({
  label: z.string(),
  value: z.string(),
  countTo: z.number().int().min(0), // 0 = pas de compteur, on affiche `value`
});
const layer = z.object({ tag: z.string(), label: z.string() });

export const PaiexPropsSchema = z.object({
  url: z.string(),
  hook: z.object({
    word: z.string(),
    fragments: z.array(z.string()).length(6),
    line: z.string(),
  }),
  problem: z.object({
    places: z.array(z.string()).length(3),
    question: z.string(),
  }),
  brand: z.object({
    kicker: z.string(),
    titleA: z.string(),
    titleB: z.string(),
    fiches: z.array(fiche).length(6),
  }),
  centralize: z.object({
    kicker: z.string(),
    title: z.string(),
    capture: z.string(),
    stats: z.array(stat).length(3),
  }),
  find: z.object({
    kicker: z.string(),
    title: z.string(),
    capture: z.string(),
    placeholder: z.string(),
    query: z.string(),
    resultCode: z.string(),
    resultTitle: z.string(),
    resultFamily: z.string(),
    resultMeta: z.string(),
    resultBadge: z.string(),
  }),
  contextualize: z.object({
    kicker: z.string(),
    title: z.string(),
    capture: z.string(),
    layers: z.array(layer).length(3),
    result: z.string(),
    resultBadge: z.string(),
  }),
  trust: z.object({
    kicker: z.string(),
    text: z.string(),
    steps: z.array(z.string()).length(4),
    badge: z.string(),
  }),
  transmit: z.object({
    lines: z.array(z.string()).length(3),
    columns: z.array(z.string()).length(3),
  }),
  cta: z.object({
    tagline: z.string(),
    button: z.string(),
    by: z.string(),
  }),
  audio: z.object({
    musicSrc: z.string(), // chemin dans public/, vide = pas de musique
    whooshSrc: z.string(), // vide = pas de bruitage de transition
    clickSrc: z.string(), // vide = pas de bruitage de clic
    musicVolume: z.number().min(0).max(1),
    sfxGainDb: z.number().min(-30).max(0), // -18 à -12 dB sous la musique
  }),
  showSafeArea: z.boolean(), // cadre de contrôle, visible dans le Studio seulement
});

export type PaiexProps = z.infer<typeof PaiexPropsSchema>;

export const defaultPaiexProps: PaiexProps = {
  url: "paiex.fr",
  hook: {
    word: "PAIE",
    fragments: [
      "Accord d’entreprise",
      "CCN 1486",
      "Usage maison",
      "Note de service",
      "Mail du 12/03",
      "Excel_v4_final.xlsx",
    ],
    line: "La connaissance paie est partout.",
  },
  problem: {
    places: [
      "Dans les outils.",
      "Dans les documents.",
      "Dans la tête des équipes.",
    ],
    question: "Qu’est-ce qui s’applique réellement chez nous ?",
  },
  brand: {
    kicker: "PAIEX+ · par G2S",
    titleA: "Votre paie a une histoire.",
    titleB: "Elle mérite une mémoire.",
    fiches: [
      { code: "01.02", title: "Contrat de travail" },
      { code: "02.03", title: "Congés payés" },
      { code: "02.05", title: "Heures supplémentaires" },
      { code: "03.01", title: "Cotisations sociales" },
      { code: "04.02", title: "Accord d’entreprise" },
      { code: "05.01", title: "Convention collective" },
    ],
  },
  centralize: {
    kicker: "01 / Centraliser",
    title: "La connaissance, au même endroit.",
    capture: "captures/vue-ensemble.jpg",
    stats: [
      { label: "Fiches", value: "248", countTo: 248 },
      { label: "CCN suivies", value: "3", countTo: 3 },
      { label: "Mise à jour", value: "Aujourd’hui", countTo: 0 },
    ],
  },
  find: {
    kicker: "02 / Bibliothèque",
    title: "Une réponse plus facile à retrouver.",
    capture: "captures/bibliotheque.jpg",
    placeholder: "Rechercher une fiche…",
    query: "congés payés ancienneté",
    resultCode: "02.03",
    resultTitle: "Congés payés",
    resultFamily: "La rémunération",
    resultMeta: "Ancienneté · jours supplémentaires",
    resultBadge: "Publié",
  },
  contextualize: {
    kicker: "03 / Règles applicables",
    title: "Du cadre général à votre réalité.",
    capture: "captures/regles-applicables.jpg",
    layers: [
      { tag: "Loi", label: "Code du travail" },
      { tag: "CCN", label: "Votre convention collective" },
      { tag: "Entreprise", label: "Votre accord d’entreprise" },
    ],
    result: "Ce qui s’applique chez vous",
    resultBadge: "Applicable",
  },
  trust: {
    kicker: "04 / Toujours à jour",
    text: "Chaque évolution est vérifiée par un expert avant d’arriver chez vous.",
    steps: [
      "Veille réglementaire",
      "Proposition de mise à jour",
      "Relecture par un expert G2S",
      "Nouvelle version publiée",
    ],
    badge: "Publié",
  },
  transmit: {
    lines: [
      "Le savoir de vos équipes.",
      "Les règles de votre entreprise.",
      "Un même référentiel.",
    ],
    columns: ["Centraliser", "Contextualiser", "Transmettre"],
  },
  cta: {
    tagline: "Moins de recherches. Plus de repères.",
    button: "Demander une démonstration",
    by: "par G2S",
  },
  audio: {
    musicSrc: "",
    whooshSrc: "",
    clickSrc: "",
    musicVolume: 0.8,
    sfxGainDb: -15,
  },
  showSafeArea: false,
};
