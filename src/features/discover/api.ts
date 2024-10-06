import { axiosInstance } from "@/lib/axios";
import { DiscoverResponse, FetchDiscoverAPI } from "./types";

const fetchDiscover: FetchDiscoverAPI<DiscoverResponse> = async (
  endpoint,
  params
) => {
  const response = await axiosInstance.get(endpoint, { params });
  return response?.data;
};

export default fetchDiscover;
