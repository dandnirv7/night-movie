import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["fetchPopularMovies"],
    queryFn: async () => {
      const popularMoviesResponse = await axiosInstance.get(
        "/movie/popular?language=en-US&page=1"
      );
      return popularMoviesResponse?.data.results;
    },
    refetchOnWindowFocus: false,
  });
};
