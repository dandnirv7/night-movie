import { UseQueryResult } from "@tanstack/react-query";

type Nullable<T> = T | null;

export interface BaseApiParams {
  include_adult?: Nullable<boolean | string>;
  language?: string;
  page?: Nullable<number | string>;
  sort_by?: Nullable<string>;
  with_genres?: Nullable<string | number>;
  with_origin_country?: string;
  vote_average?: {
    gte?: Nullable<string>;
    lte?: Nullable<string>;
  };
}

export interface SeriesApiParams extends BaseApiParams {
  first_air_date_year?: number;
  include_null_first_air_dates?: Nullable<boolean | string>;
  first_air_date?: {
    gte?: Nullable<string>;
    lte?: Nullable<string>;
  };
  with_status?: string;
}

export interface MovieApiParams extends BaseApiParams {
  include_video?: Nullable<boolean | string>;
  primary_release_date?: {
    gte?: string;
    lte?: string;
  };
  release_date?: {
    gte?: string;
    lte?: string;
  };
}

export interface Result {
  adult: boolean;
  backdrop_path: Nullable<string>;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  title?: string;
  release_date?: string;
  profile_path?: string;
}

export interface DiscoverResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export type DiscoverProps<TData> = (
  includeAdult?: Nullable<string>,
  includeVideo?: Nullable<string>,
  includeNullFirstAirDates?: Nullable<string>,
  sortBy?: Nullable<string>,
  genres?: Nullable<string>,
  fromRate?: Nullable<string>,
  toRate?: Nullable<string>,
  page?: Nullable<string | number>
) => UseQueryResult<TData, Error>;

export type FetchDiscoverAPI<T> = (
  endpoint: string,
  params: SeriesApiParams | MovieApiParams
) => Promise<T>;
