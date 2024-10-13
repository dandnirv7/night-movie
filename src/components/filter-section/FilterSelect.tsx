import { Select, SelectItem } from "@nextui-org/react";
import type { FilterSelectProps } from "./types";

const FilterSelect: React.FC<FilterSelectProps> = ({
  placeholder,
  value,
  onChange,
  options,
  multiple = false,
  isRate = false,
}) => (
  <Select
    placeholder={placeholder}
    selectionMode={multiple ? "multiple" : "single"}
    className="dark lg:max-w-[9.5rem]"
    radius="sm"
    size="lg"
    classNames={{
      popoverContent: `dark rounded-md max-w-full min-w-max ${isRate ? "lg:w-20" : ""}`,
      trigger: `bg-charcoal-gray py-8  ${isRate ? "min-w-11" : ""}`,
      mainWrapper: `${isRate ? "md:w-full lg:w-24" : ""}`,
    }}
    value={value}
    onChange={(value) => onChange(value)}
    aria-label={placeholder}
  >
    {options.map((option) => (
      <SelectItem key={option.value} value={option.value}>
        {option.label}
      </SelectItem>
    ))}
  </Select>
);

export default FilterSelect;
