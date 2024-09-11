import React from "react";
import { Pagination as PaginationNextUI, Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";

const TOTAL_PAGES = 40;

type PaginationProps = {
  type: "movies" | "series" | "cast";
};

const Pagination: React.FC<PaginationProps> = ({ type }) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(Number(pageNumber) || 1);

  const getBasePath =
    type === "movies"
      ? "/movies/page/"
      : type === "series"
        ? "/series/page/"
        : "/cast/page/";

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`${getBasePath}${page}`);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-5 lg:justify-center">
      <Button
        size="md"
        radius="sm"
        variant="flat"
        className="w-full text-white bg-zinc-700 md:font-semibold lg:font-normal lg:w-auto"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <PaginationNextUI
        total={TOTAL_PAGES}
        size="lg"
        className="hidden lg:block"
        classNames={{
          item: "rounded-sm bg-transparent border border-black text-white hover:bg-black hover:text-purple-gem focus:ring-red-500",
          cursor: " bg-black rounded-sm text-purple-gem",
        }}
        page={currentPage}
        onChange={handlePageChange}
        siblings={2}
        boundaries={4}
      />
      <Button
        size="md"
        radius="sm"
        variant="flat"
        className="w-full text-white bg-zinc-700 md:font-semibold lg:font-normal lg:w-auto"
        disabled={currentPage >= TOTAL_PAGES}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
