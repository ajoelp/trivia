import { ReactNode } from "react";
import { classNames } from "../services/utils";
import { AnimatePresence, motion } from "framer-motion";

export interface FormControlProps {
  label?: string;
  name?: string;
  children: ReactNode;
  error?: string;
  className?: string;
}

export function FormControl({ label, name, error, children, className }: FormControlProps) {
  return (
    <div className={classNames("flex flex-col gap-2 relative", className)}>
      {label && <label htmlFor={name}>{label}</label>}
      {children}
      {error && (
        <AnimatePresence>
          <motion.p
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-red-500 text-xs"
          >
            {error}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
}
