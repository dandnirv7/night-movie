import { slugifyTitle } from "@/lib/utils";
import type { MovieItemProps } from "@/types/popularSection";
import { Image, Link } from "@nextui-org/react";

export const MainMovieDisplay = ({ movie }: MovieItemProps) => {
  return (
    <Link
      href={`/series/${slugifyTitle(movie.title || movie.name || movie.original_name || "")}`}
      className="order-2 p-2 lg:p-0 lg:w-[90%]"
    >
      <Image
        alt={movie.title}
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        className="cursor-pointer object-cover aspect-[3/4] rounded-sm md:rounded-2xl"
        isZoomed
        loading="lazy"
      />
    </Link>
  );
};
