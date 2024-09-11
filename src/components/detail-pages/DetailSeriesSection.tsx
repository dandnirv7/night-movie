import React from "react";
import DetailItem from "../elements/DetailItem";
import { formatDate } from "@/lib/utils";
import type { DetailSeriesSectionProps } from "@/types/types";

const DetailSeriesSection: React.FC<DetailSeriesSectionProps> = ({
  detailSeries,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold md:text-2xl">Detail Series</h1>
      <DetailItem
        heading="Original Title"
        title={detailSeries?.original_name}
      />
      <DetailItem
        heading="First air date"
        title={formatDate(detailSeries?.first_air_date)}
      />
      <DetailItem
        heading="Last air date"
        title={formatDate(detailSeries?.last_air_date)}
      />
      <DetailItem
        heading="Seasons"
        title={`${detailSeries?.number_of_seasons}`}
      />
      <DetailItem
        heading="Episodes"
        title={`${detailSeries?.number_of_episodes}`}
      />
    </section>
  );
};

export default DetailSeriesSection;
