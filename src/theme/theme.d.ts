import { PaletteColor } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    stone?: PaletteColor;
  }
  interface PaletteOptions {
    stone?: PaletteColorOptions;
  }
}

interface PaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
