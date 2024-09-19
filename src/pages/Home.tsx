import { HeroSection } from "@/components/hero-section/HeroSection";
import CardFilter from "@/components/filter-section/CardFilter";
import { CardPopularMovies } from "@/components/card-popular/CardPopularMovies";
import CardCarousel from "@/components/fragments/CardCarousel";
import { HighlightMovie } from "@/components/highlight-section/HighlightMovie";

import { useUpcomingMovies } from "@/features/fetchUpcomingMovies";
import { usePopularMovies } from "@/features/movies/fetchPopularMovies";
import { usePopularCast } from "@/features/fetchCast";
import { useAiringToday } from "@/features/fetchAiringToday";
import { useDiscoverAction, useDiscoverAnime } from "@/features/fetchDiscover";

export default function HomePage() {
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-CA").format(currentDate);
  const currentYear = currentDate.getFullYear();

  const { data: upcomingMovies } = useUpcomingMovies();
  const { data: popularMovies } = usePopularMovies();
  const { data: newSeries } = useAiringToday(formattedDate, currentYear);
  const { data: animeList } = useDiscoverAnime();
  const { data: actionList } = useDiscoverAction();
  const { data: cast } = usePopularCast();

  return (
    <main className="flex flex-col px-5 gap-y-12 md:gap-y-20 md:px-10">
      <HeroSection />
      <CardFilter />
      <CardPopularMovies />
      <CardCarousel
        type="movies"
        data={upcomingMovies}
        title="New Movies"
        link="/movies"
      />
      <CardCarousel
        type="movies"
        data={popularMovies}
        title="The Most Visited"
        link="/movies"
      />
      <HighlightMovie />
      <CardCarousel
        type="series"
        data={newSeries}
        title="New Series"
        link="/series"
      />
      <CardCarousel
        type="series"
        data={animeList}
        title="Anime"
        link="/genre/anime"
      />
      <CardCarousel
        type="series"
        data={actionList}
        title="Action"
        link="/genre/action"
      />
      <HighlightMovie />
      <CardCarousel type="cast" data={cast} title="Cast" link="/cast" />
    </main>
  );
}
