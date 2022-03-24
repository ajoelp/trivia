import { FormControl, FormControlProps } from "./FormControl";
import { Control, FieldValues, useController, Path, FieldPath } from "react-hook-form";
import { FieldPathValue, UnpackNestedValue } from "react-hook-form/dist/types";
import { classNames } from "../services/utils";

type InputProps = JSX.IntrinsicElements["input"];

type TextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label: string;
  name: Path<TFieldValues>;
  type?: InputProps["type"];
  control: Control<TFieldValues>;
  defaultValue: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
  className?: string;
} & Omit<FormControlProps, "children" | "error">;

export default function TextInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  type = "text",
  control,
  defaultValue,
  className,
  ...rest
}: TextInputProps<TFieldValues>) {
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
      <input
        className={classNames("bg-zinc-900 h-10 rounded border-zinc-800")}
        {...{ name, placeholder: label, type, onChange, value, ...rest }}
      />
    </FormControl>
  );
}
