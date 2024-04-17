"use client";
import { setProfileModalState } from "@/store/modalSlice";
import { formatDate } from "@/utils/date";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface ProfileHeaderProps {
  selectedUser: any;
}

/* eslint-disable @next/next/no-img-element */
const ProfileHeader = ({ selectedUser }: ProfileHeaderProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);

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
            selectedUser.avatarUrl ? selectedUser.avatarUrl : "/img/avatar/default.png"
          }
          alt="avatar"
          className="w-20 h-20 rounded-2xl -mt-12 border-front border-2 object-cover"
        />
        <div className="flex justify-start gap-6 items-center flex-grow">
          <div><b>Joined</b>: {formatDate(selectedUser.createdAt)}</div>
          {selectedUser.extra.map((item: any, index: number) => (
            <div key={index}>
              <b>{item.label}</b>: {item.content}
            </div>
          ))}
        </div>
        <div>
          {userInfo._id == selectedUser._id && <IoMdSettings
            className="w-5 h-5 cursor-pointer"
            onClick={handleSetting}
          />}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
