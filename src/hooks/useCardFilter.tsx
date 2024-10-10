import type {
  DataState,
  HandleValueChange,
  SelectedType,
} from "@/components/filter-section/types";
import { replaceCommaWithEncodedPipe } from "@/lib/utils";
import { FormEvent, useCallback, useState } from "react";
import { useGenreMovies, useGenreSeries } from "../features/genres/fetchGenres";

export const useCardFilter = () => {
  const { data: genreListMovies } = useGenreMovies();
  const { data: genreListSeries } = useGenreSeries();
  const [selectedType, setSelectedType] = useState<SelectedType>("all");
  const [dataState, setDataState] = useState<DataState>({
    type: "",
    genre: "",
    fromRate: "",
    toRate: "",
    sortBy: "",
    moreFilters: [],
  });

  const listRate = Array.from({ length: 10 }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));

  const moreFilters =
    selectedType === "tvseries"
      ? [
          { label: "Include Adult", value: "include_adult" },
          {
            label: "Include First Air Dates",
            value: "include_null_first_air_dates",
          },
        ]
      : [
          { label: "Include Adult", value: "include_adult" },
          { label: "Include Video", value: "include_video" },
        ];

  const sortOptions = [
    { label: "Popularity (Lowest to Highest)", value: "popularity.asc" },
    { label: "Popularity (Highest to Lowest)", value: "popularity.desc" },
    { label: "Rating (Lowest to Highest)", value: "vote_average.asc" },
    { label: "Rating (Highest to Lowest)", value: "vote_average.desc" },
    { label: "Release Date (Earliest to Latest)", value: "release_date.asc" },
    { label: "Release Date (Latest to Earliest)", value: "release_date.desc" },
    { label: "Title (A to Z)", value: "original_title.asc" },
    { label: "Title (Z to A)", value: "original_title.desc" },
  ];

  const handleValueChange: HandleValueChange = (value, type) => {
    const finalValue =
      typeof value === "object" && "target" in value
        ? value.target.value
        : value;

    setDataState((prevState) => ({
      ...prevState,
      [type]: finalValue,
    }));
  };

  const generateUrl = useCallback(() => {
    const includeAdult = dataState?.moreFilters?.includes("include_adult");
    const includeVideo = dataState?.moreFilters?.includes("include_video");
    const includeNullFirstAirDates = dataState?.moreFilters?.includes(
      "include_null_first_air_dates"
    );

    const filters = {
      include_adult: includeAdult,
      include_video: includeVideo,
      include_null_first_air_dates: includeNullFirstAirDates,
    };

    const genres = replaceCommaWithEncodedPipe(dataState.genre);

    const { sortBy, fromRate, toRate } = dataState;
    const params = new URLSearchParams({
      page: "1",
      ...(filters.include_adult && { include_adult: "true" }),
      ...(filters.include_video && { include_video: "true" }),
      ...(filters.include_null_first_air_dates && {
        include_null_first_air_dates: "true",
      }),
      ...(sortBy && { sort_by: sortBy }),
      ...(fromRate && { "vote_average.gte": fromRate }),
      ...(toRate && { "vote_average.lte": toRate }),
      ...(genres && { with_genres: genres }),
    });

    return selectedType === "tvseries"
      ? `/discover/tv?${params.toString()}`
      : `/discover/movie?${params.toString()}`;
  }, [dataState, selectedType]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateUrl();
  };

  return {
    genreListMovies,
    genreListSeries,
    selectedType,
    setSelectedType,
    dataState,
    listRate,
    moreFilters,
    sortOptions,
    handleValueChange,
    generateUrl,
    onSubmit,
  };
};
