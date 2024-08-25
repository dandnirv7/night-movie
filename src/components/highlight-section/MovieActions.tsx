import { Link } from "react-router-dom";

import { slugifyTitle } from "@/lib/utils";
import { YoutubeModal } from "@/components/YoutubeModal";
import type { MovieActionsProps } from "@/types/highlightSection";

export const MovieActions: React.FC<MovieActionsProps> = ({
  videoId,
  title,
}) => (
  <div className="flex flex-row items-center gap-5">
    <YoutubeModal videoId={videoId ?? ""} text="Play Online" />
    <Link to={`/movies/${slugifyTitle(title ?? "")}`}>
      <p className="text-sm md:text-xl text-inherit hover:text-lavender-orchid">
        More Details
      </p>
    </Link>
  </div>
);
