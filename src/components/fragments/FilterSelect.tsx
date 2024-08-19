import type React from "react";
import { FaCaretDown } from "react-icons/fa6";
import { Select, SelectItem } from "@nextui-org/react";

import { FormField } from "@/components/ui/form";
import InputLabel from "@/components/fragments/InputLabel";
import type { FilterSelectProps } from "@/types/filterSection";

const FilterSelect: React.FC<FilterSelectProps> = ({
  field,
  label,
  options,
  icon,
  isDisabled,
}: FilterSelectProps) => (
  <FormField
    control={field.control}
    name={field.name}
    render={({ field }) => (
      <Select
        isDisabled={isDisabled}
        label={<InputLabel icon={icon} text={label} />}
        selectorIcon={<FaCaretDown />}
        placeholder={`Select a ${label.toLowerCase()}`}
        className="lg:max-w-xs block w-full"
        classNames={{
          popoverContent: "bg-charcoal-gray",
          trigger: "h-28 rounded-2xl px-5",
          value: "mt-4 text-white",
          selectorIcon: "mt-8 mr-2",
        }}
        onChange={field.onChange}
      >
        {options?.map((option) => (
          <SelectItem
            key={option.key || option.id}
            className="data-[hover=true]:bg-zinc-700 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-zinc-700 data-[selectable=true]:focus:text-default-foreground [focus-visible=true]:outline-offset-0"
            variant="solid"
          >
            {option.value || option.name}
          </SelectItem>
        ))}
      </Select>
    )}
  />
);

export default FilterSelect;
