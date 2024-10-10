import { useSearch } from "@/hooks/useSearch";
import { slugifyTitle, toDate, truncateDesimal } from "@/lib/utils";
import { Card, CardBody, Divider, Image, Input, Link } from "@nextui-org/react";
import { Search as SearchIcon, Star } from "lucide-react";
import React, { FormEvent } from "react";
import { useParams } from "react-router-dom";

const Search: React.FC = () => {
  const { searchMovie } = useParams<{ searchMovie: string }>();

  const { isMediaTypeKey, getMediaType, sortedResults, query, setQuery } =
    useSearch(searchMovie || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      window.location.href = `/search/${query}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  console.log(sortedResults);

  return (
    <div>
      <main className="relative flex flex-col min-h-screen gap-5 p-5 md:gap-8 md:py-32 md:px-20 lg:p-40 min-w-screen dark">
        <div className="flex flex-col gap-3">
          <h1 className="w-full pl-2 text-xl font-semibold border-l-3 border-purple-gem">
            Results found: {searchMovie}
          </h1>
          <Input
            value={query}
            onValueChange={setQuery}
            onKeyDown={handleKeyDown}
            label={
              <div className="flex items-center gap-2">
                <SearchIcon color="gray" />
                <span className="text-xl text-neutral-500">Search...</span>
              </div>
            }
            radius="sm"
            classNames={{
              base: "w-full hidden lg:block",
              label: "text-black/50 dark:text-white/90 mb-4",
              input: [
                "bg-charcoal-gray rounded-lg p-2.5 mb-2",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              inputWrapper: ["shadow-xl", "h-28 flex flex-col px-6"],
            }}
            placeholder="Type to search..."
          />
        </div>
        {sortedResults?.length === 0 ? (
          <>
            <h1 className="text-2xl font-semibold md:text-3xl text-zinc-500">
              Sorry, the Movie or TV series "{searchMovie}" is currently not
              available.
            </h1>
          </>
        ) : (
          <Card className="w-full dark" radius="sm">
            {sortedResults.map((searchItem) => (
              <CardBody key={searchItem.id}>
                <div className="flex flex-row gap-5 py-2 mb-3">
                  <div className="relative">
                    <div className="absolute z-[20] flex justify-end w-full">
                      <p
                        className={`${searchItem.media_type === "movie" ? "bg-red-500" : "bg-green-500"} w-fit text-xs px-1.5`}
                      >
                        {searchItem.media_type === "movie" ? "Movie" : "TV"}
                      </p>
                    </div>
                    <Image
                      alt={searchItem.title || searchItem.name || "unknown"}
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/original/${searchItem.poster_path}`}
                      width={100}
                      radius="none"
                      isZoomed
                      className="hover:cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 md:gap-3">
                    <Link
                      href={`/${isMediaTypeKey(searchItem.media_type) ? getMediaType(searchItem.media_type) : "unknown"}/${slugifyTitle(searchItem.title || searchItem.name || "unknown")}`}
                      className="block space-y-2"
                    >
                      <p className="text-sm font-semibold md:text-base">
                        {searchItem.title || searchItem.name}
                        <span className="ml-2 font-semibold">
                          {`(${toDate(searchItem.release_date || searchItem.first_air_date)})`}
                        </span>
                      </p>
                      <div className="flex flex-row items-center gap-1">
                        <Star
                          color="orange"
                          fill="orange"
                          className="size-5 md:size-5"
                        />
                        <p className="text-sm font-semibold text-gray-400 md:text-base">
                          {truncateDesimal(searchItem.vote_average)}
                        </p>
                      </div>
                    </Link>
                    <p className="text-xs line-clamp-5 md:line-clamp-3 lg:line-clamp-1 md:text-sm text-zinc-500">
                      {searchItem.overview}
                    </p>
                  </div>
                </div>
                <Divider />
              </CardBody>
            ))}
          </Card>
        )}
      </main>
    </div>
  );
};

export default Search;
