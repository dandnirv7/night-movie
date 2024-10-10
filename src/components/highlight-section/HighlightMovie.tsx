import { findVideos } from "@/lib/utils";

import {
  useDetailMovies,
  useHighlightMovieVideos,
  useListStars,
} from "@/features/fetchTopRatedMovies";
import { useRandomTopRatedMovieId } from "@/hooks/useRandomTopRatedMovieId";

import { MovieDetails } from "@/components/highlight-section/MovieDetails";
import type {
  HighlightMoviesResponse,
  ListStarsResponse,
  HighlightMovieVideosResponse,
} from "@/types/highlightSection";

export const HighlightMovie: React.FC = () => {
  const { randomMovieId } = useRandomTopRatedMovieId();

  const { data: detailMovie } = useDetailMovies(
    randomMovieId
  ) as HighlightMoviesResponse;
  const { data: listStars } = useListStars(randomMovieId) as ListStarsResponse;
  const { data: highlightMovieVideos } = useHighlightMovieVideos(
    randomMovieId
  ) as HighlightMovieVideosResponse;

  const videoId = findVideos(highlightMovieVideos)?.key;

  return (
    <div className="relative min-h-screen min-w-screen">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${detailMovie?.backdrop_path}")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black opacity-70" />
      </div>

      <MovieDetails
        highlightMovie={detailMovie}
        listStars={listStars}
        highlightMovieVideos={highlightMovieVideos}
        videoId={videoId}
      />
    </div>
  );
};
