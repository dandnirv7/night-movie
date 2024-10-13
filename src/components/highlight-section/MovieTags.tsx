import React from "react";
import type { MovieDetailsProps, SectionProps } from "@/types/highlightSection";

const Section: React.FC<SectionProps> = ({ title, items, separator }) => (
  <div className="flex flex-col mb-4 md:mb-0">
    <h2 className="text-lg font-semibold md:text-xl">{title}:</h2>
    <ul className="flex flex-row gap-2 flex-wrap">
      {items?.map((item, index) => (
        <li key={item.id}>
          <span className="text-sm md:text-xl text-white/90">
            {item.name}
            {index < items.length - 1 && separator}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export const MovieTags: React.FC<MovieDetailsProps> = ({ genres, stars }) => (
  <div className="flex flex-col md:gap-2">
    <Section title="Category" items={genres} separator=" |" />
    <Section title="Stars" items={stars?.slice(0, 3)} separator=", " />
  </div>
);
