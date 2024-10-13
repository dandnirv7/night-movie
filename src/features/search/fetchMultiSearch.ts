import {
  MovieSearchResults,
  MultiSearchProps,
  PersonSearchResults,
  SeriesSearchResults,
} from "./types";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useMultiSearch: MultiSearchProps<
  (MovieSearchResults | PersonSearchResults | SeriesSearchResults)[]
> = (debouncedQuery) => {
  return useQuery({
    queryKey: ["search", "multi", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const response = await axiosInstance.get(
        `/search/multi?query=${debouncedQuery}&include_adult=false&language=en-US&page=1`
      );
      return response?.data?.results;
    },

    enabled: !!debouncedQuery,
  });
};

export const useSearchResults = (query?: string) => {
  return useQuery({
    queryKey: ["search", "multi", query],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
      );
      return response?.data?.results;
    },
    enabled: !!query,
  });
};
