import { defineConfig, defineGlobalStyles } from "@pandacss/dev";
import { BreakPoints, Sizes, FontFamilies, FontWeights } from "@/lib/theme";

export default defineConfig({
  presets: ["@shadow-panda/preset"],
  preflight: true,
  jsxFramework: "react",
  include: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  exclude: ["./app/api/**/*.{js,jsx,ts,tsx}"],
  theme: {
    breakpoints: { ...BreakPoints },
    extend: {
      tokens: {
        fonts: {
          sans: { value: FontFamilies.sans },
          en: { value: FontFamilies.en },
          mono: { value: FontFamilies.mono },
        },
        fontWeights: {
          bold: { value: FontWeights.bold },
          medium: { value: FontWeights.medium },
          regular: { value: FontWeights.regular },
        },
        sizes: {
          s: {
            DEFAULT: { value: Sizes.s.DEFAULT },
            50: { value: Sizes.s["50"] },
            100: { value: Sizes.s["100"] },
            150: { value: Sizes.s["150"] },
            200: { value: Sizes.s["200"] },
            250: { value: Sizes.s["250"] },
            300: { value: Sizes.s["300"] },
          },
          m: {
            DEFAULT: { value: Sizes.m.DEFAULT },
            50: { value: Sizes.m["50"] },
            100: { value: Sizes.m["100"] },
            150: { value: Sizes.m["150"] },
            200: { value: Sizes.m["200"] },
            250: { value: Sizes.m["250"] },
            300: { value: Sizes.m["300"] },
          },
          l: {
            DEFAULT: { value: Sizes.l.DEFAULT },
            50: { value: Sizes.l["50"] },
            100: { value: Sizes.l["100"] },
            150: { value: Sizes.l["150"] },
            200: { value: Sizes.l["200"] },
            250: { value: Sizes.l["250"] },
            300: { value: Sizes.l["300"] },
          },
          100: { value: Sizes["100"] },
        },
        spacing: {
          s: {
            DEFAULT: { value: Sizes.s.DEFAULT },
            50: { value: Sizes.s["50"] },
            100: { value: Sizes.s["100"] },
            150: { value: Sizes.s["150"] },
            200: { value: Sizes.s["200"] },
            250: { value: Sizes.s["250"] },
            300: { value: Sizes.s["300"] },
          },
          m: {
            DEFAULT: { value: Sizes.m.DEFAULT },
            50: { value: Sizes.m["50"] },
            100: { value: Sizes.m["100"] },
            150: { value: Sizes.m["150"] },
            200: { value: Sizes.m["200"] },
            250: { value: Sizes.m["250"] },
            300: { value: Sizes.m["300"] },
          },
          l: {
            DEFAULT: { value: Sizes.l.DEFAULT },
            50: { value: Sizes.l["50"] },
            100: { value: Sizes.l["100"] },
            150: { value: Sizes.l["150"] },
            200: { value: Sizes.l["200"] },
            250: { value: Sizes.l["250"] },
            300: { value: Sizes.l["300"] },
          },
        },
      },
      semanticTokens: {
        colors: {
          background: {
            value: {
              base: "{colors.grayscale.50}",
              _dark: "{colors.grayscale.950}",
            },
          },
          info: {
            DEFAULT: {
              value: {
                base: "{colors.lime.500}",
                _dark: "{colors.lime.700}",
              },
            },
            foreground: {
              value: {
                base: "{colors.grayscale.50}",
                _dark: "{colors.lime.50}",
              },
            },
          },
          warning: {
            DEFAULT: {
              value: {
                base: "{colors.amber.500}",
                _dark: "{colors.amber.700}",
              },
            },
            foreground: {
              value: {
                base: "{colors.grayscale.50}",
                _dark: "{colors.amber.50}",
              },
            },
          },
        },
      },
    },
  },
  patterns: {
    extend: {
      container: {
        transform(props) {
          return {
            position: "relative",
            w: "full",
            maxW: "l.250",
            marginX: "auto",
            px: {
              base: "s.200",
              md: "m.50",
              lg: "m.100",
            },
            ...props,
          };
        },
      },
      box: {
        transform(props) {
          return {
            position: "relative",
            ...props,
          };
        },
      },
      row: {
        transform(props: any) {
          return {
            position: "relative",
            display: "flex",
            width: "100%",
            ...props,
          };
        },
      },
      column: {
        properties: {
          grow: { type: "number" },
          shrink: { type: "number" },
        },
        transform(props) {
          const { grow, shrink, ...rest } = props;
          return {
            position: "relative",
            flexGrow: grow || 0,
            flexShrink: shrink || 0,
            maxWidth: "100%",
            "& > *": {
              width: "100%",
              height: "100%",
            },
            ...rest,
          };
        },
      },
      background: {
        transform(props) {
          return {
            position: "absolute",
            zIndex: "0",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            "& > img": {
              width: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              verticalAlign: "middle",
            },
            ...props,
          };
        },
      },
    },
  },
  globalCss: defineGlobalStyles({
    "html, body": {
      "*": {
        fontFamily: "sans",
        letterSpacing: "0",
        lineHeight: 1.75,
        fontFeatureSettings: '"pkna"',
      },
      fontSize: {
        base: "14px",
        md: "16px",
      },
    },
    td: {
      whiteSpace: "nowrap",
    },
  }),
  staticCss: {
    recipes: {
      toast: [{ variant: ["*"] }],
      badge: [{ variant: ["*"] }],
      button: [{ variant: ["*"] }],
    },
  },
  outdir: "lib/style/system",
});
