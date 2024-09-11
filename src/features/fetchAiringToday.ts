import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { MovieItem } from "@/types/heroSection";

export const useAiringToday = (page = 1) => {
  return useQuery({
    queryKey: ["fetchAiringToday", page],
    queryFn: async () => {
      const airingTodayResponse = await axiosInstance.get(
        `/tv/airing_today?language=en-US&page=${page}`
      );
      return airingTodayResponse.data.results;
    },
  });
};

export const useDetailMovies = (airingToday: MovieItem[]) => {
  return useQuery({
    queryKey: ["fetchDetailMovies"],
    queryFn: async () => {
      if (!airingToday) return [];

      const detailRequests = airingToday.map((movie: MovieItem) =>
        axiosInstance.get(`/tv/${movie.id}?language=en-US`)
      );

      const detailResponses = await Promise.all(detailRequests);

      return detailResponses.map((response) => response.data);
    },
    enabled: !!airingToday,
  });
};
