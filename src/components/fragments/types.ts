type Nullable<T> = T | null;

export interface BaseItem {
  id: number;
  popularity: number;
  original_language: string;
  original_name: string;
  name: string;
  backdrop_path?: string;
  poster_path?: string;
  first_air_date: string;
  release_date: string;
}

export interface Result extends BaseItem {
  adult: boolean;
  genre_ids: number[];
  overview: string;
  vote_average: number;
  vote_count: number;
  title?: string;
  origin_country?: string[];
}

export interface CastItem extends BaseItem {
  profile_path?: string;
  title: string;
}

export interface MovieGridProps {
  type: string;
  array: CastItem[] | Result[];
  title: string;
  sliceCount: number;
  isPopular?: boolean;
}

export type SuggestionCardItem = {
  id: number;
  poster_path: Nullable<string>;
  media_type: string;
  vote_average: number;
  title?: string;
  release_date?: string;
  name?: string;
  first_air_date?: string;
  original_name?: string;
  profile_path?: Nullable<string>;
};
