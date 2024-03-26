/* eslint-disable @next/next/no-img-element */
import { IoSendSharp } from "react-icons/io5";
import React from "react";
import { useSelector } from "react-redux";
import ReactQuillEditor from "@/components/input/ReactQuill";
import Image from "next/image";
import { newPost } from "@/apis/blog";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { extractImgInfo } from "@/utils/html";
import { uploadImage } from "@/apis/uploadImage";

interface NewPostProps {
  refresh: any;
}

const NewPost = ({refresh}: NewPostProps) => {
  const [content, setContent] = React.useState("");
  const { userInfo } = useSelector((state: any) => state.auth);

  const handleSend = async () => {
    if(content == "" || content == "<p><br></p>"){
      return;
    }
    const imgList = extractImgInfo(content);
    let newContent = content.toString();
    for (let i = 0; i < imgList.length; i++) {
      const imgItem = imgList[i];
      const updatedResult = await uploadImage(imgItem.src);

      newContent = newContent.replace(
        /<img\b[^>]*>/,
        "<div><tempimg src='" +
          process.env.NEXT_PUBLIC_BACKEND_URL +
          "/uploads/" +
          updatedResult.data +
          "' alt='img' class='blog-image'></div>"
      );
    }

    newContent = newContent.replaceAll("<tempimg", "<img");

    try{
      const data = await newPost(newContent, userInfo.token);
      if(data.success){
        toast.success("Your blog posted successfully!");
        setContent("");
        refresh();
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
  };

  return (
    <div className="w-full bg-tertiary p-2 rounded-2xl flex gap-2">
      <Image
        className="rounded-full border-[1px] border-front w-[40px] h-[40px]"
        src="/img/avatar/default.png"
        alt="pfp"
        width={40}
        height={40}
      />
      <div className="flex-grow flex mt-2">
        <ReactQuillEditor content={content} setContent={setContent} />
      </div>
      <div
        className="hover:scale-95  duration-500 h-fit cursor-pointer mt-2.5"
        onClick={handleSend}
      >
        <IoSendSharp size={18} />
      </div>
    </div>
  );
};

export default NewPost;
