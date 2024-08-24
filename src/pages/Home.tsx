import { HeroSection } from "@/components/hero-section/HeroSection";
import CardFilter from "@/components/filter-section/CardFilter";
import { CardPopularMovies } from "@/components/card-popular/CardPopularMovies";
import { CardCarousel } from "@/components/fragments/CardCarousel";
import { useUpcomingMovies } from "@/features/fetchUpcomingMovies";
import { usePopularMovies } from "@/features/movies/fetchPopularMovies";

export default function HomePage() {
  const { data: upcomingMovies } = useUpcomingMovies();
  const { data: popularMovies } = usePopularMovies();

  return (
    <>
      <HeroSection />
      <CardFilter />
      <CardPopularMovies />
      <CardCarousel data={upcomingMovies} title={"New Movies"} />
      <CardCarousel data={popularMovies} title={"The Most Visited"} />
    </>
  );
}
