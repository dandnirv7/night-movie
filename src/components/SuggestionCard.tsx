import type { SuggestionCardProps } from "@/types/filterSection";

import { Link } from "react-router-dom";
import { slugifyTitle, toDate, truncateDesimal } from "@/lib/utils";

import { Card, CardBody, Image } from "@nextui-org/react";
import { Star } from "lucide-react";

const SuggestionCard: React.FC<SuggestionCardProps> = ({ movies, query }) => {
  return (
    <Card
      className="dark absolute w-full top-12  z-50 lg:w-1/4 lg:right-0"
      radius="none"
    >
      {movies?.slice(0, 6).map((movie) => (
        <CardBody key={movie.id}>
          <div className="pb-3 flex flex-row gap-5 items-center border-b border-zinc-500">
            <Image
              width={60}
              radius="sm"
              alt={movie?.title}
              loading="lazy"
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
              className="w-full"
            />
            <Link
              to={`/movies/${slugifyTitle(movie.title)}`}
              className=" overflow-hidden"
            >
              <p className="truncate ...">
                {movie.title}
                <span className="text-xs ml-2">
                  {`( ${toDate(movie.release_date)} )`}
                </span>
              </p>
              <div className="flex flex-row gap-1 items-center">
                <Star color="orange" fill="orange" size={20} />
                <p className="text-gray-400">
                  {truncateDesimal(movie.vote_average)}
                </p>
              </div>
            </Link>
          </div>
        </CardBody>
      ))}
      {(movies ?? []).length !== 0 && (
        <Link
          to={`/search/${query}`}
          className="mb-5 flex items-center justify-center "
        >
          <p className="text-sm italic text-center text-lavender-orchid">
            View all results
          </p>
        </Link>
      )}
    </Card>
  );
};

export default SuggestionCard;
