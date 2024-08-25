import { HeroSection } from "@/components/hero-section/HeroSection";
import CardFilter from "@/components/filter-section/CardFilter";
import { CardPopularMovies } from "@/components/card-popular/CardPopularMovies";
import { CardCarousel } from "@/components/fragments/CardCarousel";
import { HighlightMovie } from "@/components/highlight-section/HighlightMovie";

import { useUpcomingMovies } from "@/features/fetchUpcomingMovies";
import { usePopularMovies } from "@/features/movies/fetchPopularMovies";
import { useNewSeries } from "@/features/fetchNewSeries";

export default function HomePage() {
  const { data: upcomingMovies } = useUpcomingMovies();
  const { data: popularMovies } = usePopularMovies();
  const { data: newSeries } = useNewSeries();

  return (
    <main className="flex flex-col gap-y-12 md:gap-y-20">
      <HeroSection />
      <CardFilter />
      <CardPopularMovies />
      <CardCarousel type="movies" data={upcomingMovies} title="New Movies" />
      <CardCarousel
        type="movies"
        data={popularMovies}
        title="The Most Visited"
      />
      <HighlightMovie />
      <CardCarousel type="series" data={newSeries} title="New Series" />
      <HighlightMovie />
    </main>
  );
}
