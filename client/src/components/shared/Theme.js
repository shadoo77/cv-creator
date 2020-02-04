import { createMuiTheme } from "@material-ui/core/styles";

const MainTheme = createMuiTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "#8561c5",
      main: "#673ab7",
      dark: "#482880",
      contrastText: "#fff"
    },
    secondary: {
      light: "#5393ff",
      main: "#2979ff",
      dark: "#1c54b2",
      contrastText: "#fff"
    },
    error: {
      light: "rgba(248, 181, 182, 1)",
      main: "rgba(252, 0, 4, 1)",
      dark: "rgba(145, 0, 0, 1)",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
      shadi: "#ff0"
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

export { MainTheme };
