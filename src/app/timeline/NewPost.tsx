/* eslint-disable @next/next/no-img-element */
import { IoSendSharp } from "react-icons/io5";
import React from "react";
import { useSelector } from "react-redux";
import ReactQuillEditor from "@/components/input/ReactQuill";
import Image from "next/image";

const NewPost = () => {
  const [contentText, setContentText] = React.useState("");
  const { userInfo } = useSelector((state: any) => state.auth);
  const [images, setImages] = React.useState<FileList | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(event.target.files);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        // Here you can perform operations with each image, such as uploading to a server
        console.log("Uploaded image:", image.name);
      }
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
      <div className="flex-grow">
        <ReactQuillEditor />
      </div>
      <div className="m-2 hover:scale-95 h-fit">
        <IoSendSharp size={20} />
      </div>
    </div>
  );
};

export default NewPost;
