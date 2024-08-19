import { Search } from "lucide-react";
import { Input, Spinner } from "@nextui-org/react";

import { SearchInputProps } from "@/types/filterSection";

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  setQuery,
  isLoadingSearch,
}: SearchInputProps) => (
  <Input
    label={
      <div className="flex gap-2 items-center">
        <Search color="gray" />
        <span className="text-xl text-neutral-500">Search...</span>
      </div>
    }
    value={query}
    onValueChange={setQuery}
    radius="lg"
    classNames={{
      base: "w-full lg:w-2/3",
      label: "text-black/50 dark:text-white/90 mb-4",
      input: [
        "bg-charcoal-gray rounded-lg p-2.5 mb-2",
        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
      ],
      inputWrapper: ["shadow-xl", "h-28 flex flex-col px-6"],
    }}
    placeholder="Search for movie titles or TV series"
    endContent={
      isLoadingSearch && (
        <Spinner size="sm" className="absolute bottom-7 right-10" />
      )
    }
  />
);

export default SearchInput;
