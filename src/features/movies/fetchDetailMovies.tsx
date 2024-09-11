import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useSearchMovie = (query?: string) => {
  return useQuery({
    queryKey: ["searchMovie", query],
    queryFn: async () => {
      const searchMovieResponse = await axiosInstance.get(
        `/search/movie?query=${query}&include_adult=false`
      );
      return searchMovieResponse.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!query,
  });
};

export const useDetailMovies = (movieId?: number) => {
  return useQuery({
    queryKey: ["detailMovie", movieId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/movie/${movieId}`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!movieId,
  });
};

export const useMoviesVideos = (movieId?: number) => {
  return useQuery({
    queryKey: ["movieVideos", movieId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/movie/${movieId}/videos`);
      return response.data.results;
    },
    enabled: !!movieId,
  });
};

export const useRecommendationsMovies = (movieId: string) => {
  return useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/movie/${movieId}/recommendations`
      );

      return response.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!movieId,
  });
};
export const useReviewsMovies = (movieId: string) => {
  return useQuery({
    queryKey: ["reviews", movieId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/movie/${movieId}/reviews`);

      return response.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!movieId,
  });
};

export const useMoviesImages = (movieId: string) => {
  return useQuery({
    queryKey: ["moviesImages", movieId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/movie/${movieId}/images`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!movieId,
  });
};
