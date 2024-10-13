import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useUpcomingMovies = (page = 1) => {
  return useQuery({
    queryKey: ["upcomingMovies", page],
    queryFn: async () => {
      const upcomingMoviesResponse = await axiosInstance.get(
        "/movie/upcoming?language=en-US&page=1"
      );
      return upcomingMoviesResponse?.data.results;
    },
  });
};
