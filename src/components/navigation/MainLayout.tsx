/* eslint-disable react-hooks/exhaustive-deps */
import RestrictedProvider from "@/providers/RestrictedProvider";
import LeftSideBar from "./LeftSideBar";
import React, { ReactNode, createContext, lazy } from "react";
import TopBar from "./TopBar";
import { getAllUsers } from "@/apis/auth";
import { useDispatch } from "react-redux";
import { setAllUsers } from "@/store/appSlice";
const LazyRightSideBar = lazy(() => import("./RightSideBar"));

interface MainLayoutProps {
  menu: string,
  children: ReactNode;
}

const MainLayout = ({ menu, children }: MainLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(async () => {
      const data = await getAllUsers();
      dispatch(setAllUsers(data.users));
    }, 0);
  }, []);

  return (
    <RestrictedProvider>
      <div className="bg-primary w-screen h-screen flex">
        <LeftSideBar isMenuOpen={isMenuOpen} setIsMenuOpen={(v: boolean) => {setIsMenuOpen(v)}} menu={menu}/>
        <div className="flex-grow bg-gradient-to-b from-back3 to-black overflow-auto flex flex-col">
          <div
            id="header"
            className="sticky top-0 p-12 bg-gradient-to-b from-back3 via-back3 to-transparent z-40"
          >
            <TopBar setMenu={(v: boolean) => {setIsMenuOpen(v)}} menu={menu}/>
          </div>
          <div className="px-12 flex-grow">
            {children}
          </div>
        </div>
        <div className="hidden lg:block">
          <LazyRightSideBar menu={menu}/>
        </div>
      </div>
    </RestrictedProvider>
  );
};

export default MainLayout;
