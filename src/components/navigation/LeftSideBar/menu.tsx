"use client";
import { sideMenuItems } from "@/constant";
import Image from "next/image";
import React from "react";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = React.useState("");

  return (
    <div className="mt-6 mb-6 ml-2 mr-2">
      {sideMenuItems.map((menu, index) => (
        <div key={index}>
          <div className="text-lg mt-4 mb-4">{menu.category}</div>
          {menu.items.map((item, iIndex) => (
            <div key={iIndex}>
              <div
                className={`flex flex-row items-center p-4 gap-4 w-full cursor-pointer ${
                  selectedMenu == item.label && "bg-primary2"
                } rounded-xl`}
                onClick={() => {
                  setSelectedMenu(item.label);
                }}
              >
                <Image
                  src={`/img/menu${item.icon}`}
                  width={25}
                  height={25}
                  alt="default"
                />
                <div>{item.label}</div>
                <div className="float-right ml-auto">{">"}</div>
              </div>
              {iIndex + 1 < menu.items.length && (
                <hr className="m-4 text-primary2" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
