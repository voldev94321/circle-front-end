import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Menu from "./menu";

const LeftSideBar = () => {
    return <div className="bg-back h-full max-w-[330px]">
        <div className="flex flex-col p-6 h-full justify-between">
            <div>
                <ProfileCard/>
                <Menu/>
            </div>
            <Link className="text-center cursor-pointer" href="/settings">Settings</Link>
        </div>
    </div>
};

export default LeftSideBar;