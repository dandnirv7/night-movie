import type { ChangeEventHandler, Key, SetStateAction } from "react";
import type { Control, FieldValues } from "react-hook-form";

export type Movie = {
  genre_ids: number[];
  release_date: string;
};

export type arrayMovies = Movie[];

export type Region = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
};

export type FormData = {
  year?: number;
  region?: string;
  genre?: Set<string>;
};

export type Movies = {
  id: Key | number;
  name: string;
  poster_path?: string;
  title?: string;
  release_date?: string | Date;
  vote_average?: number;
};

export type SuggestionCardProps = {
  movies: SuggestionCardItem[];
  query: string;
};

export type SuggestionCardItem = {
  id: number;
poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
};

export type FieldProps = {
  control: Control<FieldValues>;
  name: string;
};

export type Option =
  | {
      id: string;
      name: string;
    }
  | {
      key: string;
      value: string;
    };

export type FilterSelectProps = {
  field: FieldProps;
  label: string;
  options: Option[];
  icon: React.ReactNode;
  isDisabled: boolean;
};

export type SearchInputProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  isLoadingSearch: boolean;
};

export type Series = {
  id: number;
  name: string;
};

export type GenreSelectProps = {
  field: FieldProps;
  selectedGenres: Set<string> | Iterable<object>;
  handleGenreChange: ChangeEventHandler<HTMLSelectElement>;
  genreMovies: Movies[];
  genreSeries: Series[];
  isDisabled: boolean;
};

export type DropdownFilterProps = {
  initialKey: string;
  data: Array<{ [key: string]: string }>;
  itemKey: string;
  itemContent: string;
  setSelectedRegion: (region: string) => void;
};

export type Genre = {
  id: number;
  name: string;
};
