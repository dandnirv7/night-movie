import { useParams, Params } from "react-router-dom";
import { Card as CardUINext, Image } from "@nextui-org/react";
import { useDetailMovies } from "@/features/movies/fetchDetailMovies";

const Movies = () => {
  const { moviesId }: Readonly<Params<string>> = useParams();
  const { data, isLoading } = useDetailMovies({ query: moviesId });

  return (
    <div>
      {isLoading ? (
        <>loading</>
      ) : (
        <>
          <h1>{data[0]?.title}</h1>
          <CardUINext shadow="sm">
            <Image
              shadow="sm"
              radius="lg"
              loading="lazy"
              alt={data[0]?.original_title}
              src={`https://image.tmdb.org/t/p/original/${data[0]?.poster_path}`}
              className="cursor-pointer"
            />
          </CardUINext>
        </>
      )}
    </div>
  );
};

export default Movies;
