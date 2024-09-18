import { Card, CardBody, Spinner } from "@nextui-org/react";

import { useAiringToday, useDetailMovies } from "@/features/fetchAiringToday";
import { DaySelector } from "@/components/card-popular/DaySelector";
import { MainMovieDisplay } from "@/components/card-popular/MainMovieDisplay";
import { MovieCard } from "@/components/card-popular/MovieCard";

export const CardPopularMovies = () => {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-CA").format(currentDate);
  const currentYear = currentDate.getFullYear();

  const todayIndex: number = (new Date().getDay() + 1) % 7;

  const { data: airingTodayData, isLoading: isAiringTodayDataLoading } =
    useAiringToday(formattedDate, currentYear);

  const { data: movieDetails, isLoading: isMovieDetailsLoading } =
    useDetailMovies(airingTodayData);

  if (isAiringTodayDataLoading || isMovieDetailsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Card className="relative bg-[#202020] min-w-full rounded-2xl md:rounded-3xl py-2 px-4 md:py-3 md:px-5">
        <CardBody>
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row md:gap-6">
            <p className="order-1 w-full px-5 py-5 font-bold text-center bg-purple-gem rounded-xl md:rounded-2xl lg:hidden">
              Airing Today
            </p>
            <DaySelector today={todayIndex} />
            <div className="flex flex-wrap order-3 lg:order-none">
              {movieDetails?.slice(1, 7).map((movie) => (
                <div
                  className="md:w-1/3 w-1/2 p-2.5 md:p-4 lg:p-2.5"
                  key={movie.id}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            <MainMovieDisplay movie={airingTodayData[0]} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
