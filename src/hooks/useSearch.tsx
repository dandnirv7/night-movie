import {
  useMultiSearch,
  useSearchResults,
} from "@/features/search/fetchMultiSearch";
import {
  MediaTypeKey,
  MovieSearchResults,
  PersonSearchResults,
  SearchData,
  SeriesSearchResults,
} from "@/features/search/types";
import { useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useParams } from "react-router-dom";

export const useSearch = (searchQuery?: string) => {
  const { searchMovie } = useParams();
  const [query, setQuery] = useState<string>(searchMovie || "");
  const debouncedQuery = useDebounce(query, 1000);

  const { data: multiSearchData, isLoading: isLoadingMultiSearch } =
    useMultiSearch(debouncedQuery);
  const { data: searchResults, isLoading: isLoadingSearchResults } =
    useSearchResults(searchQuery);

  const isLoadingSearch = isLoadingMultiSearch || isLoadingSearchResults;

  const suggestions =
    multiSearchData?.map((item) => ({
      id: item.id,
      poster_path: item.poster_path,
      media_type: item.media_type,
      vote_average: item.vote_average,
      title: item.title || undefined,
      release_date: item.release_date || undefined,
      name: item.name || undefined,
      first_air_date: item.first_air_date || undefined,
      original_name: item.original_name || undefined,
      profile_path: item.profile_path || undefined,
    })) || [];

  const mediaTypeMap: Record<MediaTypeKey, string> = {
    movie: "movies",
    tv: "series",
    person: "cast",
  };

  const getMediaType = (type: MediaTypeKey): string =>
    mediaTypeMap[type] || "unknown";

  const isMediaTypeKey = (type: string): type is MediaTypeKey => {
    return type === "movie" || type === "tv" || type === "person";
  };

  const filterSearchResults = (
    results: (MovieSearchResults | SeriesSearchResults | PersonSearchResults)[]
  ): SearchData[] => {
    return results.filter((result) => {
      return (
        result.media_type !== "person" &&
        result.poster_path !== null &&
        typeof result.vote_average === "number"
      );
    }) as SearchData[];
  };

  const sortedResults = useMemo(() => {
    const filteredResults = filterSearchResults(searchResults ?? []);
    return filteredResults.sort((a, b) => {
      const aDate = new Date(a.release_date || a.first_air_date);
      const bDate = new Date(b.release_date || b.first_air_date);
      return bDate.getTime() - aDate.getTime();
    });
  }, [searchResults]);

  return {
    query,
    setQuery,
    suggestions,
    isLoadingSearch,
    getMediaType,
    sortedResults,
    isMediaTypeKey,
  };
};
