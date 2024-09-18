import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { MovieItem } from "@/types/heroSection";

export const useAiringToday = (
  date: string,
  year: number,
  page: number = 1
) => {
  return useQuery({
    queryKey: ["fetchAiringToday", page, date],
    queryFn: async () => {
      const airingTodayResponse = await axiosInstance.get(
        `/discover/tv?air_date.gte=${date}&first_air_date_year=${year}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_origin_country=KR
        `
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
        axiosInstance.get(`/tv/${movie.id}`)
      );

      const detailResponses = await Promise.all(detailRequests);

      return detailResponses.map((response) => response.data);
    },
    enabled: !!airingToday,
  });
};
