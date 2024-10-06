import { useCardFilter } from "@/hooks/useCardFilter";
import type { Genre } from "@/types/filterSection";
import { Button } from "@nextui-org/react";
import FilterSelect from "./FilterSelect";
import MovieTypeSelector from "./MovieTypeSelector";

const CardFilter = () => {
  const {
    onSubmit,
    generateUrl,
    selectedType,
    setSelectedType,
    dataState,
    handleValueChange,
    genreListMovies,
    genreListSeries,
    listRate,
    sortOptions,
    moreFilters,
  } = useCardFilter();

  return (
    <main className="w-full p-6 bg-gunmetal rounded-2xl">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 lg:flex lg:flex-row md:gap-8 lg:gap-5 lg:justify-center lg:items-center"
      >
        <MovieTypeSelector
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <FilterSelect
          placeholder="Genre"
          value={dataState.genre}
          onChange={(
            value: string | string[] | React.ChangeEvent<HTMLSelectElement>
          ) => handleValueChange(value, "genre")}
          options={(selectedType === "tvseries"
            ? genreListSeries ?? []
            : genreListMovies ?? []
          ).map((genre: Genre) => ({
            label: genre.name,
            value: genre.id.toString(),
          }))}
          multiple
        />

        <section className="flex justify-center gap-2 lg:flex-row lg:gap-3 md:gap-5 lg:items-center">
          <h1 className="hidden font-semibold lg:block">Rate</h1>
          <FilterSelect
            placeholder="From:"
            value={dataState.fromRate}
            onChange={(
              value: string | string[] | React.ChangeEvent<HTMLSelectElement>
            ) => handleValueChange(value, "fromRate")}
            options={listRate}
            isRate
          />
          <FilterSelect
            placeholder="To:"
            value={dataState.toRate}
            onChange={(
              value: string | string[] | React.ChangeEvent<HTMLSelectElement>
            ) => handleValueChange(value, "toRate")}
            options={listRate}
            isRate
          />
        </section>

        <FilterSelect
          placeholder="Sort By"
          value={dataState.sortBy}
          onChange={(
            value: string | string[] | React.ChangeEvent<HTMLSelectElement>
          ) => handleValueChange(value, "sortBy")}
          options={sortOptions}
        />

        <FilterSelect
          placeholder="More Filters"
          value={dataState.moreFilters}
          onChange={(
            value: string | string[] | React.ChangeEvent<HTMLSelectElement>
          ) => handleValueChange(value, "moreFilters")}
          options={moreFilters}
          multiple
        />

        <Button
          type="submit"
          radius="sm"
          className="w-full p-8 text-lg text-white bg-purple-gem hover:bg-purple-gem/90"
        >
          <a href={generateUrl()} className="w-full">
            Search
          </a>
        </Button>
      </form>
    </main>
  );
};

export default CardFilter;
