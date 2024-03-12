import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Menu from "./menu";
import React from "react";

const LeftSideBar = () => {
    const [isMenuOpend, setIsMenuOpen] = React.useState(false);
    return <div className=" h-full md:max-w-[330px] w-full flex">
        {!isMenuOpend && <div className={`w-10 h-8 fixed top-4 left-4 flex flex-col justify-between md:hidden`} onClick={()=>{setIsMenuOpen(!isMenuOpend)}}>
            <div className="w-10 h-1.5 bg-black"></div>
            <div className="w-10 h-1.5 bg-black"></div>
            <div className="w-10 h-1.5 bg-black"></div>
        </div>}
        <div className={`flex flex-col p-6 h-full justify-between min-w-[330px] bg-back md:block ${!isMenuOpend && "hidden"}`}>
            <div>
                <ProfileCard/>
                <Menu/>
            </div>
            <Link className="text-center cursor-pointer" href="/settings">Settings</Link>
        </div>
        <div className="flex-grow" onClick={()=>{setIsMenuOpen(false);}}></div>
    </div>
};

export default LeftSideBar;