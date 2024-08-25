import { formatNumbers } from "@/lib/utils";
import { Card, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { shortenedTitle, slugifyTitle } from "@/lib/utils";
import type { MovieCardProps } from "@/types/heroSection";

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      key={movie.id}
      to={`/series/${slugifyTitle(
        (movie.title || movie.name || movie.original_name) ?? ""
      )}`}
    >
      <Card className="relative hover:cursor-pointer">
        <Image
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          loading="lazy"
        />

        <div className="absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-purple-gem from-10% via-transparent via-50% to-transparent hover:from-black/50 hover:to-transparent h-full">
          <div className="absolute z-20 w-full bottom-2">
            <div>
              <h1 className="mb-1 text-sm font-semibold md:text-md">
                {shortenedTitle(movie.title) ||
                  shortenedTitle(movie.name) ||
                  shortenedTitle(movie.original_name)}
              </h1>
              <p className="text-xs font-semibold md:text-sm text-white/60">
                Season {formatNumbers(movie.number_of_seasons)} - E{" "}
                {movie.last_episode_to_air?.episode_number}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
