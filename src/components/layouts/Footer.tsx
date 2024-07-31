import React from "react";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaFacebookF,
  FaRegEnvelope,
} from "react-icons/fa6";

type FooterItem = {
  link: string;
  icon?: React.ReactNode;
};

const Footer = () => {
  const footerItems: FooterItem[] = [
    {
      link: "Terms Of Use",
      icon: <FaInstagram size={"24px"} />,
    },
    {
      link: "Privacy-Policy",
      icon: <FaSquareXTwitter size={"24px"} />,
    },
    {
      link: "About",
      icon: <FaFacebookF size={"24px"} />,
    },
    {
      link: "Blog",
      icon: <FaRegEnvelope size={"24px"} />,
    },
    {
      link: "FAQ",
    },
  ];

  return (
    <footer className="py-10 px-5 md:px-20 lg:w-1/2 mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-start md:justify-center items-center gap-4">
          {footerItems.map((item, index) => (
            <ul key={index} className="flex flex-col items-center">
              <li className="font-semibold hover:text-lavender-orchid md:text-lg lg:text-xl hover:cursor-pointer text-md">
                {item.link}
              </li>
            </ul>
          ))}
        </div>
        <p className="text-md text-gray-400 font-medium lg:text-center lg:text-lg">
          Welcome to Night Movies, your ultimate destination for high-quality
          movie streaming. Enjoy our collection of the latest movies, classic
          films, and your favorite TV series with ease and without interruption.
          We offer a seamless viewing experience with HD quality and various
          subtitle options for your convenience. Find a movie that suits your
          taste from a variety of genres, including action, drama, comedy, and
          more. Join us now and experience unlimited entertainment at your
          fingertips!
        </p>
        <div className="flex flex-wrap justify-start md:justify-center items-center gap-4">
          {footerItems.map(
            (item, index) =>
              item.icon && (
                <div
                  key={index}
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-gunmetal"
                >
                  {item.icon}
                </div>
              )
          )}
        </div>
        <span className="md:text-center lg:text-lg">
          &copy; Night Movies 2024. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
