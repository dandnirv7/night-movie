import { formatDate, getYear, slugifyTitle } from "@/lib/utils";
import { Divider, Image, Link } from "@nextui-org/react";

export type MovieGridItem = {
  id: number;
  title: string;
  name: string;
  original_name: string;
  release_date: string;
  first_air_date: string;
  popularity: string;
  profile_path: string;
  poster_path: string;
};

interface MovieGridProps {
  type: string;
  movieGridData: MovieGridItem[];
  title?: string;
  sliceCount: number;
  isPopular?: boolean;
}

type SlugItem = {
  title: string;
  name: string;
  original_name: string;
};

const MovieGrid: React.FC<MovieGridProps> = ({
  type,
  movieGridData = [],
  title,
  sliceCount,
  isPopular,
}) => {
  const slug = (item: SlugItem) =>
    slugifyTitle(item.title || item.name || item.original_name);

  const getBasePath =
    type === "movies" ? "/movies/" : type === "series" ? "/series/" : "/cast/";

  return (
    <main className="flex-col space-y-8">
      {title && (
        <div className="flex flex-row gap-2">
          <Divider
            orientation="horizontal"
            className="w-1 h-10 rounded-full bg-purple-gem"
          />
          <h1 className="text-3xl font-bold capitalize ">{title}</h1>
        </div>
      )}
      <ul
        className={`grid h-full ${
          isPopular
            ? "grid-cols-3 md:grid-cols-5"
            : "grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        } grid-rows-1 gap-3 md:gap-4 lg:gap-6`}
      >
        {movieGridData?.slice(0, sliceCount).map((item) => (
          <li key={item.id} className="grid grid-rows-1 list-none">
            <Link href={`${getBasePath}${slug(item)}`}>
              <Image
                shadow="sm"
                radius="sm"
                alt={item.title || item.name || item.original_name || ""}
                src={
                  type === "cast"
                    ? `https://image.tmdb.org/t/p/original/${item.profile_path}`
                    : `https://image.tmdb.org/t/p/original/${item.poster_path}`
                }
                className="aspect-[3/4] object-cover"
                isZoomed
                loading="lazy"
              />
            </Link>
            <a
              href={`${getBasePath}${slug(item)}`}
              className="text-white line-clamp-1 "
            >
              <h1 className="mt-2 text-xs font-semibold lg:text-base hover:text-lavender-orchid">
                {item.title || item.name || item.original_name || ""}
              </h1>
            </a>
            <p className="text-[.65rem] lg:text-sm leading-4 text-white/50">
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
