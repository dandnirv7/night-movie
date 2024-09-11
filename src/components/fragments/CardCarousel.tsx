import { Card as CardUINext, Image } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { slugifyTitle, truncateDesimal, getYear } from "@/lib/utils";
import type { CardCarouselProps, MovieItem } from "@/types/heroSection";

const getLink = (item: MovieItem, type: string) => {
  const slug = slugifyTitle(item.title || item.name || item.original_name);

  switch (type) {
    case "movies":
      return `/movies/${slug}`;
    case "series":
      return `/series/${slug}`;
    case "cast":
      return `/cast/${slug}`;
    default:
      throw new Error("Unknown type");
  }
};

const CardCarousel: React.FC<CardCarouselProps> = ({ type, data, title }) => {
  return (
    <main className={`${data?.length === 0 ? "hidden" : "block"}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize md:text-2xl lg:text-4xl">
          {title}
        </h1>
        <Link
          to={`/${type}`}
          className="text-sm capitalize md:text-md lg:text-xl hover:text-lavender-orchid"
        >
          View All
        </Link>
      </div>
      <Carousel className="min-w-full z-[20] mt-8">
        <CarouselContent>
          {data?.map((item) => (
            <CarouselItem
              key={item.id}
              className="flex flex-col items-center justify-between basis-1/3 md:basis-1/5 lg:basis-1/5"
            >
              {type === "cast" ? (
                <>
                  <Link to={getLink(item, type)} className="relative md:p-1">
                    <CardUINext shadow="sm" className="mb-3 md:mb-4">
                      <Image
                        shadow="sm"
                        radius="none"
                        alt={item.name}
                        src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                        className="cursor-pointer"
                      />
                      <p className="absolute z-[99] w-full bg-white text-black font-semibold text-lg bg-opacity-30 backdrop-blur-md shadow-lg bottom-0 left-0 p-5 text-center">
                        {item.name}
                      </p>
                    </CardUINext>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={getLink(item, type)} className="md:p-1">
                    <CardUINext shadow="sm" className="mb-3 md:mb-4">
                      <Image
                        shadow="sm"
                        radius="none"
                        alt={item.title}
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        className="cursor-pointer"
                        isZoomed
                      />
                    </CardUINext>
                  </Link>
                  <div className="w-full md:px-2">
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center gap-x-4">
                      <Link
                        to={getLink(item, type)}
                        className="line-clamp-1 text-xs lg:text-base"
                      >
                        {item.title || item.name || item.original_name}
                      </Link>
                      <p className="hidden lg:block">
                        {item.vote_average === 0 ? (
                          <span>N/A</span>
                        ) : (
                          <>
                            <span className="text-lg text-sunset-orange">
                              {truncateDesimal(item.vote_average)}
                            </span>
                            <span>/10</span>
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-[.65rem] lg:text-sm leading-4 text-white/50">
                      {getYear(item?.release_date) ||
                        getYear(item?.first_air_date) ||
                        "Unknown"}
                    </p>
                  </div>
                </>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </main>
  );
};

export default CardCarousel;
