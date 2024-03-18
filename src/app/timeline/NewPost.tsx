/* eslint-disable @next/next/no-img-element */
import { IoSendSharp } from "react-icons/io5";
import React from "react";
import { useSelector } from "react-redux";
import ReactQuillEditor from "@/components/input/ReactQuill";
import Image from "next/image";
import { newPost } from "@/apis/community";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const NewPost = () => {
  const [content, setContent] = React.useState("");
  const { userInfo } = useSelector((state: any) => state.auth);

  const handleSend = async () => {
    try{
      const data = await newPost(content, userInfo.token);
      if(data.success){
        toast.success("Your blog posted successfully!");
        setContent("");
      } 
    } catch (e: any) {
      if(e.code == AxiosError.ERR_BAD_REQUEST){
        if(e.response.status == 401){
          toast.error("Unauthorized Action!");
          return;
        }
      }
      toast.error("Unknow Error!");
    }
  }

  return (
    <div className="w-full bg-tertiary p-2 rounded-2xl flex gap-2">
      <Image
        className="rounded-full border-[1px] border-front w-[40px] h-[40px]"
        src="/img/avatar/default.png"
        alt="pfp"
        width={40}
        height={40}
      />
      <div className="flex-grow">
        <ReactQuillEditor content={content} setContent={setContent}/>
      </div>
      <div className="m-2 hover:scale-95  duration-500 h-fit cursor-pointer" onClick={handleSend}>
        <IoSendSharp size={20} />
      </div>
    </div>
  );
};

export default NewPost;
