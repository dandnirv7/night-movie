import AccordionAllSeasons from "@/components/detail-pages/AccordionAllSeasons";
import DetailCast from "@/components/detail-pages/DetailCast";
import DetailSection from "@/components/detail-pages/DetailSection";
import DetailSeriesSection from "@/components/detail-pages/DetailSeriesSection";
import LoadingSpinner from "@/components/elements/LoadingSpinner";
import CardCarousel from "@/components/fragments/CardCarousel";
import MovieGrid from "@/components/fragments/MovieGrid";
import Pagination from "@/components/fragments/Pagination";
import Reviews from "@/components/fragments/Reviews";
import { useAiringToday } from "@/features/fetchAiringToday";
import {
  useDiscoverKoreanSeries,
  useOnTheAirSeries,
} from "@/features/discover/fetchDiscover";
import {
  useAllSeasons,
  useCreditsSeries,
  useDetailSeries,
  useRelatedSeries,
  useReviewsSeries,
  useSearchSeries,
  useSeriesVideos,
} from "@/features/series/fetchDetailSeries";
import { useYoutube } from "@/hooks/useYoutube";
import { findDirector, findVideos } from "@/lib/utils";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

export const Series = () => {
  const { pageNumber } = useParams();
  const page = Number(pageNumber) || 1;

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-CA").format(currentDate);
  const currentYear = currentDate.getFullYear();

  const { data: popularSeriesData, isLoading: isPopularLoading } =
    useDiscoverKoreanSeries();
  const { data: onTheAirData, isLoading: isNowPlayingLoading } =
    useOnTheAirSeries(formattedDate, page);

  const popularSeries = popularSeriesData?.results;
  const onTheAir = onTheAirData?.results;

  const { data: airingToday, isLoading: isAiringLoading } = useAiringToday(
    formattedDate,
    currentYear
  );

  const isLoading = isPopularLoading || isNowPlayingLoading || isAiringLoading;

  return (
    <LoadingSpinner isLoading={isLoading}>
      <main className="flex flex-col items-center p-6 space-y-10 md:py-28 md:px-10">
        <MovieGrid
          type="series"
          array={popularSeries}
          title="Popular Series"
          sliceCount={15}
          isPopular
        />
        <MovieGrid
          type="series"
          array={airingToday}
          title="Airing Today"
          sliceCount={18}
        />
        <MovieGrid
          type="series"
          array={onTheAir}
          title="On The Air"
          sliceCount={18}
        />
        <Pagination type="series" />
      </main>
    </LoadingSpinner>
  );
};

export const DetailSeries = () => {
  const { seriesId } = useParams();
  const { data: searchResults, isLoading: isSearchLoading } =
    useSearchSeries(seriesId);

  const { opts } = useYoutube({ detail: true, auto_play: 0 });

  const selectedSeriesId =
    searchResults && searchResults.length > 0 ? searchResults[0]?.id : null;

  const { data: detailSeries, isLoading: isDetailLoading } =
    useDetailSeries(selectedSeriesId);

  const { data: seriesVideos, isLoading: isSeriesLoading } =
    useSeriesVideos(selectedSeriesId);

  const { data: relatedSeries, isLoading: isRelatedLoading } =
    useRelatedSeries(selectedSeriesId);

  const { data: reviewsSeries, isLoading: isReviewsLoading } =
    useReviewsSeries(selectedSeriesId);

  const { data: creditsSeries, isLoading: isCreditsLoading } =
    useCreditsSeries(selectedSeriesId);

  const numberOfSeasons = detailSeries?.number_of_seasons;

  const { data: allSeasons = [], isLoading: isSeasonsLoading } = useAllSeasons(
    selectedSeriesId,
    numberOfSeasons
  );

  const isLoading =
    isSearchLoading ||
    isDetailLoading ||
    isSeriesLoading ||
    isRelatedLoading ||
    isReviewsLoading ||
    isCreditsLoading ||
    isSeasonsLoading;

  return (
    <LoadingSpinner isLoading={isLoading}>
      {searchResults ? (
        <main className="flex flex-col min-h-screen p-5 gap-14 md:px-10 md:py-28 md:gap-20">
          <YouTube
            videoId={findVideos(seriesVideos)?.key}
            opts={opts}
            className="flex items-center justify-center"
          />
          <DetailSection details={detailSeries} type="series" />

          <DetailCast
            detailCast={creditsSeries?.cast ?? []}
            crews={findDirector(creditsSeries?.crew) ?? []}
          />

          <DetailSeriesSection detailSeries={detailSeries} />

          <section className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold md:text-2xl">
              Seasons and Episodes
            </h1>

            <AccordionAllSeasons allSeasons={allSeasons} />
          </section>

          <CardCarousel
            data={relatedSeries}
            title="Related Series"
            type="series"
          />

          <Reviews reviews={reviewsSeries} />
        </main>
      ) : (
        <div>No data available.</div>
      )}
    </LoadingSpinner>
  );
};
