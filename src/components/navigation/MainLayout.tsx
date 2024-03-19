import RestrictedProvider from "@/providers/RestrictedProvider";
import LeftSideBar from "./LeftSideBar";
import React, { ReactNode, lazy } from "react";
import TopBar from "./TopBar";
const LazyRightSideBar = lazy(() => import("./RightSideBar"));

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  
  return (
    <RestrictedProvider>
      <div className="bg-primary w-screen h-screen flex">
        <LeftSideBar />
        <div className="flex-grow bg-gradient-to-b from-back3 to-black overflow-auto">
          <div id="header" className="sticky top-0 p-12 bg-gradient-to-b from-back3 via-back3 to-transparent z-50">
            <TopBar />
          </div>
          <div className="p-12 pt-0">
            <div>{children}</div>
          </div>
        </div>
        <LazyRightSideBar />
      </div>
    </RestrictedProvider>
  );
};

export default MainLayout;
