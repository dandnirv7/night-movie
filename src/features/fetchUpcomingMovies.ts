import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["fetchUpcomingMovies"],
    queryFn: async () => {
      const upcomingMoviesResponse = await axiosInstance.get(
        "/movie/upcoming?language=en-US&page=1"
      );
      return upcomingMoviesResponse?.data.results;
    },
  });
};

// export const useAiringToday = () => {
//   return useQuery({
//     queryKey: ["fetchAiringToday"],
//     queryFn: async () => {
//       const airingTodayResponse = await axiosInstance.get(
//         "/tv/airing_today?language=en-US&page=1"
//       );
//       return airingTodayResponse.data.results;
//     },
//   });
// };

// export const useDetailMovies = (airingToday: MovieItem[]) => {
//   return useQuery({
//     queryKey: ["fetchDetailMovies"],
//     queryFn: async () => {
//       if (!airingToday) return [];

//       const detailRequests = airingToday.map((movie: MovieItem) =>
//         axiosInstance.get(`/tv/${movie.id}?language=en-US`)
//       );

//       const detailResponses = await Promise.all(detailRequests);

//       return detailResponses.map((response) => response.data);
//     },
//     enabled: !!airingToday,
//   });
// };
