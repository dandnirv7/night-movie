import LoadingSpinner from "@/components/elements/LoadingSpinner";
import MovieGrid, { MovieGridItem } from "@/components/fragments/MovieGrid";
import {
  useDiscoverMovies,
  useDiscoverSeries,
} from "@/features/discover/fetchDiscover";
import { useLocation, useSearchParams } from "react-router-dom";

const getSearchParams = (searchParams: URLSearchParams) => ({
  page: searchParams.get("page"),
  includeAdult: searchParams.get("include_adult"),
  includeVideo: searchParams.get("include_video"),
  includeFirstAirDates: searchParams.get("include_null_first_air_dates"),
  sortBy: searchParams.get("sort_by"),
  genres: searchParams.get("with_genres"),
  fromRate: searchParams.get("vote_average.gte"),
  toRate: searchParams.get("vote_average.lte"),
});

const DiscoverPage = () => {
  const { data: discoverMoviesData, isLoading: isLoadingMovies } =
    useDiscoverMovies();
  const { data: discoverSeriesData, isLoading: isLoadingSeries } =
    useDiscoverSeries();

  const discoverMovies =
    (discoverMoviesData?.results as unknown as MovieGridItem[]) || [];
  const discoverSeries =
    (discoverSeriesData?.results as unknown as MovieGridItem[]) || [];

  const isLoading = isLoadingMovies || isLoadingSeries;

  return (
    <LoadingSpinner isLoading={isLoading}>
      <main className="flex flex-col items-center p-6 space-y-10 md:py-28 md:px-10">
        <MovieGrid
          type="movies"
          movieGridData={discoverMovies}
          title="Movies"
          sliceCount={20}
          isPopular
        />
        <MovieGrid
          type="series"
          movieGridData={discoverSeries}
          title="Series"
          sliceCount={20}
          isPopular
        />
      </main>
    </LoadingSpinner>
  );
};

const DetailDiscoverPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const {
    includeAdult,
    includeVideo,
    includeFirstAirDates,
    sortBy,
    genres,
    fromRate,
    toRate,
    page,
  } = getSearchParams(searchParams);

  const { data: discoverMoviesData, isLoading: isLoadingMovies } =
    useDiscoverMovies(
      includeAdult,
      includeVideo,
      sortBy,
      genres,
      fromRate,
      toRate,
      page
    );

  const { data: discoverSeriesData, isLoading: isLoadingSeries } =
    useDiscoverSeries(
      includeAdult,
      includeFirstAirDates,
      sortBy,
      fromRate,
      genres,
      toRate,
      page
    );

  const discoverMovies =
    (discoverMoviesData?.results as unknown as MovieGridItem[]) || [];
  const discoverSeries =
    (discoverSeriesData?.results as unknown as MovieGridItem[]) || [];

  const isLoading = isLoadingMovies || isLoadingSeries;

  const hasMovies = discoverMovies.length > 0;
  const hasSeries = discoverSeries.length > 0;

  const isMoviesPage = location.pathname.includes("movie");

  return (
    <LoadingSpinner isLoading={isLoading}>
      <main className="flex flex-col items-center p-6 space-y-10 md:py-28 md:px-10">
        {isMoviesPage ? (
          hasMovies ? (
            <>
              <MovieGrid
                type="movies"
                movieGridData={discoverMovies}
                title="Movies"
                sliceCount={20}
                isPopular
              />
            </>
          ) : (
            <div className="h-[50vh] grid place-items-center w-full">
              <p>No Movies Available.</p>
            </div>
          )
        ) : hasSeries ? (
          <>
            <MovieGrid
              type="series"
              movieGridData={discoverSeries}
              title="Series"
              sliceCount={20}
              isPopular
            />
          </>
        ) : (
          <p>No Series Available.</p>
        )}
      </main>
    </LoadingSpinner>
  );
};

export { DetailDiscoverPage, DiscoverPage };
