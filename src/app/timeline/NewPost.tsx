import Image from "next/image";
import { IoSendSharp } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import React from "react";
import { useSelector } from "react-redux";
import TransparentTextArea from "@/components/input/TransparentTextArea";
const NewPost = () => {
  const [contentText, setContentText] = React.useState("");
  const {userInfo} = useSelector((state: any) => state.auth);
  return (
    <div className="w-full bg-tertiary p-2 rounded-2xl flex gap-2">
      <Image
        className="rounded-full border-[1px] border-front w-[40px] h-[40px]"
        src="/img/avatar/default.png"
        alt="pfp"
        width={40}
        height={40}
      />
      <div className="flex-grow mt-2">
        <TransparentTextArea
          placeholder={"What's on your mind," + userInfo.username}
          value={contentText}
          setValue={setContentText}
        />
      </div>
      <FaImages className="m-2" size={20} />
      <IoSendSharp className="m-2" size={20} />
    </div>
  );
};

export default NewPost;
