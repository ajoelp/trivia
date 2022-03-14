type ClassTypes = string | false | null | undefined;

export function classNames(...classes: ClassTypes[]) {
  return classes.filter(Boolean).join(" ");
}
