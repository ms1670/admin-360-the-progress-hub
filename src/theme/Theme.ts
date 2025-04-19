import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    hovers: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    hovers?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffc022", // Primary color
    },
    secondary: {
      main: "#005500", // Secondary color
    },
    tertiary: {
      main: "#fde9b6", // Tertiary color
    },
    hovers: {
//main: "#e4bfa7", // New hover color
      main: "#d1e7dd", // New hover color
      
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
