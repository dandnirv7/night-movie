import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useNowPlaying = (page = 1) => {
  return useQuery({
    queryKey: ["nowPlaying", page],
    queryFn: async () => {
      const nowPlayingResponse = await axiosInstance.get(
        `/movie/now_playing?language=en-US&page=${page}`
      );
      return nowPlayingResponse?.data.results;
    },
  });
};
