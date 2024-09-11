import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useOnTheAir = (page = 1) => {
  return useQuery({
    queryKey: ["onTheAir", page],
    queryFn: async () => {
      const OnTheAirResponse = await axiosInstance.get(
        `/tv/on_the_air?language=en-US&page=${page}`
      );
      return OnTheAirResponse?.data.results;
    },
  });
};
