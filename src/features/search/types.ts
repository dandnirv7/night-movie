import { UseQueryResult } from "@tanstack/react-query";
import { Key } from "react";

type Nullable<T> = T | null;

export type BaseSearchResults = {
  id: number;
  poster_path: Nullable<string>;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path?: Nullable<string>;
  overview?: string;
  title?: string;
  release_date?: string;
  video?: boolean;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  gender?: number;
  known_for_department?: string;
  profile_path?: Nullable<string>;
  known_for?: KnownFor[];
};

export interface MovieSearchResults extends BaseSearchResults {
  backdrop_path: Nullable<string>;
  overview: string;
  title: string;
  release_date: string;
  video: boolean;
}

export interface SeriesSearchResults extends BaseSearchResults {
  overview: string;
  backdrop_path: Nullable<string>;
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface KnownFor {
  backdrop_path: Nullable<string>;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: Nullable<string>;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: Nullable<string>;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface PersonSearchResults extends BaseSearchResults {
  name: string;
  original_name: string;
  gender: number;
  known_for_department: string;
  profile_path: Nullable<string>;
  known_for: KnownFor[];
}

export type MultiSearchProps<TData> = (
  debouncedQuery: string
) => UseQueryResult<TData, Error>;

export interface SearchData {
  original_name: string | undefined;
  id: Key | number;
  poster_path: string;
  title?: string;
  name?: string;
  release_date: string | Date;
  first_air_date: string | Date;
  vote_average: number;
  media_type: string;
  overview: string;
}

export type MediaTypeKey = "movie" | "tv" | "person";
