import { Card as CardUINext, Image } from "@nextui-org/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { slugifyTitle } from "@/lib/utils";

type cardCarouselProps = {
  data: [];
  title: string;
};

type movieItem = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  name?: string;
  original_name?: string;
};

export const CardCarousel: React.FC<cardCarouselProps> = ({ data, title }) => {
  return (
    <div className="px-10 mt-24">
      <div className="flex justify-between mb-8">
        <h1 className="capitalize text-3xl font-bold">{title}</h1>
        <Link to="/movies" className="capitalize text-lg">
          View All
        </Link>
      </div>
      <Carousel className=" min-w-full z-[20] mt-6 ">
        <CarouselContent className="-mr-48">
          {data?.map((movie: movieItem, index: number) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
              <Link to={`/movies/${slugifyTitle(movie.title)}`} className="p-1">
                <CardUINext shadow="sm" key={index} className="mb-4">
                  <Image
                    shadow="sm"
                    radius="lg"
                    alt={movie?.title}
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    className="cursor-pointer"
                  />
                </CardUINext>
                <h1 className="text-center text-lg">{movie?.title}</h1>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
