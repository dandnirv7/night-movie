import React from "react";
import {
  Button,
  Link,
  Pagination as PaginationNextUI,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";

const TOTAL_PAGES = 40;

type PaginationProps = {
  type: "movies" | "series" | "cast" | "genre";
  genreName?: string;
};

const Pagination: React.FC<PaginationProps> = ({ type, genreName }) => {
  const { pageNumber } = useParams<{ pageNumber?: string }>();
  const currentPage = Number(pageNumber) || 1;

  const getBasePath = () => {
    switch (type) {
      case "movies":
        return "/movies/page/";
      case "series":
        return "/series/page/";
      case "cast":
        return "/cast/page/";
      case "genre":
        return `/genre/${genreName}/page/`;
      default:
        return "/";
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full  gap-5 lg:justify-center">
      <Link
        className="w-full lg:w-auto"
        href={currentPage > 1 ? `${getBasePath()}${currentPage - 1}` : "#"}
      >
        <Button
          size="md"
          className={`w-full rounded-md px-4 py-2 md:py-6 text-white bg-zinc-700 md:font-semibold lg:font-normal lg:w-auto ${
            currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={(e) => {
            if (currentPage <= 1) e.preventDefault();
          }}
        >
          Previous
        </Button>
      </Link>
      <PaginationNextUI
        total={TOTAL_PAGES}
        size="lg"
        className="hidden lg:block"
        classNames={{
          item: "rounded-sm bg-transparent border border-black text-white hover:bg-black hover:text-purple-gem focus:ring-red-500",
          cursor: "bg-black rounded-sm text-purple-gem",
        }}
        page={currentPage}
        disableAnimation
        onChange={(page) => {
          window.location.href = `${getBasePath()}${page}`;
        }}
        siblings={2}
        boundaries={4}
      />
      <Link
        className="w-full lg:w-auto"
        href={
          currentPage < TOTAL_PAGES ? `${getBasePath()}${currentPage + 1}` : "#"
        }
      >
        <Button
          size="md"
          className={`w-full rounded-md px-4 py-2 md:py-6 text-white bg-zinc-700 md:font-semibold lg:font-normal lg:w-auto ${
            currentPage >= TOTAL_PAGES ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={(e) => {
            if (currentPage >= TOTAL_PAGES) e.preventDefault();
          }}
        >
          Next
        </Button>
      </Link>
    </div>
  );
};

export default Pagination;
