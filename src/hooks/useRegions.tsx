import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import type { Region } from "@/types/filterSection";

export const useRegions = () => {
  return useQuery<Region[]>({
    queryKey: ["available-regions"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/watch/providers/regions?language=en-US"
      );
      return response?.data.results;
    },
  });
};
