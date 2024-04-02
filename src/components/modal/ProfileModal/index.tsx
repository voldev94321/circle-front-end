/* eslint-disable @next/next/no-img-element */
import PostView from "@/components/view/PostView/PostView";
import { setBlogModalState, setProfileModalState, setRepostModalState } from "@/store/modalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileModal = () => {
  const { profileModalState } = useSelector((state: any) => state.modal);
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setProfileModalState(false));
  };

  return profileModalState ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-black bg-opacity-90"
      onMouseDown={() => {
        onClose();
      }}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-3xl md:bg-back bg-back w-[40rem] h-full md:h-fit border-primary border-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <img src="img/avatar/banner.png" alt="banner" className="h-32 rounded-t-3xl"/>
        <img src="img/avatar/default.png" alt="avatar" className="h-20 w-20 object-cover "/>
        <div className="w-full p-4">
          Profile Modal
        </div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default ProfileModal;
