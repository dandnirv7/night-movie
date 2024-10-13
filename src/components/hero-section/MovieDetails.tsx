import { useState } from "react";
import { Link } from "react-router-dom";
import { MovieDetailsProps, Genre } from "@/types/heroSection";
import { useHighlightMovie } from "@/hooks/useHighlightMovie";
import { findVideos, slugifyTitle, truncateDesimal } from "@/lib/utils";

import { Image, Button } from "@nextui-org/react";
import { YoutubeModal } from "@/components/fragments/YoutubeModal";
import imdbLogo from "@/assets/imdb.png";

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  indexMovie,
  array,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const movieId = array?.[indexMovie]?.id;
  const { highlightMovie, highlightMovieVideos } = useHighlightMovie(movieId);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <div className="md:px-5 lg:w-[30%] z-10 md:w-[40%] order-1 hidden md:block">
      <div className="z-10 flex flex-col gap-3 md:gap-6">
        <h1 className="text-4xl font-extrabold lg:text-5xl">
          {highlightMovie?.title || ""}
        </h1>
        <p className="text-md md:text-lg line-clamp-[8]">
          {highlightMovie?.overview || ""}
        </p>
        <ul className="flex flex-row flex-wrap items-center gap-3 grow">
          {highlightMovie?.genres.map((genre: Genre, index: number) => (
            <li
              key={index}
              className="border-2 rounded-sm py-1.5 md:py-2 px-2 md:px-2.5 cursor-default"
            >
              {genre.name}
            </li>
          ))}
        </ul>
        <div className="flex flex-row items-center gap-2">
          <Image
            loading="lazy"
            src={imdbLogo}
            alt="imdb logo"
            radius="none"
            className="w-16 md:w-20"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: isLoading ? "none" : "block" }}
          />
          {!isLoading && (
            <h3 className="text-2xl font-bold md:text-3xl">
              {truncateDesimal(highlightMovie?.vote_average ?? 0)}/10
            </h3>
          )}
        </div>
        <div className="flex flex-row items-center gap-3 md:gap-5">
          <YoutubeModal
            videoId={findVideos(highlightMovieVideos)?.key ?? ""}
            text="play online"
          />
          <Button
            as={Link}
            to={`/movies/${slugifyTitle(highlightMovie?.title ?? "")}`}
            className="text-lg text-white bg-transparent md:text-xl hover:opacity-90"
            size="lg"
            radius="sm"
          >
            More Details
          </Button>
        </div>
      </div>
    </div>
  );
};
