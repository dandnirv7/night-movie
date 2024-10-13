type Nullable<T> = T | null;

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
