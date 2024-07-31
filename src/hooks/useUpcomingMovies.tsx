import { useQuery } from "@tanstack/react-query";
import { upcomingMovies } from "@/features/fetchUpcomingMovies";

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ["fetchUpcomingMovies"],
    queryFn: () => upcomingMovies(),
    refetchOnWindowFocus: false,
  });
};
