import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { axiosInstance } from "@/lib/axios";
import { filteredSearch } from "@/lib/utils";
import { useRegions } from "@/hooks/useRegions";
import { useDebounce } from "@/hooks/useDebounce";
import { useGenreMovies, useGenreSeries } from "@/hooks/useGenres";
import type { FormData } from "@/types/filterSection";

export const useCardFilter = (initialQuery = "") => {
  const { control, handleSubmit } = useForm();
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(
    new Set([])
  );
  const [query, setQuery] = useState(initialQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: regions } = useRegions();
  const { data: genreMovies } = useGenreMovies();
  const { data: genreSeries } = useGenreSeries();

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const years = useMemo(() => {
    return Array.from({ length: currentYear - 1980 + 1 }, (_, i) =>
      (currentYear - i).toString()
    );
  }, [currentYear]);

  const debouncedQuery = useDebounce(query, 1000);

  const { data: searchMovies, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["search-movie", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const response = await axiosInstance.get(
        `/search/movie?query=${debouncedQuery}&include_adult=false&language=en-US&page=1`
      );
      return response?.data.results;
    },
    enabled: !!debouncedQuery,
  });

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenres(new Set(e.target.value.split(",")));
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const onSubmit = useMemo(
    () => (data: FormData) => {
      const genres = Array.from(data.genre ?? []);
      const year = data.year ? data.year.toString() : "";
      const region = data.region || "";

      const isEmpty = !year && genres.length === 0 && !region;

      const filteredMovies = isEmpty
        ? searchMovies
        : filteredSearch(searchMovies, parseInt(year, 10), genres);

      console.log(filteredMovies);

      const params: Record<string, string> = {
        ...(query && { q: query }),
        ...(genres.length > 0 && { genre: genres.join("+") }),
        ...(year && { year }),
        ...(region && { region }),
      };

      setSearchParams(params);
    },
    [query, searchMovies, setSearchParams]
  );

  useEffect(() => {
    const currentQuery = searchParams.get("q");
    if (currentQuery) {
      navigate(`/search/${currentQuery}`);
    }
  }, [searchParams, navigate]);

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    selectedGenres,
    query,
    setQuery,
    years,
    regions,
    genreMovies,
    genreSeries,
    handleGenreChange,
    isLoadingSearch,
    searchMovies,
  };
};
