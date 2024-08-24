import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Video } from "@/types/heroSection";
import type { Movie, arrayMovies } from "@/types/filterSection";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateDesimal = (number: number): string => {
  return number?.toString().substring(0, 3);
};

export const toDate = (date: string | Date): number => {
  return new Date(date).getFullYear();
};

export const slugifyTitle = (title: string) => {
  return title
    ?.toLowerCase()
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
};

export const findVideos = (videos?: Video[]): Video | undefined => {
  return videos?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
};

export const filteredSearch = (
  array: arrayMovies,
  targetYear: number,
  desiredGenre: string[] | undefined
): Movie[] => {
  return array?.filter((movie) => {
    const releaseYear = new Date(movie?.release_date).getFullYear();

    const yearFilter = releaseYear > targetYear;

    const genreFilter =
      !desiredGenre ||
      desiredGenre?.length === 0 ||
      movie?.genre_ids?.some((genre) =>
        desiredGenre?.includes(genre.toString())
      );

    return yearFilter && genreFilter;
  });
};

export const shortenedTitle = (title: string) => {
  if (title?.length > 20) {
    return title?.substring(0, 20).trim().concat("...");
  }
  return title;
};

export const formatNumbers = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num.toString();
};

export const getYear = (date: string) => {
  return new Date(date).getFullYear();
};
