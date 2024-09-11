import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const usePopularCast = (page = 1) => {
  return useQuery({
    queryKey: ["popularCast", page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/person/popular?language=en-US&page=${page}`
      );
      return response.data?.results;
    },
  });
};

export const useTrendingCast = () => {
  return useQuery({
    queryKey: ["trendingCast"],
    queryFn: async () => {
      const trendingCastResponse = await axiosInstance.get(
        "/trending/person/week?language=en-US"
      );
      return trendingCastResponse.data?.results;
    },
  });
};

export const useDetailCast = (query?: string) => {
  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      const detailCastResponse = await axiosInstance.get(
        `/search/person?query=${query}&include_adult=false&language=en-US&page=1`
      );
      return detailCastResponse.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!query,
  });
};
