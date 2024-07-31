import { axiosInstance } from "@/lib/axios";

export const upcomingMovies = async () => {
  const { data } = await axiosInstance.get(
    "/movie/upcoming?language=en-US&page=1"
  );
  return data?.results;
};
