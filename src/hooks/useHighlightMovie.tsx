import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  fetchHighlightMovie,
  fetchHighlightMovieVideos,
} from "@/features/fetchHighlightMovie";
import { Movie, Video } from "@/types/heroSection";

export const useHighlightMovie = (movieId?: number) => {
  const { data: highlightMovie, refetch: refetchHighlightMovie } = useQuery<
    Movie | undefined
  >({
    queryKey: ["highlightMovie", movieId],
    queryFn: () =>
      movieId ? fetchHighlightMovie(movieId) : Promise.resolve(undefined),
    enabled: !!movieId,
  });

  const { data: highlightMovieVideos, refetch: refetchHighlightMovieVideos } =
    useQuery<Video[] | undefined>({
      queryKey: ["highlightMovieVideos", movieId],
      queryFn: () =>
        movieId
          ? fetchHighlightMovieVideos(movieId)
          : Promise.resolve(undefined),
      enabled: !!movieId,
    });

  useEffect(() => {
    if (movieId) {
      refetchHighlightMovie();
      refetchHighlightMovieVideos();
    }
  }, [movieId, refetchHighlightMovie, refetchHighlightMovieVideos]);

  return {
    highlightMovie,
    highlightMovieVideos,
    refetchHighlightMovie,
    refetchHighlightMovieVideos,
  };
};
