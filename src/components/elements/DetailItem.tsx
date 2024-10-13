import React from "react";
import type { DetailItemProps } from "@/types/types";

const DetailItem: React.FC<DetailItemProps> = ({ heading, title }) => {
  return (
    <>
      <div className="grid grid-cols-12 pb-3 border-b border-zinc-600">
        <h2 className="col-span-4 text-sm font-semibold md:col-span-2">
          {heading}
        </h2>
        <p className="col-span-8 text-sm md:col-span-10 text-white/60">
          {title}
        </p>
      </div>
    </>
  );
};

export default DetailItem;
