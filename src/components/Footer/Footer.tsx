import React, { FC } from "react";
import { NavRoute } from "@types";
import FacebookSvg from "@img/facebook-icon.svg";
import TwitterSvg from "@img/twitter-icon.svg";
import LinkedInSvg from "@img/linkedin-icon.svg";
import InstagramSvg from "@img/instagram-icon.svg";
import ExploreSvg from "@img/explore-icon.svg";

interface FooterProps {
  routs: NavRoute[];
  LogoSvg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Footer: FC<FooterProps> = ({ routs, LogoSvg }) => {
  const socialLinks = [
    { name: "Facebook", icon: FacebookSvg, link: "https://facebook.com", },
    { name: "Twitter", icon: TwitterSvg, link: "https://twitter.com/", },
    { name: "LinkedIn", icon: LinkedInSvg, link: "https://www.linkedin.com/", },
    { name: "Instagram", icon: InstagramSvg, link: "https://www.instagram.com/", },
  ];

  const connection = [
    { label: "address :", content: "24A Kingston St, Los Vegas NC 28202, USA." },
    { label: "mail :", content: "support@doctors.com" },
    { label: "phone :", content: "(+22) 123 - 4567 - 900" }
  ]

  return (
    <footer className="flex justify-center bg-blue w-full py-40">
      <div className="w-cont grid grid-cols-6 gap-65">
        <div>
          <a href="./">
            <LogoSvg/>
          </a>
          <ul className="flex gap-10 mt-25">
            {socialLinks.map(item => (
              <li
                key={item.name}
                className="group flex cursor-pointer border border-lightBlue hover:border-white">
                <a
                  href={item.link}
                  className="footer-svg-fill">
                  <item.icon className="m-10"/>
                </a>
              </li>
            ))
            }
          </ul>
        </div>
        <div className="col-start-3">
          <h3 className="font-serif font-bold text-2xl text-white leading-7 cursor-default">
            Explore
          </h3>
          <ul className="flex flex-col  mt-25">
            {
              routs.map(item => (
                <li key={item.id}>
                  <a
                    href={item.route}
                    className="flex items-center gap-20 font-sans text-lg leading-9 text-lightBlue hover:text-white">
                    <ExploreSvg/>
                    {item.label}
                  </a>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-span-2 col-start-5">
          <h3 className="font-serif font-bold text-2xl text-white leading-7  cursor-default">
            Keep in Touch
          </h3>
          <ul className="flex flex-col mt-25">
            {
              connection.map(item => (
                <li
                  key={item.label}
                  className="grid grid-cols-4 font-sans text-lg leading-9 text-lightBlue cursor-default">
                  <h4 className="text-white capitalize">
                    {item.label}
                  </h4>
                  <p className="col-span-3">
                    {item.content}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </footer>
  );
};
