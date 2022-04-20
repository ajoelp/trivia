import { FormControl, FormControlProps } from "./FormControl";
import { Control, FieldValues, useController, Path, FieldPath } from "react-hook-form";
import { FieldPathValue, UnpackNestedValue } from "react-hook-form/dist/types";
import { classNames } from "../services/utils";

type InputProps = JSX.IntrinsicElements["select"];

type SelectInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
  className?: string;
  children: InputProps["children"];
} & Omit<FormControlProps, "children" | "error">;

export default function SelectInput<TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  control,
  defaultValue,
  className,
  ...rest
}: SelectInputProps<TFieldValues>) {
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
      <select
        className={classNames("bg-zinc-900 h-10 rounded border-zinc-800")}
        {...{ name, onChange, value, id: name, ...rest }}
      />
    </FormControl>
  );
}
