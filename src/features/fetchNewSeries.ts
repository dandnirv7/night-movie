import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useNewSeries = () => {
  return useQuery({
    queryKey: ["fetchNewSeries"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/tv/on_the_air?language=en-US&page=1"
      );
      return response.data?.results;
    },
  });
};
