import React from "react";
import { formatDate } from "@/lib/utils";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import { Star } from "lucide-react";
import type { AllSeasonsProps } from "@/types/types";

const AccordionAllSeasons: React.FC<AllSeasonsProps> = ({ allSeasons }) => (
  <Accordion
    selectionMode="multiple"
    itemClasses={{
      title: "text-white",
      base: "bg-black -mx-2 ",
      content: "bg-gunmetal",
      trigger: "pr-5",
    }}
    defaultExpandedKeys={[`${allSeasons.length}`]}
  >
    {allSeasons
      .slice()
      .reverse()
      .map((seasonGroup) => (
        <AccordionItem
          key={seasonGroup.season_number}
          aria-label={`Season ${seasonGroup.season_number}`}
          title={
            <div className="grid grid-cols-12 place-items-center">
              <p className="col-span-4 font-semibold md:col-span-1">
                {seasonGroup.season_number}
              </p>
              <p className="w-full col-span-3 text-sm font-semibold md:col-span-1">
                Season {seasonGroup.season_number}
              </p>
              <p className="w-full col-span-5 text-xs md:px-5 md:col-span-10 text-zinc-500">
                {formatDate(seasonGroup.air_date)}
              </p>
            </div>
          }
          indicator={
            <div className="flex-row items-start justify-between hidden w-12 gap-2 md:flex">
              <Star fill="orange" stroke="orange" className="w-full" />
              <span className="w-full font-semibold">
                {seasonGroup.vote_average}
              </span>
            </div>
          }
          disableIndicatorAnimation
        >
          {seasonGroup.episodes.length !== 0 ? (
            <>
              {seasonGroup.episodes.slice(0, 51).map((episode, index) => (
                <div
                  key={episode.id}
                  className={`grid grid-cols-12 py-2 ${
                    index === 0 ? "pt-0" : "border-t border-white/40"
                  } place-content-center place-items-center`}
                >
                  <div className="col-span-3 md:col-span-1">
                    <Image
                      shadow="sm"
                      radius="none"
                      loading="lazy"
                      alt={episode.name}
                      src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                      className="object-cover cursor-pointer"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <h1>
                      {episode.season_number} - {episode.episode_number}
                    </h1>

                    <p
                      className={`text-xs text-zinc-500 ${episode.runtime ? "block" : "hidden"}`}
                    >
                      {episode.runtime} Min.
                    </p>
                  </div>
                  <div className="w-full col-span-6 px-5 border-l md:col-span-10 border-white/40">
                    <h1 className="line-clamp-1 md:line-clamp-none">
                      {episode.name}
                    </h1>
                    <p className="text-xs text-zinc-500">
                      {formatDate(episode.air_date)}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-sm font-semibold text-center text-zinc-500">
              No data available.
            </p>
          )}
        </AccordionItem>
      ))}
  </Accordion>
);

export default AccordionAllSeasons;
