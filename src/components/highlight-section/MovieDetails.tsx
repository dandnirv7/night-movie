import { MovieTags } from "@/components/highlight-section/MovieTags";
import { MovieOverview } from "@/components/highlight-section/MovieOverview";
import { MovieActions } from "@/components/highlight-section/MovieActions";

import type { MovieDetailsProps } from "@/types/highlightSection";

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  highlightMovie,
  listStars,
  videoId,
}) => (
  <div className="absolute z-10 w-4/5 space-y-4 -translate-y-1/2 md:w-1/2 md:space-y-8 lg:space-y-10 top-1/2 left-10">
    <h1 className="text-4xl font-bold text-white md:text-5xl">
      {highlightMovie?.title}
    </h1>
    <MovieTags genres={highlightMovie?.genres} stars={listStars?.cast} />
    <MovieOverview overview={highlightMovie?.overview} />
    <MovieActions videoId={videoId} title={highlightMovie?.title} />
  </div>
);
