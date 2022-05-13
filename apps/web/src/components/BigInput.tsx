import { Control, FieldPath, FieldValues, Path, useController } from "react-hook-form";
import { FieldPathValue, UnpackNestedValue } from "react-hook-form/dist/types";
import { FormControl, FormControlProps } from "./FormControl";

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

export function BigInput<TFieldValues extends FieldValues = FieldValues>({
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
    <FormControl error={errors?.[name]?.message} className={className} label={label} name={name}>
      <input
        className="bg-transparent border-b-[4px] border-b-white leading-[3] text-4xl font-bold"
        {...{ name, type, onChange, value, id: name, ...rest }}
      />
    </FormControl>
  );
}
