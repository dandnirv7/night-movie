import { formatNumbers, slugifyTitle } from "@/lib/utils";
import type { MovieCardProps } from "@/types/heroSection";
import { Card, Image, Link } from "@nextui-org/react";

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      key={movie.id}
      href={`/series/${slugifyTitle(
        (movie.title || movie.name || movie.original_name) ?? ""
      )}`}
    >
      <Card className="relative rounded-md hover:cursor-pointer md:rounded-2xl">
        <Image
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          loading="lazy"
          className="aspect-[3/4] object-cover rounded-md md:rounded-2xl"
          height={300}
          width={300}
        />

        <div className="absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-purple-gem from-10% via-transparent via-50% to-transparent hover:from-black/50 hover:to-transparent h-full">
          <div className="absolute z-20 w-full px-2 text-center bottom-2">
            <div>
              <h1 className="mb-1 text-[10px] font-semibold md:text-sm line-clamp-1">
                {movie.title || movie.name || movie.original_name}
              </h1>
              <p className="text-[10px] font-semibold md:text-sm text-white/60">
                Season {formatNumbers(movie.number_of_seasons)} - E
                {formatNumbers(movie.last_episode_to_air?.episode_number)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
