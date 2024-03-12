import RestrictedProvider from "@/providers/RestrictedProvider";
import LeftSideBar from "./LeftSideBar";
import { ReactNode, lazy } from "react";
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
        <div className="flex-grow bg-gradient-to-b from-back3 to-black">
          <div className="p-12">
            <TopBar />
            <div>{children}</div>
          </div>
        </div>
        <LazyRightSideBar />
      </div>
    </RestrictedProvider>
  );
};

export default MainLayout;
