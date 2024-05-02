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
import { BsImages } from "react-icons/bs";

interface NewPostProps {
  refresh: any;
}

const NewPost = ({ refresh }: NewPostProps) => {
  const [content, setContent] = React.useState("");
  const { userInfo } = useSelector((state: any) => state.auth);
  const imageListRef = React.useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    const imgList = extractImgInfo("" + imageListRef.current?.innerHTML);
    if ((content == "" || content == "<p><br></p>") && (!imgList || imgList.length == 0)) {
      return;
    }

    let newContent = content.toString();
    setContent("");

    for (let i = 0; i < imgList.length; i++) {
      const imgItem = imgList[i];
      const updatedResult = await uploadImage(imgItem.src);

      newContent += "<div><img src='" +
          updatedResult.data +
          "' alt='img' class='blog-image'></div>";
    }

    try {
      const data = await newPost(newContent, userInfo.token);
      if (data.success) {
        toast.success("Your blog posted successfully!");
        
        if(imageListRef.current){
          imageListRef.current.innerHTML = "";
        }
        refresh();
      }
    } catch (e: any) {
      if (e.code == AxiosError.ERR_BAD_REQUEST) {
        if (e.response.status == 401) {
          toast.error("Unauthorized Action!");
          return;
        }
      }
      toast.error("Unknow Error!");
    }
  };

  const addImage = (data: string) => {
    const imageTag = document.createElement("div");
    imageTag.classList.add("image-container");
    const tagId = new Date().getTime().toString();
    imageTag.setAttribute("id", tagId);
    imageTag.innerHTML = `<img src="${data}" alt="img-preview"/>`;

    const closeButton = document.createElement("button");
    closeButton.textContent = "⨉";
    closeButton.classList.add("close-button");
    closeButton.addEventListener("click", () => {
      imageListRef.current?.removeChild(imageTag);
    });
    imageTag.appendChild(closeButton);

    imageListRef.current?.appendChild(imageTag);
  };

  const handlePasteImage = async (file: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        addImage(reader.result.toString());
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: any) => {
    const fileArray = Array.from(event.target.files);
    for (let i = 0; i < fileArray.length; i++) {
      handlePasteImage(fileArray[i]);
    }
  };

  return (
    <div className="w-full bg-tertiary p-2 rounded-2xl flex gap-2">
      <img
        className="rounded-full border-[1px] border-front w-[40px] h-[40px] object-cover min-w-[40px] min-h-[40px]"
        src={userInfo.avatarUrl ? userInfo.avatarUrl : "/img/avatar/default.png"}
        alt="pfp"
      />
      <div className="flex-grow  mt-2">
        <div className=" flex">
          <ReactQuillEditor
            content={content}
            setContent={setContent}
            onPasteImage={handlePasteImage}
            showToolbar={true}
            onEnterPressed={handleSend}
          />
        </div>
        <div className="mt-2 flex flex-col gap-2" ref={imageListRef}></div>
      </div>
      <div className="hover:scale-95  duration-500 h-fit cursor-pointer mt-2.5 mr-2 relative">
        <BsImages size={18} />
        <input
          className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <div
        className="hover:scale-95  duration-500 h-fit cursor-pointer mt-2.5 mr-1"
        onClick={handleSend}
      >
        <IoSendSharp size={18} />
      </div>
    </div>
  );
};

export default NewPost;
