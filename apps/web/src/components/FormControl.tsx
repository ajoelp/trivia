import { ReactNode } from "react";
import { FormControl as ChakraFormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";

export interface FormControlProps {
  label?: string;
  name?: string;
  children: ReactNode;
  error?: string;
  className?: string;
}

export function FormControl({ label, name, error, children, className }: FormControlProps) {
  return (
    <ChakraFormControl>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </ChakraFormControl>
  );
}
