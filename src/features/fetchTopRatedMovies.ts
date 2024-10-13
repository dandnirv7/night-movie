import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: ["fetch-highlight-movie"],
    queryFn: async () => {
      const topRatedMoviesResponse = await axiosInstance.get(
        "/movie/top_rated?language=en-US&page=1"
      );
      return topRatedMoviesResponse.data?.results;
    },
  });
};

export const useDetailMovies = (randomMovieId: number | null) => {
  return useQuery({
    queryKey: ["fetchDetailMovies", randomMovieId],
    queryFn: async () => {
      if (!randomMovieId) return null;

      const detailMoviesResponse = await axiosInstance.get(
        `/movie/${randomMovieId}?language=en-US`
      );
      return detailMoviesResponse.data;
    },
    enabled: !!randomMovieId,
  });
};

export const useListStars = (randomMovieId: number | null) => {
  return useQuery({
    queryKey: ["fetchListStars", randomMovieId],
    queryFn: async () => {
      const listStarsResponse = await axiosInstance.get(
        `/movie/${randomMovieId}/credits?language=en-US`
      );
      return listStarsResponse.data;
    },
    enabled: !!randomMovieId,
  });
};

export const useHighlightMovieVideos = (randomMovieId: number | null) => {
  return useQuery({
    queryKey: ["highlightMovieVideos", randomMovieId],
    queryFn: async () => {
      const movieVideosResponse = await axiosInstance.get(
        `/movie/${randomMovieId}/videos?language=en-US`
      );
      return movieVideosResponse.data.results;
    },
    enabled: !!randomMovieId,
  });
};
