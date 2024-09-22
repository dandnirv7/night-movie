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
    queryKey: ["discover", "anime", page],
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
    with_origin_country: "KR|US",
  };

  return useQuery({
    queryKey: ["discover", "action", page],
    queryFn: () => fetchDiscover("/discover/movie", params),
    enabled: !!page,
  });
};

export const useDiscoverKoreanSeries = (page = 1) => {
  const params: SeriesApiParams = {
    first_air_date_year: 2024,
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    page,
    sort_by: "popularity.desc",
    with_origin_country: "KR",
  };

  return useQuery({
    queryKey: ["discover", "koreanSeries", page],
    queryFn: () => fetchDiscover("/discover/tv", params),
    enabled: !!page,
  });
};

export const useOnTheAirSeries = (currentDate: string, page = 1) => {
  const params: SeriesApiParams = {
    include_adult: false,
    include_null_first_air_dates: false,
    language: "en-US",
    page,
    sort_by: "first_air_date.desc",
    with_status: "1|2",
    with_origin_country: "US|KR",
    first_air_date: {
      lte: currentDate,
    },
  };

  return useQuery({
    queryKey: ["discover", "onTheAir", page],
    queryFn: () => fetchDiscover("/discover/tv", params),
    enabled: !!page,
  });
};

export const useDiscoverMovieByGenres = (
  with_genres: number,
  page: number = 1
) => {
  const params: MovieApiParams = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page,
    sort_by: "popularity.desc",
    with_genres,
    with_origin_country: "KR|US|JP",
  };

  return useQuery({
    queryKey: ["discover", "movieWithGenre", with_genres, page],
    queryFn: () => fetchDiscover("/discover/movie", params),
  });
};
