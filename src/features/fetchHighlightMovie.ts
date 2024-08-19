import { Movie, Video } from "@/types/heroSection";
import { axiosInstance } from "@/lib/axios";

export const fetchHighlightMovie = async (
  movieId: number
): Promise<Movie | undefined> => {
  try {
    const highlightMovieResponse = await axiosInstance.get(
      `/movie/${movieId}?language=en-US`
    );
    return highlightMovieResponse.data as Movie;
  } catch (error) {
    console.error("Failed to fetch highlight movie:", error);
    return undefined;
  }
};

export const fetchHighlightMovieVideos = async (
  movieId: number
): Promise<Video[] | undefined> => {
  try {
    const highlightMovieVideosResponse = await axiosInstance.get(
      `/movie/${movieId}/videos?language=en-US`
    );
    return highlightMovieVideosResponse.data.results as Video[];
  } catch (error) {
    console.error("Failed to fetch highlight movie videos:", error);
    return undefined;
  }
};
