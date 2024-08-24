import { Card as CardUINext, Image } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { slugifyTitle, truncateDesimal, getYear } from "@/lib/utils";
import type { CardCarouselProps } from "@/types/heroSection";

export const CardCarousel: React.FC<CardCarouselProps> = ({ data, title }) => {
  return (
    <div className="px-10 mt-20">
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
      <Carousel className="min-w-full z-[20]">
        <CarouselContent>
          {data?.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-1/3 md:basis-1/5 lg:basis-1/6"
            >
              <Link to={`/movies/${slugifyTitle(movie.title)}`} className="p-1">
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
                <div className="flex flex-col items-start justify-between md:flex-row md:items-start gap-x-4">
                  <h1 className="text-xs font-semibold md:text-lg  truncate ... w-full">
                    {movie.title}
                  </h1>
                  <p className="hidden md:block">
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
                  {getYear(movie?.release_date)}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
