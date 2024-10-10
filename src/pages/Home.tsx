import { HeroSection } from "@/components/hero-section/HeroSection";
import { CardPopularMovies } from "@/components/card-popular/CardPopularMovies";
import CardCarousel from "@/components/fragments/CardCarousel";
import { HighlightMovie } from "@/components/highlight-section/HighlightMovie";

import { useUpcomingMovies } from "@/features/fetchUpcomingMovies";
import { usePopularMovies } from "@/features/movies/fetchPopularMovies";
import { usePopularCast } from "@/features/fetchCast";
import { useAiringToday } from "@/features/fetchAiringToday";
import {
  useDiscoverAction,
  useDiscoverAnime,
} from "@/features/discover/fetchDiscover";
import CardFilter from "@/components/filter-section/CardFilter";

export default function HomePage() {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-CA").format(currentDate);
  const currentYear = currentDate.getFullYear();

  const { data: upcomingMovies } = useUpcomingMovies();
  const { data: popularMovies } = usePopularMovies();
  const { data: newSeries } = useAiringToday(formattedDate, currentYear);
  const { data: animeListData } = useDiscoverAnime();
  const { data: actionListData } = useDiscoverAction();
  const { data: cast } = usePopularCast();

  const animeList = animeListData?.results;
  const actionList = actionListData?.results;
  return (
    <main className="flex flex-col gap-y-12 md:gap-y-20">
      <HeroSection />
      <CardFilter />
      <CardPopularMovies />
      <CardCarousel
        type="movies"
        movieData={upcomingMovies}
        title="New Movies"
        link="/movies"
      />
      <CardCarousel
        type="movies"
        movieData={popularMovies}
        title="The Most Visited"
        link="/movies"
      />
      <HighlightMovie />
      <CardCarousel
        type="series"
        movieData={newSeries}
        title="New Series"
        link="/series"
      />
      <CardCarousel
        type="series"
        movieData={animeList ?? []}
        title="Anime"
        link="/genre/anime"
      />
      <CardCarousel
        type="movies"
        movieData={actionList ?? []}
        title="Action"
        link="/genre/action"
      />
      <HighlightMovie />
      <CardCarousel type="cast" movieData={cast} title="Cast" link="/cast" />
    </main>
  );
}
