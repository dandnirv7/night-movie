import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

import type { Genre } from "@/types/filterSection";

export const useGenreMovies = () => {
  return useQuery<Genre[]>({
    queryKey: ["genre-movies"],
    queryFn: async () => {
      const response = await axiosInstance.get("/genre/movie/list?language=en");
      return response?.data?.genres;
    },
    refetchOnWindowFocus: false,
  });
};

export const useGenreSeries = () => {
  return useQuery<Genre[]>({
    queryKey: ["genre-series"],
    queryFn: async () => {
      const response = await axiosInstance.get("/genre/tv/list?language=en");
      return response?.data?.genres;
    },
    refetchOnWindowFocus: false,
  });
};
