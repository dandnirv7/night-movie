import { Card, CardBody, Spinner } from "@nextui-org/react";

import { useAiringToday, useDetailMovies } from "@/features/fetchAiringToday";
import { DaySelector } from "@/components/card-popular/DaySelector";
import { MainMovieDisplay } from "@/components/card-popular/MainMovieDisplay";
import { MovieCard } from "@/components/card-popular/MovieCard";

export const CardPopularMovies = () => {
  const { data: airingToday, isLoading: isAiringTodayLoading } =
    useAiringToday();
  const { data: detailMovies, isLoading: isDetailMoviesLoading } =
    useDetailMovies(airingToday);

  if (isAiringTodayLoading || isDetailMoviesLoading) {
    return <Spinner />;
  }

  const today: number = (new Date().getDay() + 1) % 7;

  return (
    <div className="mx-10">
      <Card className="relative bg-[#202020] min-w-full rounded-3xl mt-20 md:p-8 p-4">
        <CardBody className="grid grid-flow-row grid-rows-1 lg:grid-flow-col lg:gap-x-4 gap-y-6">
          <p className="w-full px-5 py-5 font-bold text-center bg-purple-gem rounded-2xl lg:hidden">
            Airing Today
          </p>
          <DaySelector today={today} />
          <div className="flex flex-col items-center gap-y-10 lg:gap-x-5 lg:flex-row">
            <MainMovieDisplay movie={airingToday[0]} />
            <div className="grid grid-cols-2 grid-rows-2 gap-8 text-center md:grid-cols-3 lg:gap-4 lg:w-9/12 lg:order-1">
              {detailMovies
                ?.slice(1, 7)
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
