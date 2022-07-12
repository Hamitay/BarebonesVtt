import "styled-components";

interface IPalette {
  main: string;
  contrastText: string;
}

interface Border {
  color: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    palette: {
      primary: IPalette;
      secondary: IPalette;
      tertiary: IPalette;
      border: Border;
    };
  }
}
