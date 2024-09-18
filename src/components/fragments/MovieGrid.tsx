import { formatDate, getYear, slugifyTitle } from "@/lib/utils";
import type { MovieGridProps } from "@/types/types";
import { Divider, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

const MovieGrid: React.FC<MovieGridProps> = ({
  type,
  array,
  title,
  sliceCount,
  isPopular,
}) => {
  const slug = (item: { title: string; name: string; original_name: string }) =>
    slugifyTitle(item.title || item.name || item.original_name);

  const filteredMovies = array?.filter((movie) => {
    const year = new Date(movie.first_air_date).getFullYear();
    return year > 2000;
  });

  const getBasePath =
    type === "movies" ? "/movies/" : type === "series" ? "/series/" : "/cast/";

  return (
    <main className="flex-col space-y-10">
      {title && <h1 className="text-3xl font-bold">{title}</h1>}
      <ul
        className={`grid h-full ${
          isPopular
            ? "grid-cols-3 md:grid-cols-5"
            : "grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        } grid-rows-1 gap-3 md:gap-4 lg:gap-6`}
      >
        {filteredMovies?.slice(0, sliceCount).map((item) => (
          <li key={item.id} className="grid grid-rows-1 list-none">
            <Link to={`${getBasePath}${slug(item)}`}>
              <Image
                shadow="sm"
                radius="lg"
                alt={item.title || item.name || item.original_name || ""}
                src={
                  type === "cast"
                    ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                    : `https://image.tmdb.org/t/p/original/${item.poster_path}`
                }
                isZoomed
                loading="lazy"
              />
            </Link>
            <h1 className="w-full mt-2 text-xs font-semibold truncate md:text-base hover:text-lavender-orchid">
              <Link to={`${getBasePath}${slug(item)}`}>
                {item.title || item.name || item.original_name || ""}
              </Link>
            </h1>
            <p className="text-[.65rem] md:text-sm leading-4 text-white/50">
              {isPopular
                ? getYear(item.release_date) ||
                  getYear(item.first_air_date) ||
                  (item.popularity ? `Popularity: ${item.popularity}` : "")
                : formatDate(item.release_date) ||
                  formatDate(item.first_air_date) ||
                  (item.popularity ? `Popularity: ${item.popularity}` : "")}
            </p>
          </li>
        ))}
      </ul>
      <Divider className="bg-zinc-600" />
    </main>
  );
};

export default MovieGrid;
