export interface MovieItem {
  id: number;
  name: string;
  profile_path?: string;
  poster_path: string;
  title?: string;
  original_name: string;
  vote_average: number;
  release_date?: string;
  first_air_date: string;
}

export interface CardCarouselProps {
  type: string;
  movieData: MovieItem[];
  title: string;
  link?: string;
}
