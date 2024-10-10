import { YoutubeModal } from "@/components/fragments/YoutubeModal";
import { slugifyTitle } from "@/lib/utils";
import type { MovieActionsProps } from "@/types/highlightSection";

export const MovieActions: React.FC<MovieActionsProps> = ({
  videoId,
  title,
}) => (
  <div className="flex flex-row items-center gap-5">
    <YoutubeModal videoId={videoId ?? ""} text="Play Online" />
    <a href={`/movies/${slugifyTitle(title ?? "")}`}>
      <p className="text-sm md:text-xl text-inherit hover:text-lavender-orchid">
        More Details
      </p>
    </a>
  </div>
);
