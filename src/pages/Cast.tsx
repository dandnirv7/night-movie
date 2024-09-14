import React from "react";
import { Link, useParams } from "react-router-dom";

import { Card, CardFooter, Image, Spinner } from "@nextui-org/react";

import {
  useDetailCast,
  usePopularCast,
  useTrendingCast,
} from "@/features/fetchCast";
import { getYear, slugifyTitle } from "@/lib/utils";
import { CastItems } from "@/types/types";

import MovieGrid from "@/components/fragments/MovieGrid";
import Pagination from "@/components/fragments/Pagination";

export const Cast: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();

  const page = Number(pageNumber) || 1;

  const { data: trendingCast } = useTrendingCast();
  const { data: popularCast, isLoading: isPopularCastLoading } =
    usePopularCast(page);

  return (
    <>
      {isPopularCastLoading ? (
        <Spinner
          className="w-screen h-screen"
          label="Loading ..."
          color="danger"
          labelColor="danger"
          size="lg"
        />
      ) : (
        <main className="flex flex-col items-center p-6 space-y-10 lg:p-10">
          <MovieGrid
            type="cast"
            array={trendingCast}
            title="Trending Cast"
            sliceCount={15}
            isPopular
          />
          <MovieGrid
            type="cast"
            array={popularCast}
            title="Popular Cast"
            sliceCount={18}
          />
          <Pagination type="cast" />
        </main>
      )}
    </>
  );
};

export const DetailCast: React.FC = () => {
  const { castId } = useParams<{ castId: string }>();
  const { data, isLoading } = useDetailCast(castId);

  const slug = (item: {
    title?: string;
    name?: string;
    original_name?: string;
  }) => slugifyTitle(item.title || item.name || item.original_name || "");

  const getBasePath = (mediaType: string) => {
    switch (mediaType) {
      case "movie":
        return "/movies/";
      case "tv":
        return "/series/";
      default:
        return "/cast/";
    }
  };

  if (isLoading) {
    return (
      <Spinner
        className="w-screen h-screen"
        label="Loading ..."
        color="danger"
        labelColor="danger"
        size="lg"
      />
    );
  }

  if (!data || !data[0]) {
    return <div>No data available</div>;
  }

  const castData = data[0] as CastItems;

  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen p-10 lg:flex-row gap-y-10 gap-x-10 bg-gunmetal">
        <section className="lg:w-1/2">
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-fit h-fit"
            shadow="lg"
          >
            <Image
              alt={castData.name}
              height={400}
              width={400}
              className="object-cover"
              src={`https://image.tmdb.org/t/p/original/${castData.profile_path}`}
              loading="lazy"
            />
            <CardFooter className="absolute bottom-0 z-10 flex-col justify-between gap-1 py-1 pb-2 overflow-hidden text-center lg:block bg-white/40 before:bg-white/40 before:rounded-xl shadow-small">
              <p className="text-xl font-semibold md:text-2xl text-slate-900/80">
                {castData.name}
              </p>
              <div>
                <p className="text-xs font-semibold text-center md:text-sm text-slate-900/80">
                  Department: {castData.known_for_department}
                </p>
                <p className="text-xs font-semibold text-center md:text-sm text-slate-900/80">
                  Popularity: {castData.popularity}
                </p>
              </div>
            </CardFooter>
          </Card>
        </section>

        <aside className="flex flex-col items-center w-full gap-6 md:gap-10">
          <h2 className="text-3xl font-bold md:text-5xl lg:text-4xl">
            Career Highlights
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-x-6 place-items-center">
            {castData.known_for.map((item) => (
              <li
                key={item.id}
                className="flex flex-col justify-between h-full"
              >
                <Link to={`${getBasePath(item.media_type)}${slug(item)}`}>
                  <Image
                    shadow="sm"
                    radius="lg"
                    alt={item.title || item.name || item.original_name}
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    isZoomed
                    loading="lazy"
                    className="object-cover"
                  />
                </Link>
                <footer>
                  <p className="mt-2 text-xs font-semibold truncate w-fit md:text-base hover:text-lavender-orchid">
                    <Link to={`${getBasePath(item.media_type)}${slug(item)}`}>
                      {item.title || item.name || item.original_name}
                    </Link>
                  </p>
                  <p className="text-[.6rem] md:text-sm leading-4 text-white/50">
                    {getYear(item.release_date) || getYear(item.first_air_date)}
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
};
