import {
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NavbarNextUI,
} from "@nextui-org/react";
import { Clapperboard, LayoutGrid, Tv, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import NavbarSearch from "./NavbarSearch";

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
    path: "/cast",
    icon: (color) => <User color={color} />,
  },
  {
    title: "Genre",
    path: "/genre",
    icon: (color) => <LayoutGrid color={color} />,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const renderMenuItems = () =>
    menuItems.map((item, index) => {
      const isActive = location.pathname.includes(item.path);
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

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Link to="/">
            <p className="text-2xl font-bold text-white hover:opacity-100">
              NIGHT MOVIE
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand className="mr-5">
          <Link to="/">
            <p className="text-2xl font-bold text-white hover:opacity-100">
              NIGHT MOVIE
            </p>
          </Link>
        </NavbarBrand>
        {renderMenuItems()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarSearch />
      </NavbarContent>

      <NavbarMenu className="flex items-start pt-5 bg-foreground/80">
        {renderMenuItems()}
      </NavbarMenu>
    </NavbarNextUI>
  );
}
