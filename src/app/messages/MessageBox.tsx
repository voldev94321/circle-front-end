/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { uploadImage } from "@/apis/uploadImage";
import ReactQuillEditor from "@/components/input/ReactQuill";
import CardView from "@/components/view/CardView";
import { extractImgInfo } from "@/utils/html";
import React from "react";
import { BsImage, BsImages } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import NewMessage from "./NewMessage";
import { getMessages, newMessage } from "@/apis/message";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import io from "socket.io-client";
const socket = io("" + process.env.NEXT_PUBLIC_SOCKET_URL, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "circle",
  },
});
interface MessageBoxPros {
  user: any;
}
const pageLimit = 10;
var isSocketInitialized = false;
const MessageBox = ({ user }: MessageBoxPros) => {
  const { userInfo } = useSelector((state: any) => state.auth);
  const { searchValue } = useSelector((state: any) => state.app);
  const [content, setContent] = React.useState("");
  const { ref, inView } = useInView();
  const imageListRef = React.useRef<HTMLDivElement>(null);

  const fetchData = async ({ pageParam }: { pageParam: number }) => {
    let data = await getMessages(
      userInfo._id,
      user._id,
      pageParam,
      pageLimit,
      searchValue
    );

    return data.data;
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

  const handleSend = async () => {
    let newContent = content.toString();
    
    const imgList = extractImgInfo("" + imageListRef.current?.innerHTML);
    if (
      (content == "" || content == "<p><br></p>") &&
      (!imgList || imgList.length == 0)
    ) {
      return;
    }
    
    setContent("");
    if (imageListRef.current) {
      imageListRef.current.innerHTML = "";
    }

    for (let i = 0; i < imgList.length; i++) {
      const imgItem = imgList[i];
      const updatedResult = await uploadImage(imgItem.src);
      newContent +=
        "<div><img src='" +
        updatedResult.data +
        "' alt='img' class='blog-image'></div>";
    }
    try {
      const data = await newMessage(user._id, newContent, userInfo.token);
      if (data.success) {
        refetch();
      }
    } catch (e: any) {}
  };
  const handleFileChange = (event: any) => {
    const fileArray = Array.from(event.target.files);
    for (let i = 0; i < fileArray.length; i++) {
      handlePasteImage(fileArray[i]);
    }
  };

  const initSocket = () => {
    if(isSocketInitialized){
      return;
    }
    isSocketInitialized = true;
    socket.emit("connect user", { userId: userInfo._id });
    socket.on("chat message", (msg) => {
      // setMessages((prevMessages) => [...prevMessages, msg]);
      refetch();
    });
  }

  const {
    data: data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    fetchStatus,
  } = useInfiniteQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage && lastPage.length === pageLimit
          ? allPages.length * pageLimit
          : undefined;
      return nextPage;
    },
  });

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  React.useEffect(() => {
    initSocket();
  }, []);

  React.useEffect(() => {
    refetch();
  }, [user])

  return (
    <div className="bg-tertiary rounded-t-3xl min-h-full p-4 flex flex-col">
      <div className="h-full w-full rounded-t-3xl p-8 pt-8 bg-gradient-to-b from-black to-transparent flex-grow flex flex-col justify-between relative">
        <div className=" rounded-t-3xl flex flex-col gap-2 items-center bg-gradient-to-b from-black via-black to-transparent absolute w-full top-0 left-0 pt-4 z-10">
          <img
            src={user.avatarUrl ? user.avatarUrl : "/img/avatar/default.png"}
            alt="avatar"
            className="w-20 h-20 rounded-full border-front border-2 object-cover"
          />
          <div className="text-lg">{user.username}</div>
          <div>{user.circlename}</div>
        </div>
        <div className="flex-grow flex flex-col-reverse gap-2 mb-2 h-0 overflow-auto">
          {data?.pages?.map(
            (page, pageIndex) =>
              page &&
              page.map((item: any, index: number) => {
                const msgUser = item.from;
                return msgUser && (
                  <div key={index}>
                    <div ref={ref}>
                      <div
                        className={`flex gap-2 w-fit ${
                          item.from.username != userInfo.username
                            ? "flex-row "
                            : "flex-row-reverse ml-auto text-right"
                        }`}
                      >
                        <img
                          className="rounded-full border-[1px] border-front w-[30px] h-[30px] object-cover"
                          src={
                            msgUser.avatarUrl
                              ? msgUser.avatarUrl
                              : "/img/avatar/default.png"
                          }
                          alt="pfp"
                        />
                        <div className="flex-grow">
                          <div className="opacity-50">{msgUser.username}</div>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
          {(!data || !data.pages || data.pages[0].length == 0) && (
            <div>No Messages</div>
          )}
        </div>
        <div className="w-full bg-tertiary px-4 rounded-2xl flex gap-2">
          <div className="flex-grow  mt-2">
            <div className=" flex">
              <ReactQuillEditor
                content={content}
                setContent={setContent}
                onPasteImage={handlePasteImage}
                showToolbar={false}
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
      </div>
    </div>
  );
};

export default MessageBox;
