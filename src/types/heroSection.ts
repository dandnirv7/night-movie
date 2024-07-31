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
