import { toDate, truncateDesimal } from "@/lib/utils";
import { Card, CardBody, Divider, Image, Input, Link } from "@nextui-org/react";
import { Star, Search as SearchIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import type { Key } from "react";
import { useCardFilter } from "@/hooks/useCardFilter";

const Search = () => {
  const { searchMovie } = useParams();
  const { searchMovies, setQuery, query } = useCardFilter(searchMovie);

  return (
    <div>
      <main className="p-40 min-w-screen min-h-screen relative dark">
        {/* <p>search</p> */}
        <h1 className="border-l-3 border-purple-gem w-full pr-2 text-xl font-semibold">
          Results found: {searchMovie}
        </h1>
        <Input
          label={
            <div className="flex gap-2 items-center ">
              <SearchIcon color="gray" />
              <span className="text-xl text-neutral-500">Search...</span>
            </div>
          }
          value={query}
          onValueChange={setQuery}
          radius="lg"
          classNames={{
            base: "w-full lg:w-2/3",
            label: "text-black/50 dark:text-white/90 mb-4",
            input: [
              "bg-charcoal-gray rounded-lg p-2.5 mb-2",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            inputWrapper: ["shadow-xl", "h-28 flex flex-col px-6"],
          }}
          placeholder="Type to search..."
          // endContent={
          //   isLoadingSearch && (
          //     <Spinner size="sm" className="absolute bottom-7 right-10" />
          //   )
          // }
        />
        <Card className="w-full dark">
          {searchMovies?.map(
            (movie: {
              id: Key | number;
              poster_path: string;
              title: string;
              release_date: string | Date;
              vote_average: number;
            }) => (
              <>
                <CardBody key={movie.id}>
                  <div className="mb-3 flex flex-row gap-5 items-center">
                    <Image
                      width={60}
                      alt="NextUI hero Image"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    />
                    <div>
                      <p>
                        {movie.title}
                        <span className="text-xs ml-2">
                          {`( ${toDate(movie.release_date)} )`}
                        </span>
                      </p>
                      <div className="flex flex-row gap-1 items-center">
                        <Star color="orange" fill="orange" size={20} />
                        <p className="text-gray-400">
                          {truncateDesimal(movie.vote_average)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Divider />
                </CardBody>
              </>
            )
          )}
          {/* <Divider /> */}
          {(searchMovies ?? []).length !== 0 && (
            <Link
              href="/movies"
              className="mb-5 flex items-center justify-center "
            >
              <p className="text-sm italic text-center text-lavender-orchid">
                View all results
              </p>
            </Link>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Search;
