import { formatDate, truncateDesimal } from "@/lib/utils";
import { Card, Divider, Image } from "@nextui-org/react";
import { FaUserCircle } from "react-icons/fa";
import StarList from "./Starlist";
import { Movie, Series, DetailProps } from "@/types/types";

const DetailSection = <T extends Movie | Series>({
  details,
  type,
}: DetailProps<T> & { type: "movie" | "series" }) => {
  const networkName =
    Array.isArray(details?.networks) && details?.networks.length > 0
      ? details?.networks[0].name
      : "Unknown Network";

  return (
    <section className="flex flex-col gap-3 md:gap-6">
      <div className="flex flex-row gap-3 md:gap-5">
        <Image
          shadow="sm"
          radius="sm"
          loading="lazy"
          alt={type === "movie" ? details?.original_title : details?.name}
          src={`https://image.tmdb.org/t/p/original/${details?.poster_path}`}
          className="w-40 h-40 cursor-pointer md:w-52 md:h-60 object-cover"
        />
        <aside className="flex flex-col w-full gap-2">
          <div>
            <h1 className="text-xl font-semibold md:text-3xl">
              {type === "movie" ? details?.title : details?.name}
            </h1>
            <p className="text-xs md:text-base">{details?.tagline}</p>
          </div>
          <div className="flex flex-row gap-2 md:gap-5">
            <p className="text-xs font-semibold text-zinc-500 md:text-sm">
              {type === "movie"
                ? formatDate(details?.release_date)
                : formatDate(details?.first_air_date)}
            </p>
            <p className="text-xs font-semibold text-zinc-500 md:text-sm">
              {type === "movie"
                ? details?.origin_country[0]
                : details?.origin_country}
            </p>
            {type === "series" && (
              <p className="text-xs font-semibold text-primary md:text-sm">
                {networkName}
              </p>
            )}
            {type === "movie" && (
              <p className="text-xs font-semibold text-zinc-500 md:text-sm">
                {details?.runtime} Min.
              </p>
            )}
          </div>
          <Divider className="hidden md:block bg-zinc-800" />
          <div className="flex-row items-center hidden gap-3 md:flex">
            <Card className="p-4 min-w-14 min-h-14 bg-gunmetal" radius="sm">
              <h1 className="text-lg font-bold text-center">
                {truncateDesimal(details?.vote_average)}
              </h1>
            </Card>
            <div className="flex flex-col gap-2">
              <StarList vote_average={details.vote_average} />
              <div className="flex flex-row gap-1">
                <FaUserCircle />
                <p className="text-xs text-zinc-400">
                  {details?.vote_count} votes
                </p>
              </div>
            </div>
          </div>
          <Divider className="bg-zinc-800" />
          <div className="flex flex-row flex-wrap gap-2">
            {details?.genres.map((genre, index) => (
              <div key={genre.id} className="flex flex-row items-center gap-2">
                <span className="text-sm">{genre.name}</span>
                {index < details?.genres.length - 1 && (
                  <Divider orientation="vertical" className="h-4 bg-zinc-700" />
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
      {details?.overview && (
        <div className="mt-5 space-y-2">
          <h1 className="text-xl md:text-2xl">Synopsis</h1>
          <p className="text-xs text-zinc-400 md:text-sm">
            {details?.overview}
          </p>
        </div>
      )}
    </section>
  );
};

export default DetailSection;
