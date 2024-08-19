import type React from "react";
import type { Key } from "react";
import type { SuggestionCardProps } from "@/types/filterSection";

import { Link } from "react-router-dom";
import { slugifyTitle, toDate, truncateDesimal } from "@/lib/utils";

import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { Star } from "lucide-react";

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  movies,
  query,
}: SuggestionCardProps) => {
  return (
    <Card className="w-[38%] dark absolute left-10 top-32 z-50 ">
      {movies?.slice(0, 6).map((movie) => (
        <CardBody key={movie.id}>
          <div className="mb-3 flex flex-row gap-5 items-center ">
            <Image
              width={60}
              alt="NextUI hero Image"
              loading="lazy"
              src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            />
            <Link to={`/movies/${slugifyTitle(movie.title)}`}>
              <p>
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
          <Divider />
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
