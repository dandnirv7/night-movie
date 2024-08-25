import type { MovieOverviewProps } from "@/types/highlightSection";

export const MovieOverview: React.FC<MovieOverviewProps> = ({ overview }) => (
  <p className="text-sm text-white md:text-xl lg:w-3/5 ">{overview}</p>
);
