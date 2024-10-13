export type Genre = {
  id: number;
  name: string;
};

export type Cast = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  genres: Genre[];
  overview: string;
};

export interface MovieActionsProps {
  videoId: string | undefined;
  title: string | undefined;
}

export interface HighlightMoviesResponse {
  data?: Movie;
}

export interface Video {
  key?: string;
}

export interface HighlightMovieVideosResponse {
  data?: Video[];
}

export interface ListStarsResponse {
  data?: {
    cast: Cast[];
  };
}

export interface MovieStarsProps {
  stars?: { id: number; name: string }[];
}

export interface MovieOverviewProps {
  overview?: string;
}

export interface MovieGenresProps {
  genres?: { id: number; name: string }[];
}

export interface MovieDetailsProps {
  highlightMovie?: HighlightMoviesResponse["data"];
  listStars?: ListStarsResponse["data"];
  highlightMovieVideos?: HighlightMovieVideosResponse["data"];
  videoId?: string | undefined;
  genres?: Genre[];
  stars?: Cast[];
}
export interface SectionProps {
  title: string;
  items?: Array<{ id: number; name: string }>;
  separator: string;
}
