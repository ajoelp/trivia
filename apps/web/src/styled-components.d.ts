import { TriviaTheme } from "./theme/ThemeManager";

declare module "styled-components" {
  export interface DefaultTheme extends TriviaTheme {}
}
