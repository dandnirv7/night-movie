import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Params } from "react-router-dom";

type DetailMoviesProps = {
  query: Readonly<Params<string>> | string | undefined;
};

export const useDetailMovies = ({ query }: DetailMoviesProps) => {
  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      const detailMoviesResponse = await axiosInstance.get(
        `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      );
      return detailMoviesResponse.data.results;
    },
    refetchOnWindowFocus: false,
  });
};
