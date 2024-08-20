import { Card, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { slugifyTitle } from "@/lib/utils";
import type { MovieItemProps } from "@/types/popularSection";

export const MainMovieDisplay = ({ movie }: MovieItemProps) => {
  return (
    <Link
      to={`/movies/${slugifyTitle(movie.title ?? "")}`}
      className="w-4/6 md:scale-90 lg:scale-100 lg:order-2 lg:h-full lg:w-1/2"
    >
      <Card>
        <Image
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          className="cursor-pointer"
          isZoomed
          loading="lazy"
        />
      </Card>
    </Link>
  );
};
