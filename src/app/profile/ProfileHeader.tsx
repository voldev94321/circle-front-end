/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { followUser, getUserInfo } from "@/apis/auth";
import { setUserInfo } from "@/store/authSlice";
import { setProfileModalState } from "@/store/modalSlice";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

interface ProfileHeaderProps {
  selectedUser: any;
}

/* eslint-disable @next/next/no-img-element */
const ProfileHeader = ({ selectedUser }: ProfileHeaderProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [isFollowed, setIsFollowed] = React.useState(
    userInfo.followers &&
      userInfo.followers.findIndex((v: any) => v == selectedUser._id) != -1
  );

  React.useEffect(() => {
    setIsFollowed(
      userInfo.followers &&
        userInfo.followers.findIndex((v: any) => v == selectedUser._id) != -1
    );
  }, [selectedUser]);

  const handleSetting = () => {
    dispatch(setProfileModalState(true));
  };

  const handleFollow = async () => {
    setIsFollowed(!isFollowed);
    const result = await followUser(userInfo.token, selectedUser._id);
    if (result && result.success) {
      const data = await getUserInfo(userInfo.token);
      if (data.success) {
        dispatch(
          setUserInfo({
            ...userInfo,
            ...data.user,
          })
        );
      }
    }
  };

  return (
    <div>
      <div className="relative">
        <img
          src={
            selectedUser.bannerUrl
              ? selectedUser.bannerUrl
              : "/img/avatar/banner.png"
          }
          alt="banner"
          className="w-full rounded-2xl h-52 object-cover"
        />
        <div>
          {userInfo._id == selectedUser._id && (
            <IoMdSettings
              className="w-5 h-5 cursor-pointer absolute right-5 bottom-5"
              onClick={handleSetting}
            />
          )}
        </div>
      </div>
      <div className="flex items-center mt-2 mx-4 gap-6">
        <img
          src={
            selectedUser.avatarUrl
              ? selectedUser.avatarUrl
              : "/img/avatar/default.png"
          }
          alt="avatar"
          className="w-24 h-24 rounded-3xl -mt-12 border-front border-2 object-cover z-20"
        />
        {userInfo._id != selectedUser._id && (
          <div className="relative cursor-pointer" onClick={handleFollow}>
            <FaUser className={`w-4 h-4 ${isFollowed && "text-primary"}`} />
            <b
              className={`absolute top-[-3px] left-[-6px] ${
                isFollowed && "text-primary"
              }`}
            >
              +
            </b>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
