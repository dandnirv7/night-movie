import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import type { MovieApiParams, SeriesApiParams } from "@/types/types";

const fetchDiscover = async (
  endpoint: string,
  params: SeriesApiParams | MovieApiParams
) => {
  const response = await axiosInstance.get(endpoint, { params });
  return response?.data?.results;
};

export const useDiscoverAnime = (page = 1) => {
  const params: SeriesApiParams = {
    first_air_date_year: 2024,
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    page,
    sort_by: "popularity.desc",
    with_genres: 16,
    with_origin_country: "JP",
  };

  return useQuery({
    queryKey: ["anime", page],
    queryFn: () => fetchDiscover("/discover/tv", params),
    enabled: !!page,
  });
};

export const useDiscoverAction = (page = 1) => {
  const params: MovieApiParams = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page,
    primary_release_date: {
      gte: "2021-01-01",
    },
    sort_by: "popularity.desc",
    with_genres: 28,
    with_origin_country: "US",
  };

  return useQuery({
    queryKey: ["action", page],
    queryFn: () => fetchDiscover("/discover/movie", params),
    enabled: !!page,
  });
};
