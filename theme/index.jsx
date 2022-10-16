import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    primary: {
      transparent: "#52D6FF80",
      lighter: "#B2F5EA",
      light: "#81E6D9",
      main: "#319795",
      dark: "#2C7A7B",
      darker: "#234E52",
    },
    secondary: {
      lighter: "#FEFFE3",
      light: "#ecc889",
      main: "#FF8A50",
      dark: "#ee9702",
      darker: "",
    },
    yellow_light: "#FEFFE3",
    green_main: "#1B8838",
    light: "#FFFFFF",
    dark: "#000000",
    warning: "#ffaa00",
    error: "#e50e0e",
    link: "#017fed",
  },

  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, Georgia, serif",
    mono: "Inter, Menlo, monospace",
    coorder: "Cabin, PoppinsVN",
  },
  breakpoints: {
    xs: "50px",
    sm: "375px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
    "2xl": "2560px",
  },
});

export default theme;
