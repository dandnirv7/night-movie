import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

type MenuItem = {
  title: string;
  path: string;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Movies",
      path: "/movies",
    },
    {
      title: "Series",
      path: "/series",
    },
    {
      title: "Actors",
      path: "/actors",
    },
    {
      title: "Genre",
      path: "/genre",
    },
  ];

  return (
    <NavbarNextUI
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
      className="md:bg-transparent md:absolute md:px-5 bg-purple-gem md:py-5"
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
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={index}
            isActive={location.pathname === item.path}
          >
            <Link to={item.path}>
              <span
                className={`${
                  location.pathname === item.path
                    ? "font-bold text-lg capitalize"
                    : ""
                } text-white text-lg capitalize w-full opacity-90`}
              >
                {item.title}
              </span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            to="/login"
            size="lg"
            radius="sm"
            className="bg-purple-gem text-white font-semibold"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden md:block">
          <Button
            as={Link}
            color="secondary"
            to="/register"
            variant="solid"
            radius="sm"
            size="lg"
            className="font-semibold"
          >
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem className="block md:hidden">
          <Button
            as={Link}
            color="secondary"
            to="/register"
            variant="solid"
            size="md"
            radius="sm"
            className="font-semibold"
          >
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-foreground/80 flex items-start pt-5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={index}
            isActive={location.pathname === item.path}
          >
            <Link to={item.path}>
              <span
                className={`${
                  location.pathname === item.path
                    ? "font-bold text-lavender-orchid"
                    : "text-white"
                } text-xl capitalize`}
              >
                {item.title}
              </span>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarNextUI>
  );
}
