import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Input,
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@nextui-org/react";
import { Clapperboard, LayoutGrid, Search, Tv, User, X } from "lucide-react";

import { useCardFilter } from "@/hooks/useCardFilter";
import SuggestionCard from "@/components/SuggestionCard";

type MenuItem = {
  title: string;
  path: string;
  icon: (color: string) => React.ReactElement;
};

const menuItems: MenuItem[] = [
  {
    title: "Movies",
    path: "/movies",
    icon: (color) => <Clapperboard color={color} />,
  },
  {
    title: "Series",
    path: "/series",
    icon: (color) => <Tv color={color} />,
  },
  {
    title: "Actors",
    path: "/actors",
    icon: (color) => <User color={color} />,
  },
  {
    title: "Genre",
    path: "/genre",
    icon: (color) => <LayoutGrid color={color} />,
  },
];

export default function Navbar() {
  const { handleSubmit, isLoadingSearch, query, setQuery, searchMovies } =
    useCardFilter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const renderMenuItems = () =>
    menuItems.map((item, index) => {
      const isActive = location.pathname === item.path;
      const color = isActive ? "#611DBA" : "white";

      return (
        <NavbarMenuItem key={index} isActive={isActive}>
          <Link to={item.path} className="flex items-center gap-2">
            {item.icon(color)}
            <span
              className={`${
                isActive ? "text-purple-gem" : "text-white"
              } text-lg capitalize`}
            >
              {item.title}
            </span>
          </Link>
        </NavbarMenuItem>
      );
    });

  return (
    <NavbarNextUI
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
      className="md:bg-transparent md:absolute md:px-5 bg-purple-800 md:py-5 z-[99]"
      isBlurred={false}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link to="/">
            <p className="font-bold text-2xl text-white hover:opacity-100">
              NIGHT MOVIE
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand className="mr-5">
          <Link to="/">
            <p className="font-bold text-2xl text-white hover:opacity-100">
              NIGHT MOVIE
            </p>
          </Link>
        </NavbarBrand>
        {renderMenuItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:block">
          <form onSubmit={handleSubmit}>
            <Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search ...."
              size="lg"
              radius="sm"
              className="w-full lg:w-1/4 top-0 lg:absolute lg:right-0"
              variant="faded"
              endContent={
                isLoadingSearch ? (
                  <Spinner size="sm" />
                ) : query ? (
                  <Link to={`/search/${query}`}>
                    <Search color="gray" />
                  </Link>
                ) : (
                  <Search color="gray" />
                )
              }
              classNames={{
                inputWrapper: "bg-gunmetal focus-visible:ring-0 border-none",
              }}
            />
            <SuggestionCard movies={searchMovies} query={query} />
          </form>
        </NavbarItem>
        <NavbarItem className="lg:hidden">
          <button onClick={toggleSearchVisibility} className="p-2">
            {isSearchVisible ? <X /> : <Search />}
          </button>
          {isSearchVisible && (
            <div className="absolute -bottom-12 w-full left-0">
              <form onSubmit={handleSubmit}>
                <Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search ...."
                  size="lg"
                  radius="none"
                  endContent={
                    isLoadingSearch ? (
                      <Spinner size="sm" />
                    ) : query ? (
                      <Link to={`/search/${query}`}>
                        <Search color="gray" />
                      </Link>
                    ) : (
                      <Search color="gray" />
                    )
                  }
                  variant="faded"
                  classNames={{
                    inputWrapper:
                      "bg-gunmetal focus-visible:ring-0 border-none",
                  }}
                />
                <SuggestionCard movies={searchMovies} query={query} />
              </form>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-foreground/80 flex items-start pt-5">
        {renderMenuItems()}
      </NavbarMenu>
    </NavbarNextUI>
  );
}
