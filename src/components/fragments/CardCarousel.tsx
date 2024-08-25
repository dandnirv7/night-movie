import { Card as CardUINext, Image } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { slugifyTitle, truncateDesimal, getYear } from "@/lib/utils";
import type { CardCarouselProps, MovieItem } from "@/types/heroSection";

export const CardCarousel: React.FC<CardCarouselProps> = ({
  type,
  data,
  title,
}) => {
  const getLink = (movie: MovieItem) => {
    return type === "movies"
      ? `/movies/${slugifyTitle(
          movie.title || movie.name || movie.original_name
        )}`
      : `/series/${slugifyTitle(
          movie.title || movie.name || movie.original_name
        )}`;
  };
  return (
    <div className="px-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize md:text-2xl lg:text-4xl">
          {title}
        </h1>
        <Link
          to="/movies"
          className="text-sm capitalize md:text-md lg:text-xl hover:text-lavender-orchid"
        >
          View All
        </Link>
      </div>
      <Carousel className="min-w-full z-[20] mt-8">
        <CarouselContent>
          {data?.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="flex flex-col items-center justify-between basis-1/3 md:basis-1/5 lg:basis-1/6 "
            >
              <Link to={getLink(movie)} className="md:p-1">
                <CardUINext shadow="sm" className="mb-3 md:mb-4">
                  <Image
                    shadow="sm"
                    radius="none"
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    className="cursor-pointer"
                    isZoomed
                  />
                </CardUINext>
              </Link>
              <div className="w-full px-2">
                <div className="flex flex-col items-start justify-between md:flex-row md:items-center gap-x-4">
                  <Link
                    to={getLink(movie)}
                    className="text-xs font-semibold md:text-md lg:text-lg w-full truncate ..."
                  >
                    {movie.title || movie.name || movie.original_name}
                  </Link>
                  <p className="hidden lg:block">
                    {movie.vote_average === 0 ? (
                      <span>N/A</span>
                    ) : (
                      <>
                        <span className="text-lg text-sunset-orange">
                          {truncateDesimal(movie.vote_average)}
                        </span>
                        <span>/10</span>
                      </>
                    )}
                  </p>
                </div>
                <p className="text-[.65rem] md:text-sm leading-4 text-white/50">
                  {getYear(movie?.release_date) ||
                    getYear(movie?.first_air_date)}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
