export type HighlighMovieProps = {
  movies: [];
  setIndexMovie: React.Dispatch<React.SetStateAction<number>>;
  indexMovie: number;
};

export type MovieItem = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  name: string;
  release_date: string;
  original_name: string;
  last_episode_to_air: {
    episode_number: number;
  };
  number_of_seasons: number;
};

export type BackgroundImageProps = {
  backdropPath: string;
  children: React.ReactNode;
};

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average?: number;
  genres: Genre[];
}

export interface MovieDetailsProps {
  indexMovie: number;
  array: Movie[];
}

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
}

export type CardCarouselProps = {
  data: MovieItem[];
  title: string;
};
