import { Control, FieldPath, FieldValues, Path, useController } from "react-hook-form";
import { FieldPathValue, UnpackNestedValue } from "react-hook-form/dist/types";
import { FormControl, FormControlProps } from "./FormControl";
import { Box, FormLabel, Switch } from "@chakra-ui/react";

type ToggleProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
  className?: string;
} & Omit<FormControlProps, "children" | "error">;

export default function Toggle<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  control,
  defaultValue,
  className,
  ...rest
}: ToggleProps<TFieldValues>) {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController<TFieldValues>({
    name,
    control,
    defaultValue,
  });

  return (
    <FormControl error={errors?.[name]?.message} className={className}>
      <Box display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          {label}
        </FormLabel>
        <Switch onChange={onChange} isChecked={value} />
      </Box>
    </FormControl>
  );
}
