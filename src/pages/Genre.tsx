import LoadingSpinner from "@/components/elements/LoadingSpinner";
import GenreCard from "@/components/fragments/GenreCard";
import MovieGrid, { MovieGridItem } from "@/components/fragments/MovieGrid";
import Pagination from "@/components/fragments/Pagination";
import { useDiscoverMovieByGenres } from "@/features/discover/fetchDiscover";
import { useGenreMovies } from "@/features/genres/fetchGenres";
import { GenreType } from "@/types/types";
import { useParams } from "react-router-dom";

export const Genre: React.FC = () => {
  const { data: genreMovies } = useGenreMovies();

  return (
    <LoadingSpinner isLoading={!genreMovies}>
      <main className="flex flex-col items-start justify-center min-h-screen p-5 lg:flex-col gap-y-10 gap-x-10 md:py-28 md:px-12">
        <h1 className="text-3xl font-semibold border-b border-b-zinc-600 w-full pb-4">
          List Genre
        </h1>
        <section className="grid w-full grid-cols-12 gap-6 place-items-center">
          {genreMovies?.map((genre) => (
            <GenreCard key={genre.name} genre={genre.name as GenreType} />
          ))}
        </section>
      </main>
    </LoadingSpinner>
  );
};

export const DetailGenre: React.FC = () => {
  const { genreId, pageNumber } = useParams<{
    genreId: string;
    pageNumber: string;
  }>();
  const { data: genreMovies, isLoading: isGenreLoading } = useGenreMovies();

  const selectedGenre = genreMovies?.find(
    (genre) => genre.name.toLowerCase() === genreId
  );
  const selectedId = selectedGenre?.id || 0;
  const page = parseInt(pageNumber || "1");

  const { data: moviesData, isLoading: isMoviesLoading } =
    useDiscoverMovieByGenres(selectedId, page);

  const movies = moviesData?.results as unknown as MovieGridItem[];
  const isLoading = isGenreLoading || isMoviesLoading;

  return (
    <LoadingSpinner isLoading={isLoading}>
      <main className="flex flex-col items-center justify-center min-h-screen p-10 gap-y-10 md:py-28 md:px-10">
        <MovieGrid
          movieGridData={movies}
          sliceCount={20}
          title={genreId}
          type="movies"
          isPopular
        />
        <Pagination type="genre" genreName={genreId} />
      </main>
    </LoadingSpinner>
  );
};
