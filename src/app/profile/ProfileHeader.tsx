"use client";
import { setProfileModalState } from "@/store/modalSlice";
import { formatDate } from "@/utils/date";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable @next/next/no-img-element */
const ProfileHeader = () => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleSetting = () => {
    dispatch(setProfileModalState(true));
  };

  return (
    <div>
      <div className="">
        <img
          src="/img/avatar/banner.png"
          alt="banner"
          className="w-full rounded-2xl max-h-40"
        />
      </div>
      <div className="flex items-center mt-2 mx-4 gap-4">
        <img
          src={
            userInfo.avatarUrl ? userInfo.avatarUrl : "/img/avatar/default.png"
          }
          alt="avatar"
          className="w-20 h-20 rounded-2xl -mt-12 border-front border-2 object-cover"
        />
        <div className="flex justify-center gap-4 items-center flex-grow">
          {userInfo.circlename && <div>{userInfo.circlename}</div>}
          <div>Joined: {formatDate(userInfo.createdAt)}</div>
          {userInfo.extra.map((item: any, index: number) => (
            <div key={index}>
              {item.label}: {item.content}
            </div>
          ))}
        </div>
        <div>
          <IoMdSettings
            className="w-8 h-8 cursor-pointer"
            onClick={handleSetting}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
