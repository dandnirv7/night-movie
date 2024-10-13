import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useCreditsMovie = (movieId: number) => {
  return useQuery({
    queryKey: ["credits", movieId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/movie/${movieId}}/credits?language=en-US`
      );
      return response?.data;
    },
  });
};
