import React from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

import { useNowPlaying } from "@/features/fetchNowPlaying";
import { useUpcomingMovies } from "@/features/fetchUpcomingMovies";
import { usePopularMovies } from "@/features/movies/fetchPopularMovies";
import {
  useDetailMovies,
  useMoviesVideos,
  useRecommendationsMovies,
  useReviewsMovies,
  useSearchMovie,
} from "@/features/movies/fetchDetailMovies";
import { useCreditsMovie } from "@/features/fetchCreditsMovie";
import { useYoutube } from "@/hooks/useYoutube";
import { findDirector, findVideos } from "@/lib/utils";

import LoadingSpinner from "@/components/elements/LoadingSpinner";
import MovieGrid from "@/components/fragments/MovieGrid";
import Pagination from "@/components/fragments/Pagination";
import Reviews from "@/components/fragments/Reviews";
import CardCarousel from "@/components/fragments/CardCarousel";
import DetailSection from "@/components/detail-pages/DetailSection";
import DetailCast from "@/components/detail-pages/DetailCast";
import { useDiscoverAction } from "@/features/fetchDiscover";

export const Movies: React.FC = () => {
  const { pageNumber } = useParams();
  const page = Number(pageNumber) || 1;

  const { data: popularMovies, isLoading: isPopularLoading } =
    usePopularMovies();
  const { data: nowPlayingMovies, isLoading: isNowPlayingLoading } =
    useNowPlaying(page);
  const { data: upComingMovies, isLoading: isUpComingLoading } =
    useUpcomingMovies(page);

  const { data: actionMovies, isLoading: isActionLoading } =
    useDiscoverAction(page);

  const isLoading =
    isPopularLoading ||
    isNowPlayingLoading ||
    isUpComingLoading ||
    isActionLoading;

  return (
    <LoadingSpinner isLoading={isLoading}>
      <main className="flex flex-col items-center p-6 space-y-10 md:py-28 md:px-10">
        <MovieGrid
          type="movies"
          array={popularMovies}
          title="Popular Movies"
          sliceCount={15}
          isPopular
        />
        <MovieGrid
          type="movies"
          array={upComingMovies}
          title="Coming Soon"
          sliceCount={18}
        />
        <MovieGrid
          type="movies"
          array={nowPlayingMovies}
          title="Latest Movie"
          sliceCount={18}
        />
        <MovieGrid
          type="movies"
          array={actionMovies}
          title="Action Movie"
          sliceCount={18}
        />
        <Pagination type="movies" />
      </main>
    </LoadingSpinner>
  );
};

export const DetailMovie: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { opts } = useYoutube({ detail: true, auto_play: 0 });

  const { data: searchResults, isLoading: isSearchLoading } =
    useSearchMovie(movieId);
  const selectedMovieId = searchResults?.[0]?.id ?? null;

  const { data: detailMovies, isLoading: isDetailLoading } =
    useDetailMovies(selectedMovieId);
  const { data: moviesVideos, isLoading: isVideosLoading } =
    useMoviesVideos(selectedMovieId);
  const { data: recommendationsMovies, isLoading: isRecommendationsLoading } =
    useRecommendationsMovies(selectedMovieId);
  const { data: reviewsMovies, isLoading: isReviewsLoading } =
    useReviewsMovies(selectedMovieId);
  const { data: creditsMovies, isLoading: isCreditsLoading } =
    useCreditsMovie(selectedMovieId);

  const isLoading =
    isSearchLoading ||
    isDetailLoading ||
    isVideosLoading ||
    isReviewsLoading ||
    isRecommendationsLoading ||
    isCreditsLoading;

  return (
    <LoadingSpinner isLoading={isLoading}>
      {detailMovies ? (
        <main className="flex flex-col p-5 gap-14 md:p-10 md:gap-20">
          <YouTube
            videoId={findVideos(moviesVideos)?.key}
            opts={opts}
            className="flex items-center justify-center pt-20"
          />
          <DetailSection details={detailMovies} type="movie" />
          <DetailCast
            detailCast={creditsMovies?.cast ?? []}
            crews={findDirector(creditsMovies?.crew) ?? []}
          />
          <CardCarousel
            data={recommendationsMovies}
            title="Related Movies"
            type="movies"
          />
          <Reviews reviews={reviewsMovies} />
        </main>
      ) : (
        <div>No data available.</div>
      )}
    </LoadingSpinner>
  );
};
