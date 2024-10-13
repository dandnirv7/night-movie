import { useQuery } from "@tanstack/react-query";
import fetchDiscover from "./api";
import type {
  DiscoverProps,
  DiscoverResponse,
  MovieApiParams,
  SeriesApiParams,
} from "./types";

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

export const useDiscoverMovies: DiscoverProps<DiscoverResponse> = (
  includeAdult,
  includeVideo,
  sortBy,
  genres,
  fromRate,
  toRate,
  page = "1"
) => {
  const params: MovieApiParams = {
    include_adult: includeAdult,
    include_video: includeVideo,
    language: "en-US",
    page: page,
    release_date: {
      gte: "2020-01-01",
    },
    sort_by: sortBy,
    with_origin_country: "KR|US|JP",
    vote_average: {
      gte: fromRate,
      lte: toRate,
    },
    with_genres: genres,
  };

  return useQuery({
    queryKey: [
      "discover",
      "movies",
      includeAdult,
      includeVideo,
      genres,
      fromRate,
      toRate,
      page,
    ],
    queryFn: () => fetchDiscover("/discover/movie", params),
    enabled: !!page,
  });
};

export const useDiscoverSeries: DiscoverProps<DiscoverResponse> = (
  includeAdult,
  includeNullFirstAirDates,
  sortBy,
  genres,
  fromRate,
  toRate,
  page = "1"
) => {
  const currentYear = new Date().getFullYear();

  const params: SeriesApiParams = {
    first_air_date_year: currentYear,
    include_adult: includeAdult,
    include_null_first_air_dates: includeNullFirstAirDates,
    language: "en-US",
    page,
    sort_by: sortBy,
    vote_average: {
      gte: fromRate,
      lte: toRate,
    },
    with_origin_country: "KR|US|JP",
    with_genres: genres,
  };

  return useQuery({
    queryKey: [
      "discover",
      "series",
      includeAdult,
      includeNullFirstAirDates,
      genres,
      fromRate,
      toRate,
      page,
    ],
    queryFn: () => fetchDiscover("/discover/tv", params),
    enabled: !!page,
  });
};
