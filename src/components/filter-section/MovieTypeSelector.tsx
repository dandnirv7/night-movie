import { Button } from "@nextui-org/react";
import React from "react";
import type { MovieTypeSelectorProps, SelectedType } from "./types";

const MovieTypeSelector: React.FC<MovieTypeSelectorProps> = ({
  selectedType,
  setSelectedType,
}) => {
  const movieTypes = [
    { name: "all", value: "all" as SelectedType },
    { name: "movies", value: "movies" as SelectedType },
    { name: "series", value: "tvseries" as SelectedType },
  ];

  return (
    <section className="flex flex-row md:gap-3 p-2.5 bg-charcoal-gray rounded-lg justify-center">
      {movieTypes.map((type) => (
        <Button
          size="lg"
          radius="sm"
          key={type.value}
          onClick={() => setSelectedType(type.value)}
          className={`size="md" w-full radius="sm" ${selectedType === type.value ? "bg-purple-gem text-white" : "bg-transparent text-white"} capitalize font-semibold`}
        >
          {type.name}
        </Button>
      ))}
    </section>
  );
};

export default MovieTypeSelector;
