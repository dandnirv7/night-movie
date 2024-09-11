type Nullable<T> = T | null;

interface Genre {
  id: number;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CommonDetails {
  id: number;
  poster_path: Nullable<string>;
  title: string;
  release_date: string;
  overview: string;
  popularity: number;
}

export interface Movie extends CommonDetails {
  adult: boolean;
  backdrop_path: Nullable<string>;
  first_air_date: string;
  genres: Genre[];
  name: string;
  networks: Network[];
  origin_country: string[];
  original_title: string;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status?: string;
  tagline: Nullable<string>;
  vote_count: number;
  vote_average: number;
}

export interface Series extends CommonDetails {
  backdrop_path: Nullable<string>;
  genres: Genre[];
  origin_country: string[];
  original_name: string;
  first_air_date: string;
  name: string;
  networks: Network[];
  original_title: string;
  runtime: number;
  status?: string;
  tagline: Nullable<string>;
  vote_average: number;
  vote_count: number;
}

export interface CastItem extends CommonDetails {
  profile_path: Nullable<string>;
  known_for_department: string;
  popularity: number;
  known_for: CommonDetails[];
}

export interface DetailProps<T> {
  details: T;
}

export interface SeasonItems {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface DetailCrew {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: Nullable<string>;
  credit_id: string;
  department: string;
  job: string;
}

export interface DetailCast {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: Nullable<string>;
  cast_id: number;
  character: string;
  credit_id: string;
}

export interface DetailCastProps {
  detailCast: DetailCast[];
  crews: DetailCrew[];
}

export interface ArrayItem {
  profile_path: string;
  popularity: number;
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  first_air_date: string;
  name: string;
  original_name: string;
}

export interface MovieGridProps {
  type: string;
  array: ArrayItem[];
  title: string;
  sliceCount: number;
  isPopular?: boolean;
}

export type KnownForItems = {
  id: number;
  media_type: string;
  title: string;
  name: string;
  original_name: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
};

export interface CastItems {
  name: string;
  profile_path: string;
  known_for_department: string;
  popularity: number;
  known_for: KnownForItems[];
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: Nullable<string>;
  rating: number;
}

export interface Reviews {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewsProps {
  reviews: Reviews[];
}

export interface DetailItemProps {
  heading: string;
  title: string;
}

interface GuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: Nullable<string>;
}

interface Crew {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: Nullable<string>;
}

interface Episode {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: Crew[];
  guest_stars: GuestStar[];
}

interface Seasons {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface AllSeasonsProps {
  allSeasons: Seasons[];
}

interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface NextEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface DetailSeries {
  adult: boolean;
  backdrop_path: string;
  created_by: never[];
  episode_run_time: never[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: Nullable<NextEpisodeToAir>;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface DetailSeriesSectionProps {
  detailSeries: DetailSeries;
}
