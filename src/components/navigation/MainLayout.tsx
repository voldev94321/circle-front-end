import RestrictedProvider from "@/providers/RestrictedProvider";
import LeftSideBar from "./LeftSideBar";
import { ReactNode, lazy } from "react";
const LazyRightSideBar = lazy(() => ( import("./RightSideBar")));

interface MainLayoutProps {
    children: ReactNode,
}

const MainLayout = ({children}: MainLayoutProps) => {
    return (
        <RestrictedProvider>
            <div className="bg-primary w-screen h-screen flex">
                <LeftSideBar/>
                <div className="flex-grow">{children}</div>
                <LazyRightSideBar/>
            </div>
        </RestrictedProvider>
    )
};

export default MainLayout;