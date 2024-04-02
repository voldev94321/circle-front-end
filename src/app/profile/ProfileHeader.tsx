'use client';
import { setProfileModalState } from "@/store/modalSlice";
import { IoMdSettings } from "react-icons/io";
import { useDispatch } from "react-redux";

/* eslint-disable @next/next/no-img-element */
const ProfileHeader = () => {
    const dispatch = useDispatch();

    const handleSetting = () => {
        dispatch(setProfileModalState(true));
    }

    return (<div>
        <div className="">
            <img src="/img/avatar/banner.png" alt="banner" className="w-full rounded-2xl max-h-40"/>
        </div>
        <div className="flex justify-between items-center mt-2 mx-4">
            <img src="/img/avatar/default.png" alt="avatar" className="w-20 h-20 rounded-2xl -mt-12 border-front border-2"/>
            <div>Profile Name</div>
            <div>Joined: 03/06/2024</div>
            <div>Website: Circle.com</div>
            <div>Location: United States</div>
            <div>Age: 33</div>
            <div><IoMdSettings className="w-8 h-8 cursor-pointer" onClick={handleSetting}/></div>
        </div>
    </div>)
}

export default ProfileHeader;