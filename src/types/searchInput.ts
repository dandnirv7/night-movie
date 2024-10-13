import { SetStateAction } from "react";

export type SearchInputProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  isLoadingSearch: boolean;
};
