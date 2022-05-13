import { HTMLMotionProps, motion } from "framer-motion";
import { classNames } from "../services/utils";

type BaseButton = HTMLMotionProps<"button">;
type BaseLink = HTMLMotionProps<"a">;

const ButtonClasses = {
  primary: "bg-primary-500 hover:bg-primary-600 hover:shadow text-white",
  secondary: "bg-secondary-500 hover:bg-secondary-600 hover:shadow text-white",
  "big-ol-button":
    "bg-white rounded-full text-zinc-900 hover:bg-secondary-500 hover:text-white px-8 py-8 font-extrabold uppercase",
};

const ButtonSizes = {
  md: "px-4 py-1 min-w-[150px] h-10",
  sm: "py-1 px-3",
};

type Variants = keyof typeof ButtonClasses;
type Sizes = keyof typeof ButtonSizes;

const buttonStyles = (variant: Variants, size: Sizes, className?: string) =>
  classNames(
    "rounded text-center inline-flex items-center justify-center",
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

  return <motion.button {...rest} className={classes} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />;
}

interface LinkProps extends BaseLink {
  variant?: Variants;
  size?: Sizes;
}

export function Link({ variant = "primary", size = "md", className, ...rest }: LinkProps) {
  const classes = buttonStyles(variant, size, className);
  return <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} {...rest} className={classes} />;
}
