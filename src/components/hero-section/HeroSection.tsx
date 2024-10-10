import { useState } from "react";

import { MovieDetails } from "@/components/hero-section/MovieDetails";
import { GradientOverlay } from "@/components/hero-section/GradientOverlay";
import { HighlightCard } from "@/components/hero-section/HighlightCard";

import { Spinner } from "@nextui-org/react";
import { useUpcomingMovies } from "@/features/fetchUpcomingMovies";

export const HeroSection = () => {
  const [indexMovie, setIndexMovie] = useState(0);
  const { data: upcomingMovies, isLoading } = useUpcomingMovies();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        upcomingMovies && (
          <div className="relative">
            <div
              className="relative min-h-[calc(100vh+20vh)] max-h-screen min-w-screen bg-cover  bg-no-repeat p-screen-gutter bg-center"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${upcomingMovies[indexMovie]?.backdrop_path}")`,
              }}
            >
              <div className="flex my-20 md:my-40 justify-between relative flex-col md:flex-row gap-10 lg:gap-0">
                <MovieDetails array={upcomingMovies} indexMovie={indexMovie} />
                <HighlightCard
                  movies={upcomingMovies}
                  setIndexMovie={setIndexMovie}
                  indexMovie={indexMovie}
                />
              </div>
              <GradientOverlay />
            </div>
          </div>
        )
      )}
    </>
  );
};
