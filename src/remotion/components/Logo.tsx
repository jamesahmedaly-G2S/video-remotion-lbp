import { colors, fonts, type } from "../theme";

type Props = {
  readonly fontSize: number;
  /** Mention « par G2S » sous le logo (vide = masquée). */
  readonly by?: string;
  readonly style?: React.CSSProperties;
};

/** Logo texte « PAIEX+ » : encre, avec le « + » en framboise. */
export const Logo: React.FC<Props> = ({ fontSize, by, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.sans,
        fontWeight: 700,
        fontSize,
        lineHeight: 1,
        letterSpacing: type.titleLetterSpacing,
        color: colors.encre,
        whiteSpace: "nowrap",
      }}
    >
      PAIEX
      <span
        style={{
          color: colors.framboise,
          fontSize: fontSize * 0.62,
          verticalAlign: "0.48em",
          marginLeft: fontSize * 0.03,
        }}
      >
        +
      </span>
    </div>
    {by ? (
      <div
        style={{
          marginTop: fontSize * 0.14,
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: Math.max(26, fontSize * 0.13),
          letterSpacing: type.kickerLetterSpacing,
          textTransform: "uppercase",
          color: colors.carbone,
        }}
      >
        {by}
      </div>
    ) : null}
  </div>
);
