import { useTopRatedMovies } from "@/features/fetchTopRatedMovies";
import { useState, useEffect } from "react";

export const useRandomTopRatedMovieId = () => {
  const { data: topRatedMovies, isLoading } = useTopRatedMovies();
  const [randomMovieId, setRandomMovieId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && topRatedMovies?.length) {
      const randomId =
        topRatedMovies[Math.floor(Math.random() * topRatedMovies.length)].id;
      setRandomMovieId(randomId);
    }
  }, [topRatedMovies, isLoading]);

  return {
    randomMovieId,
  };
};
