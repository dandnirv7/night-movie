import React from "react";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import type { DetailCastProps } from "@/types/types";

const DetailCast: React.FC<DetailCastProps> = ({ detailCast, crews }) => {
  const crew = Array.isArray(crews) && crews.length > 0 ? crews[0] : undefined;

  return (
    <section className="flex flex-col items-start justify-center gap-4">
      <Accordion
        selectionMode="multiple"
        itemClasses={{
          title: "text-white text-xl font-semibold md:text-2xl",
          base: "-mx-2",
          content: "bg-gunmetal",
          trigger: "pr-5",
        }}
      >
        <AccordionItem key="director" aria-label="director" title="Director">
          {crew ? (
            <div className="flex flex-col w-full gap-4 px-2 md:w-1/3 border-white/30">
              <div className="flex flex-row items-center gap-4">
                <Image
                  shadow="sm"
                  radius="none"
                  width={64}
                  height={64}
                  alt={crew.name || crew.original_name || "Director"}
                  src={
                    crew.profile_path
                      ? `https://image.tmdb.org/t/p/original/${crew.profile_path}`
                      : "/path/to/default/image.jpg"
                  }
                  className="object-cover w-16 h-16"
                />
                <div className="flex flex-col">
                  <h1 className="line-clamp-1">
                    {crew.name || crew.original_name || "Unknown"}
                  </h1>
                  <p className="text-xs md:text-sm text-white/30 line-clamp-1">
                    {crew.job || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="px-4">No director information available.</p>
          )}
        </AccordionItem>
        <AccordionItem key="cast" aria-label="cast" title="Cast">
          <div className="flex flex-col items-start justify-center w-full gap-4">
            <div className="grid w-full grid-rows-1 md:grid-cols-3 md:place-content-center gap-y-5">
              {detailCast && detailCast.length > 0 ? (
                detailCast.slice(0, 10).map((cast, index) => (
                  <div
                    key={cast.id}
                    className={`flex flex-row items-center gap-3 ${index === detailCast.length - 1 ? "border-0" : "border-b pb-2"} px-2 border-white/30`}
                  >
                    <Image
                      radius="none"
                      width={64}
                      height={64}
                      alt={cast.name || cast.original_name || "Cast Member"}
                      src={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/original/${cast.profile_path}`
                          : "/path/to/default/image.jpg"
                      }
                      className="object-cover w-16 h-16"
                    />
                    <div>
                      <h1 className="line-clamp-1">
                        {cast.name || cast.original_name || "Unknown"}
                      </h1>
                      <p className="text-xs md:text-sm text-white/30 line-clamp-1">
                        {cast.character || "Unknown"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-4">No cast information available.</p>
              )}
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default DetailCast;
