import {
  filteredSuggestions,
  slugifyTitle,
  toDate,
  truncateDesimal,
} from "@/lib/utils";
import { Card, CardBody, Image } from "@nextui-org/react";
import { Star } from "lucide-react";
import { SuggestionCardItem } from "./types";
import { useSearch } from "@/hooks/useSearch";

const SuggestionCard: React.FC<{
  suggestions: SuggestionCardItem[];
  query: string;
}> = ({ suggestions, query }) => {
  const { isMediaTypeKey, getMediaType } = useSearch();

  return (
    <Card
      className="absolute w-full lg:mt-4 dark top-12 lg:w-1/4 lg:right-0"
      radius="sm"
    >
      {filteredSuggestions(suggestions)
        ?.slice(0, 6)
        .map((suggestionItem) => (
          <CardBody key={suggestionItem.id}>
            <div className="flex flex-row gap-5 pb-3 border-b border-zinc-500">
              <a
                href={`/${suggestionItem.media_type}/${slugifyTitle(suggestionItem.title || suggestionItem.name || "unknown")}`}
                className="flex-shrink-0"
              >
                <Image
                  width={60}
                  radius="sm"
                  alt={
                    suggestionItem?.title || suggestionItem?.name || "Unknown"
                  }
                  loading="lazy"
                  src={`https://image.tmdb.org/t/p/original/${suggestionItem?.poster_path}`}
                />
              </a>
              <a
                href={`/${isMediaTypeKey(suggestionItem.media_type) ? getMediaType(suggestionItem.media_type) : "unknown"}/${slugifyTitle(suggestionItem.title || suggestionItem.name || "unknown")}`}
                className="flex flex-col w-full gap-1 overflow-hidden h-fit"
              >
                <p className="truncate text-sm">
                  {suggestionItem.name ||
                    suggestionItem.title ||
                    suggestionItem.original_name ||
                    "Unknown Title"}
                  <span className="ml-2 text-xs">
                    {`( ${toDate(suggestionItem.release_date || suggestionItem.first_air_date || "")})`}
                  </span>
                </p>
                <div className="flex flex-row items-center gap-1">
                  <Star color="orange" fill="orange" size={16} />
                  <p className="text-xs text-gray-400">
                    {truncateDesimal(suggestionItem.vote_average)}
                  </p>
                </div>
              </a>
            </div>
          </CardBody>
        ))}
      {(suggestions ?? []).length !== 0 && (
        <a
          href={`/search/${query}`}
          className="flex items-center justify-center mb-5"
        >
          <p className="text-sm italic text-center text-lavender-orchid">
            View all results
          </p>
        </a>
      )}
    </Card>
  );
};

export default SuggestionCard;
