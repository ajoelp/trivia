import { classNames } from "../services/utils";

type BaseButton = JSX.IntrinsicElements["button"];
type BaseLink = JSX.IntrinsicElements["a"];

const ButtonClasses = {
  primary: "bg-zinc-600 hover:bg-zinc-700 hover:shadow text-white",
};

type Variants = keyof typeof ButtonClasses;

const buttonStyles = (variant: Variants, className?: string) =>
  classNames(
    "px-4 py-1 rounded h-10 text-center min-w-[150px] inline-flex items-center justify-center",
    ButtonClasses[variant],
    className,
  );

interface ButtonProps extends BaseButton {
  variant?: Variants;
  loading?: boolean;
}

export function Button({ variant = "primary", loading, className, ...rest }: ButtonProps) {
  const classes = buttonStyles(variant, className);

  if (loading) {
    rest.children = "Loading";
  }

  return <button {...rest} className={classes} />;
}

interface LinkProps extends BaseLink {
  variant?: Variants;
}

export function Link({ variant = "primary", className, ...rest }: LinkProps) {
  const classes = buttonStyles(variant, className);
  return <a {...rest} className={classes} />;
}
