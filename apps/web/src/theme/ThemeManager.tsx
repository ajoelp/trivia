import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeColors } from "./colors";
import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { ThemeSizing } from "./sizing";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 14px;
    line-height: 1.5;
    padding: 0;
    background-color: ${({ theme }) => theme.colors.background};
  }

  * {
    box-sizing: border-box;
  }
`;

interface ThemeManagerProps {
  children: ReactNode;
}

export interface TriviaTheme {
  colors: typeof ThemeColors;
  sizing: typeof ThemeSizing;
}

export function ThemeManager({ children }: ThemeManagerProps) {
  const theme: TriviaTheme = { colors: ThemeColors, sizing: ThemeSizing };
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
