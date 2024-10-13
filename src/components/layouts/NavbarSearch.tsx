import { FormEvent, useState, useEffect, useRef } from "react";
import { Input, NavbarItem, Spinner } from "@nextui-org/react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import SuggestionCard from "../fragments/SuggestionCard";
import { useSearch } from "@/hooks/useSearch";

const NavbarSearch = () => {
  const { query, setQuery, suggestions, isLoadingSearch } = useSearch();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      window.location.href = `/search/${query}`;
    }
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleFocus = () => {
    setIsCardVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsCardVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <NavbarItem className="hidden lg:block">
        <div ref={searchContainerRef}>
          <form onSubmit={handleSubmit}>
            <Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search ...."
              size="lg"
              radius="sm"
              className="top-0 w-full lg:w-1/4 lg:absolute lg:right-0"
              variant="faded"
              onFocus={handleFocus}
              endContent={
                isLoadingSearch ? (
                  <Spinner size="sm" />
                ) : (
                  <Link to={`/search/${query}`}>
                    <Search color="gray" />
                  </Link>
                )
              }
              classNames={{
                inputWrapper: "bg-gunmetal focus-visible:ring-0 border-none",
              }}
            />
            {isCardVisible && (
              <SuggestionCard suggestions={suggestions} query={query} />
            )}
          </form>
        </div>
      </NavbarItem>

      <NavbarItem className="lg:hidden">
        <button onClick={toggleSearchVisibility} className="p-2">
          {isSearchVisible ? <X /> : <Search />}
        </button>
        {isSearchVisible && (
          <div
            className="absolute left-0 w-full -bottom-12"
            ref={searchContainerRef}
          >
            <form onSubmit={handleSubmit}>
              <Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search ...."
                size="lg"
                radius="none"
                onFocus={handleFocus}
                endContent={
                  isLoadingSearch ? (
                    <Spinner size="sm" />
                  ) : (
                    <Link to={`/search/${query}`}>
                      <Search color="gray" />
                    </Link>
                  )
                }
                variant="faded"
                classNames={{
                  inputWrapper: "bg-gunmetal focus-visible:ring-0 border-none",
                }}
              />
              {isCardVisible && (
                <SuggestionCard suggestions={suggestions} query={query} />
              )}
            </form>
          </div>
        )}
      </NavbarItem>
    </>
  );
};

export default NavbarSearch;
