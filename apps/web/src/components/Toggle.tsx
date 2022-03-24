import { Switch } from "@headlessui/react";
import { Control, FieldPath, FieldValues, Path, useController } from "react-hook-form";
import { FieldPathValue, UnpackNestedValue } from "react-hook-form/dist/types";
import { FormControl, FormControlProps } from "./FormControl";
import { classNames } from "../services/utils";

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
      <Switch.Group as="div" className="flex items-center">
        <Switch
          {...rest}
          checked={value}
          onChange={onChange}
          className={classNames(
            value ? "bg-orange-600" : "bg-zinc-600",
            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500",
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              value ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
            )}
          />
        </Switch>
        <Switch.Label as="span" className="ml-3">
          <span className="text-sm font-medium text-gray-400">{label}</span>
        </Switch.Label>
      </Switch.Group>
    </FormControl>
  );
}
