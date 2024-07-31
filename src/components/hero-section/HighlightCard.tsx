import { Link } from "react-router-dom";
import { slugifyTitle, truncateDesimal } from "@/lib/utils";
import { HighlighMovieProps, MovieItem } from "@/types/heroSection";

import { Card as CardUINext, Image } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

export const HighlightCard: React.FC<HighlighMovieProps> = ({
  movies,
  setIndexMovie,
  indexMovie,
}) => {
  const carouselChange = (id: number) => {
    setIndexMovie(id);
  };

  return (
    <Carousel
      className=" relative lg:max-w-3xl z-20 mt-6 lg:absolute lg:top-36 right-0 md:max-w-lg order-1"
      opts={{
        direction: "ltr",
      }}
    >
      <h1 className="font-semibold text-2xl mb-5 md:mb-0">
        Hot new movie & Tv show :
      </h1>
      <CarouselContent className="-mr-56 md:mr-0 flex flex-row relative py-5 px-2">
        {movies?.slice(0, 20).map((movie: MovieItem, index: number) => (
          <CarouselItem
            key={index}
            className="basis-1/3 md:basis-1/2 lg:basis-1/3"
          >
            <div className="md:p-1">
              <CardUINext
                shadow="sm"
                key={index}
                // isPressable
                // onPress={() => carouselChange(index)}
                className={`${index === indexMovie ? "ring-2 ring-white shadow-lg shadow-purple-gem scale-105" : "focus-within::ring-red-50"} mb-5`}
              >
                <Image
                  onClick={() => carouselChange(index)}
                  shadow="sm"
                  radius="lg"
                  alt={movie?.title}
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  className="cursor-pointer"
                />
              </CardUINext>
            </div>
            <div className="md:hidden flex flex-col items-center justify-center gap-5">
              <h3 className="text-xl font-semibold text-center">
                {movie?.title}
              </h3>
              <div className=" flex flex-row items-center justify-center gap-2">
                <Star color="#F3CE13" fill="#F3CE13" />
                <h3 className="text-xl font-semibold">
                  {truncateDesimal(movie?.vote_average)}
                </h3>
              </div>
              {index === indexMovie && (
                <>
                  <Link to={slugifyTitle(`/movies/${movie?.title}`)}>
                    <span className="text-white text-lg">View Detail</span>
                  </Link>
                </>
              )}
              {/* <Button size="lg" className="flex items-center">
              </Button> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
