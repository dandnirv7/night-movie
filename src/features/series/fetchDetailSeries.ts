import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useSearchSeries = (query?: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const searchSeriesResponse = await axiosInstance.get(
        `/search/tv?query=${query}`
      );
      return searchSeriesResponse.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!query,
  });
};

export const useSeriesVideos = (seriesId?: number) => {
  return useQuery({
    queryKey: ["videos", seriesId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/tv/${seriesId}/videos`);
      return response.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!seriesId,
  });
};

export const useDetailSeries = (seriesId?: number) => {
  return useQuery({
    queryKey: ["detailSeries", seriesId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/tv/${seriesId}`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!seriesId,
  });
};

export const useRelatedSeries = (seriesId?: number) => {
  return useQuery({
    queryKey: ["relatedSeries", seriesId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/tv/${seriesId}/recommendations`
      );
      return response.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!seriesId,
  });
};

export const useReviewsSeries = (seriesId?: number) => {
  return useQuery({
    queryKey: ["reviewsSeries", seriesId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/tv/${seriesId}/reviews`);
      return response.data.results;
    },
    refetchOnWindowFocus: false,
    enabled: !!seriesId,
  });
};

export const useCreditsSeries = (seriesId?: number) => {
  return useQuery({
    queryKey: ["creditsSeries", seriesId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/tv/${seriesId}/credits`);
      return response.data;
    },
    refetchOnWindowFocus: false,
    enabled: !!seriesId,
  });
};

// export const useSeasonsSeries = (seriesId?: number, seasonNumber?: number) => {
//   return useQuery({
//     queryKey: ["seasons", seriesId],
//     queryFn: async () => {
//       const response = await axiosInstance.get(
//         `/tv/${seriesId}/season/${seasonNumber}`
//       );
//       return response.data;
//     },
//     refetchOnWindowFocus: false,
//     enabled: !!seriesId,
//   });
// };

export const useAllSeasons = (seriesId?: number, numberOfSeasons?: number) => {
  return useQuery({
    queryKey: ["allSeasons", seriesId, numberOfSeasons],
    queryFn: async () => {
      if (!seriesId || !numberOfSeasons) return [];

      const seasonRequests = Array.from(
        { length: numberOfSeasons },
        (_, index) => {
          const seasonNumber = index + 1;
          return axiosInstance.get(`/tv/${seriesId}/season/${seasonNumber}`);
        }
      );

      const seasonResponses = await Promise.all(seasonRequests);

      return seasonResponses.map((response) => response.data);
    },
    refetchOnWindowFocus: false,
    enabled: !!seriesId && !!numberOfSeasons,
  });
};
