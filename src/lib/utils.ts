import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Video } from "@/types/heroSection";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateDesimal = (number: number): string => {
  return number?.toString().substring(0, 3);
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
