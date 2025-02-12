import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
import mapValues from "lodash/mapValues"

/**
 *
 * @param theme
 * @returns {function(*, *?): *}
 */
const themePicker = theme => (input, key) => {
  const nested = !("dark" in input) && !("light" in input)
  if (nested) {
    return mapValues(input, themePicker(theme))
  }
  const value = input[theme]
  if (!value) {
    throw Error(`Color [${key}] is missing the value ${theme}`)
  }
  return value
}

const injectTheme = (obj, theme) => {
  const pick = themePicker(theme)
  return mapValues(obj, pick)
}

const baseColors = {
  text: {
    100: {
      dark: "#ECEFF4",
      light: "#2E3440",
    },
    300: {
      dark: "#E5E9F0",
      light: "#3B4252",
    },
    500: {
      dark: "#D8DEE9",
      light: "#434C5E",
    },
  },
  bg: {
    100: {
      light: "#D8DEE9",
      dark: "#2E3440",
    },
    300: {
      light: "#E5E9F0",
      dark: "#3B4252",
    },
    500: {
      light: "#ECEFF4",
      dark: "#434C5E",
    },
  },
  bgPrimary: {
    light: "#D8DEE9",
    dark: "#2e3440",
  },
  bgSecondary: {
    light: "#E5E9F0",
    dark: "#181b2b",
  },
  bgTertiary: {
    light: "#ECEFF4",
    dark: "#434C5E",
  },
  bgBrand: {
    light: "#f5e5ec",
    dark: "#5E81AC",
  },
  borderSubtle: {
    dark: "#ffffff",
    light: "#e8e8e8",
  },
  borderSubtlePrimary: {
    light: "#dadbde",
    dark: "#ffffff",
  },
  brand: {
    100: {
      light: "#5E81AC",
      dark: "#5E81AC",
    },
  },
  brandSecondary: {
    dark: "#81a1c1",
    light: "#81A1C1",
  },
}

export const colors = {
  ...baseColors,
  discord: {
    light: "#36393f",
    dark: "awd",
  },
  brandLight: {
    light: "hsl(333deg, 100%, 55%)",
    dark: "hsl(333deg, 100%, 55%)",
  },
  bgPostHeader: {
    light: baseColors.bgPrimary.light,
    dark: baseColors.bgSecondary.dark,
  },
  // specific colors
  bgPopupShadow: {
    dark: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px,rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.4) 70% 20px, rgba(0, 0, 0, 0.7))`,
    light: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0px,rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.2) 70% 20px, rgba(0, 0, 0, 0.3))`,
  },
  discordBackground: {
    dark: baseColors.bgSecondary.dark,
    light: "#f9f9f9",
  },
  discordTextColor: { light: "#2e3338", dark: "#dcddde" },
  highlight: {
    light: "yellow",
    dark: baseColors.brand[100].dark,
  },
}

const fontFamily =
  "'Wotfard',-apple-system,'Segoe UI','Roboto','Ubuntu','Cantarell','Noto Sans',sans-serif,'BlinkMacSystemFont','Helvetica Neue','Arial','Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"

function makeLayer(name, variants) {
  return {
    [name]: variants[1],
    _light: {
      [name]: variants[0],
    },
  }
}

export const transition = "all 0.4s ease-in-out"

export function createTheme(theme) {
  const pick = themePicker(theme)
  return extendTheme({
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    fonts: {
      heading: fontFamily,
      body: fontFamily,
    },
    fontSizes: {
      xs: "13px",
      sm: "14px",
      md: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
      "3xl": "38px",
      "4xl": "48px",
      "5xl": "56px",
    },
    styles: {
      global: {
        ul: {
          "list-style-position": "inside",
        },
        code: {
          display: "inline-flex",
          fontWeight: "bold",
          fontSize: "0.85em",
          background: pick({
            light: colors.bg[300].light,
            dark: "#2b141d",
          }),
          transition,
          padding: "0 6px",
          color: pick({
            light: colors.brand[100].light,
            dark: colors.brand[100].dark,
          }),
          borderRadius: "5px",
        },
        ".highlight-line": {
          background: pick({
            light: colors.bgSecondary.light,
            dark: colors.bgSecondary.dark,
          }),
        },
        ".blog-post :is(h1, h2, h3, h4, h5, h6) > a": {
          // resetting the link colors of article headings
          color: "inherit",
        },
        a: {
          wordBreak: "break-word",
        },
        ".widebanner > p": {
          marginBottom: 0,
        },
        ".token-line": {
          paddingInlineStart: 3,
          paddingInlineEnd: 3,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        },
        "pre, kbd, samp": {
          fontFamily: `'Jetbrains Mono', ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace`,
        },
        body: {
          lineBreak: "auto",
          transition,
          color: pick(colors.text[300]),
          background: pick({
            light: colors.bg[100].light,
            dark: colors.bg[100].dark,
          }),
        },
      },
    },
    components: {
      Link: {
        baseStyle: {
          color: pick({
            light: colors.brandSecondary.light,
            dark: colors.brandSecondary.dark,
          }),
        },
      },
      // Heading: {
      //   baseStyle: props => ({
      //     color: "text.100",
      //   }),
      // },
      Text: {
        baseStyle: {
          lineHeight: "1.7",
        },
      },
    },
    // colors
    colors: injectTheme(colors, theme),
  })
}
