import { Dispatch, SetStateAction } from "react";

export type SelectedType = "all" | "movies" | "tvseries";

export interface DataState {
  type: string;
  genre: string;
  fromRate: string;
  toRate: string;
  sortBy: string;
  moreFilters: string[];
}

export interface MovieTypeSelectorProps {
  selectedType: SelectedType;
  setSelectedType: Dispatch<SetStateAction<SelectedType>>;
}

export type FilterSelectProps = {
  placeholder: string;
  value: string | string[];
  onChange: (
    value: string | string[] | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  options: { label: string; value: string }[];
  multiple?: boolean;
  isRate?: boolean;
};

export interface Genre {
  id: number;
  name: string;
}

export type HandleValueChange = (
  value: string | string[] | React.ChangeEvent<HTMLSelectElement>,
  type: keyof DataState
) => void;
