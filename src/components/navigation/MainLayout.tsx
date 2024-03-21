import RestrictedProvider from "@/providers/RestrictedProvider";
import LeftSideBar from "./LeftSideBar";
import React, { ReactNode, lazy } from "react";
import TopBar from "./TopBar";
const LazyRightSideBar = lazy(() => import("./RightSideBar"));

interface MainLayoutProps {
  menu: string,
  children: ReactNode;
}

const MainLayout = ({ menu, children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <RestrictedProvider>
      <div className="bg-primary w-screen h-screen flex">
        <LeftSideBar isMenuOpen={isMenuOpen} setIsMenuOpen={(v: boolean) => {setIsMenuOpen(v)}} menu={menu}/>
        <div className="flex-grow bg-gradient-to-b from-back3 to-black overflow-auto">
          <div
            id="header"
            className="sticky top-0 p-12 bg-gradient-to-b from-back3 via-back3 to-transparent z-40"
          >
            <TopBar setMenu={(v: boolean) => {setIsMenuOpen(v)}}/>
          </div>
          <div className="p-12 pt-0">
            <div>{children}</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <LazyRightSideBar />
        </div>
      </div>
    </RestrictedProvider>
  );
};

export default MainLayout;
