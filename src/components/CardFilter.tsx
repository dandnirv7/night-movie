import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";
import { useCardFilter } from "@/hooks/useCardFilter";
import SuggestionCard from "./SuggestionCard";

import SearchInput from "./fragments/SearchInput";
import FilterSelect from "./fragments/FilterSelect";
import GenreSelect from "./fragments/GenreSelect";

const CardFilter = () => {
  const {
    control,
    handleSubmit,
    selectedGenres,
    query,
    setQuery,
    years,
    regions,
    genreMovies,
    genreSeries,
    handleGenreChange,
    isLoadingSearch,
    searchMovies,
  } = useCardFilter();

  return (
    <main className="relative">
      <form
        onSubmit={handleSubmit}
        className="w-full mt-10 px-10 flex lg:flex-row lg:gap-2 justify-center lg:items-center dark flex-col items-start gap-4"
      >
        <SearchInput
          query={query}
          setQuery={setQuery}
          isLoadingSearch={isLoadingSearch}
        />
        <div className="flex flex-row gap-4 lg:gap-2 items-center w-full flex-wrap md:flex-nowrap">
          <FilterSelect
            field={{ control, name: "year" }}
            label="Year"
            options={years?.map((year) => ({ key: year, value: year })) ?? []}
            icon={<Calendar color="gray" />}
            isDisabled={!searchMovies}
          />
          <FilterSelect
            field={{ control, name: "region" }}
            label="Country"
            options={
              regions?.map((region) => ({
                key: region.iso_3166_1,
                value: region.english_name,
              })) ?? []
            }
            icon={<MapPin color="gray" />}
            isDisabled={!searchMovies}
          />
          <GenreSelect
            field={{ control, name: "genre" }}
            selectedGenres={selectedGenres}
            handleGenreChange={handleGenreChange}
            genreMovies={genreMovies ?? []}
            genreSeries={genreSeries ?? []}
            isDisabled={!searchMovies}
          />
          <Button
            type="submit"
            className="w-full h-28 bg-orange-400 rounded-2xl text-lg hover:bg-orange-400/90"
            disabled={isLoadingSearch || !searchMovies}
          >
            Search
          </Button>
        </div>
      </form>
      <SuggestionCard movies={searchMovies} query={query} />
    </main>
  );
};

export default CardFilter;
