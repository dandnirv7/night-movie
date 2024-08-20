import { HeroSection } from "@/components/hero-section/HeroSection";
import CardFilter from "@/components/filter-section/CardFilter";
import { CardPopularMovies } from "@/components/card-popular/CardPopularMovies";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CardFilter />
      <CardPopularMovies />
    </>
  );
}
