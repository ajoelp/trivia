import { TriviaTheme } from "./ThemeManager";
import get from "lodash/get";

type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? `${F}${D}${Join<Extract<R, string[]>, D>}`
    : never
  : string;

interface ThemeArgs {
  theme: TriviaTheme;
}

export function getColor(color: Join<PathsToStringProps<TriviaTheme["colors"]>, ".">) {
  return ({ theme }: ThemeArgs) => get(theme.colors, color);
}

export function getSizing(size: Join<PathsToStringProps<TriviaTheme["sizing"]>, ".">) {
  return ({ theme }: ThemeArgs) => {
    return get(theme.sizing, size);
  };
}
