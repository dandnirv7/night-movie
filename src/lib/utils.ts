import type { Video } from "@/types/heroSection";
import { DetailCrew, SeasonItems } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SuggestionCardItem } from "./types";

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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
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

export const formatNumbers = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num?.toString();
};

export const getYear = (date: string) => {
  return new Date(date).getFullYear();
};

export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "";
  }

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formatter.format(date);
};

export const findDirector = (crews: DetailCrew[] | undefined): DetailCrew[] => {
  if (!crews) {
    return [];
  }
  const director = crews.find((crew) => crew.job === "Director");
  return director ? [director] : [];
};

export const filterSeason = (seasons: SeasonItems[]): SeasonItems[] => {
  if (!seasons) {
    return [];
  }
  return seasons.filter((season) => season.name.includes("Season"));
};

export const replaceCommaWithEncodedPipe = (inputString: string) => {
  if (!inputString) {
    return;
  }
  return inputString?.replace(/,/g, "%7C");
};

export const filteredSuggestions = (suggestions: SuggestionCardItem[] = []) => {
  return suggestions.filter(
    ({ media_type, poster_path }) =>
      media_type !== "person" && poster_path !== null
  );
};
