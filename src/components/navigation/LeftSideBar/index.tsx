import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Menu from "./menu";
import React from "react";
import { IoMdSettings } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

interface LeftSideBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  menu: string;
}

const LeftSideBar = ({ isMenuOpen, setIsMenuOpen, menu }: LeftSideBarProps) => {
  return (
    <div
      className={` h-full lg:max-w-[330px] w-full flex fixed lg:relative z-50 lg:block ${
        !isMenuOpen ? "hidden" : ""
      }`}
      onClick={(e) => {
        setIsMenuOpen(false);
      }}
    >
      <div
        className={`flex flex-col p-6 h-full justify-between min-w-[330px] bg-back`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <ProfileCard />
          <Menu selectedMenu={menu} />
        </div>
        <div className="flex gap-4 p-4">
          <Link className="text-center cursor-pointer" href="/profile">
            <IoMdSettings className="w-5 h-5"/>
          </Link>
          <Link className="text-center cursor-pointer" href="https://twitter.com/circlecardano">
            <FaXTwitter className="w-5 h-5"/>
          </Link>
          <Link className="text-center cursor-pointer" href="https://discord.com/invite/yCTRSVHmHQ">
            <FaDiscord className="w-5 h-5"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
