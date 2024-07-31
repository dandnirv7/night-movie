import React from "react";
import { BackgroundImageProps } from "@/types/heroSection";

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  backdropPath,
  children,
}) => (
  <div
    className="min-h-screen min-w-screen bg-cover bg-no-repeat p-screen-gutter  "
    style={{
      backgroundImage: `url("https://image.tmdb.org/t/p/original/${backdropPath}")`,
    }}
  >
    {children}
  </div>
);
