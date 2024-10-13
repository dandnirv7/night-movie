import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ["popularMovies", page],
    queryFn: async () => {
      const popularMoviesResponse = await axiosInstance.get(
        `/movie/popular?language=en-US&page=${page}`
      );
      return popularMoviesResponse?.data.results;
    },
  });
};

export const usePopularSeries = (page = 1) => {
  return useQuery({
    queryKey: ["popularSeries", page],
    queryFn: async () => {
      const popularMoviesResponse = await axiosInstance.get(
        `/tv/popular?language=en-US&page=${page}`
      );
      return popularMoviesResponse?.data.results;
    },
  });
};
