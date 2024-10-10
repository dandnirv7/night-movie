import { Card as CardUINext, Image, Link } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { slugifyTitle, truncateDesimal, getYear } from "@/lib/utils";
import { CardCarouselProps, MovieItem } from "@/types/cardCarousel";

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

const CardCarousel: React.FC<CardCarouselProps> = ({
  type,
  movieData,
  title,
  link,
}) => {
  console.log(movieData);
  return (
    <main
      className={`${movieData?.length === 0 ? "hidden" : "block"} px-5 md:px-10`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize md:text-2xl lg:text-4xl">
          {title}
        </h1>
        <Link href={link}>
          <span className="text-sm text-white capitalize md:text-md lg:text-xl hover:text-lavender-orchid">
            View All
          </span>
        </Link>
      </div>
      <Carousel className="min-w-full z-[20] mt-8">
        <CarouselContent>
          {movieData?.map((item) => (
            <CarouselItem
              key={item.id}
              className="flex flex-col items-center justify-between basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              {type === "cast" ? (
                <>
                  <a href={getLink(item, type)} className="relative md:p-1">
                    <CardUINext
                      shadow="sm"
                      radius="md"
                      className="mb-3 md:mb-2"
                    >
                      <Image
                        shadow="sm"
                        radius="md"
                        alt={item.name}
                        src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                        className="object-cover cursor-pointer"
                      />
                      <div className="absolute z-[99] w-full bg-white bg-opacity-30 backdrop-blur-md shadow-lg bottom-0 left-0 p-2 lg:p-5">
                        <p className="text-xs font-semibold text-center text-black lg:text-lg line-clamp-1">
                          {item.name}
                        </p>
                      </div>
                    </CardUINext>
                  </a>
                </>
              ) : (
                <>
                  <a href={getLink(item, type)}>
                    <CardUINext
                      shadow="sm"
                      radius="md"
                      className="mb-2 aspect-[3/4]"
                    >
                      <Image
                        shadow="sm"
                        radius="md"
                        alt={item.title}
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        className="aspect-[3/4]"
                        isZoomed
                      />
                    </CardUINext>
                  </a>
                  <div className="w-full md:px-2">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                      <Link href={getLink(item, type)}>
                        <span className="text-xs text-white line-clamp-1 lg:text-base">
                          {item.title || item.name || item.original_name}
                        </span>
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
                      {getYear(item.release_date ?? "") ||
                        getYear(item.first_air_date ?? "") ||
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
