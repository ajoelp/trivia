import { classNames } from "../services/utils";

type BaseButton = JSX.IntrinsicElements["button"];
type BaseLink = JSX.IntrinsicElements["a"];

const ButtonClasses = {
  primary: "bg-zinc-600 hover:bg-zinc-700 hover:shadow text-white",
  color: "bg-orange-500 hover:bg-orange-600 hover:shadow text-white",
};

const ButtonSizes = {
  md: "px-4 py-1  min-w-[150px] h-10",
  sm: "py-1 px-3",
};

type Variants = keyof typeof ButtonClasses;
type Sizes = keyof typeof ButtonSizes;

const buttonStyles = (variant: Variants, size: Sizes, className?: string) =>
  classNames(
    "rounded  text-center inline-flex items-center justify-center",
    ButtonSizes[size],
    ButtonClasses[variant],
    className,
  );

interface ButtonProps extends BaseButton {
  variant?: Variants;
  loading?: boolean;
  size?: Sizes;
}

export function Button({ variant = "primary", size = "md", loading, className, ...rest }: ButtonProps) {
  const classes = buttonStyles(variant, size, className);

  if (loading) {
    rest.children = "Loading";
  }

  return <button {...rest} className={classes} />;
}

interface LinkProps extends BaseLink {
  variant?: Variants;
  size?: Sizes;
}

export function Link({ variant = "primary", size = "md", className, ...rest }: LinkProps) {
  const classes = buttonStyles(variant, size, className);
  return <a {...rest} className={classes} />;
}
