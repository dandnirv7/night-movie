import type React from "react";
import { Film } from "lucide-react";
import { FaCaretDown } from "react-icons/fa6";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";

import { FormField } from "@/components/ui/form";
import InputLabel from "@/components/fragments/InputLabel";
import type { GenreSelectProps } from "@/types/filterSection";

const GenreSelect: React.FC<GenreSelectProps> = ({
  field,
  selectedGenres,
  handleGenreChange,
  genreMovies,
  genreSeries,
  isDisabled,
}: GenreSelectProps) => {
  const headingClasses =
    "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-zinc-800 shadow-small rounded-small";

  return (
    <FormField
      control={field.control}
      name="genre"
      render={({ field }) => (
        <Select
          isDisabled={isDisabled}
          label={
            <InputLabel
              icon={<Film color="gray" strokeWidth="1" />}
              text="Genre"
            />
          }
          selectorIcon={<FaCaretDown />}
          placeholder="Select a genre"
          selectionMode="multiple"
          className="lg:max-w-xs block w-full"
          classNames={{
            popoverContent: "bg-charcoal-gray",
            trigger: "h-28 rounded-2xl px-5",
            value: "mt-4 text-white",
            selectorIcon: "mt-8 mr-2",
          }}
          scrollShadowProps={{
            isEnabled: false,
          }}
          onSelectionChange={field.onChange}
          onChange={handleGenreChange}
          items={selectedGenres}
          renderValue={() => (
            <p className="text-md">
              {Array.from(selectedGenres).length} Selected
            </p>
          )}
        >
          <SelectSection
            title={"Movies"}
            classNames={{ heading: headingClasses }}
          >
            {(genreMovies ?? [])?.map((genre) => (
              <SelectItem
                key={genre.id}
                className="data-[hover=true]:bg-zinc-700 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-zinc-700 data-[selectable=true]:focus:text-default-foreground [focus-visible=true]:outline-offset-0"
                variant="solid"
              >
                {genre.name}
              </SelectItem>
            ))}
          </SelectSection>
          <SelectSection
            title={"Series"}
            classNames={{ heading: headingClasses }}
          >
            {(genreSeries ?? [])?.map((genre) => (
              <SelectItem
                key={genre.id}
                className="data-[hover=true]:bg-zinc-700 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-zinc-700 data-[selectable=true]:focus:text-default-foreground [focus-visible=true]:outline-offset-0"
                variant="solid"
              >
                {genre.name}
              </SelectItem>
            ))}
          </SelectSection>
        </Select>
      )}
    />
  );
};

export default GenreSelect;
