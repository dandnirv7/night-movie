import React from "react";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaRegEnvelope,
  FaLinkedinIn,
} from "react-icons/fa6";

type FooterLink = {
  label: string;
  icon?: React.ReactNode;
  url?: string;
};

const Footer = () => {
  const footerLinks: FooterLink[] = [
    {
      label: "Terms Of Use",
      icon: <FaInstagram size={"24px"} />,
      url: "https://instagram.com/dandnirv",
    },
    {
      label: "Privacy Policy",
      icon: <FaSquareXTwitter size={"24px"} />,
      url: "https://x.com/dandnirv7",
    },
    {
      label: "About",
      icon: <FaLinkedinIn size={"24px"} />,
      url: "https://in.com/in/dandnirv/",
    },
    {
      label: "Blog",
      icon: <FaRegEnvelope size={"24px"} />,
      url: "mailto:dandinirpana7@gmail.com",
    },
    {
      label: "FAQ",
    },
  ];

  return (
    <footer className="px-5 py-10 mx-auto md:px-20 lg:w-1/2">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-start gap-4 md:justify-center">
          {footerLinks.map((link, index) => (
            <ul key={index} className="flex flex-col items-center">
              <li className="font-semibold hover:text-lavender-orchid md:text-lg lg:text-xl hover:cursor-pointer text-md">
                {link.label}
              </li>
            </ul>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start gap-4 md:justify-center">
          {footerLinks.map(
            (link, index) =>
              link.icon && (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gunmetal"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                  </a>
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
