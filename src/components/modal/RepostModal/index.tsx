import { repost } from "@/apis/blog";
import PrimaryButton from "@/components/button/PrimaryButton";
import { formats, modules } from "@/components/input/ReactQuill/EditorToolbar";
import TransparentInput from "@/components/input/TransparentInput";
import PostView from "@/components/view/PostView/PostView";
import { setRepostModalState } from "@/store/modalSlice";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const RepostModal = () => {
  const { repostModalState } = useSelector((state: any) => state.modal);
  const { repostModalData } = useSelector((state: any) => state.modal);
  const [quote, setQuote] = React.useState("");
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setRepostModalState(false));
    setQuote("");
  };

  const handleRepost = async () => {
    const result = await repost(repostModalData.blogId, userInfo.token, quote); 
    if(result.success){
      toast.success("Reposted Successfully!");
      onClose();
    } else {
      toast.error("Repost Failed!");
    }
  }

  return repostModalState ? (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-transparent"
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
        <div className="w-full p-2 rounded-2xl flex gap-2">
          <Image
            className="rounded-full border-[1px] border-front w-[40px] h-[40px]"
            src="/img/avatar/default.png"
            alt="pfp"
            width={40}
            height={40}
          />
          <div className="flex-grow flex items-center relative overflow-hidden">
            <div className="text-editor w-full">
              <QuillEditor
                theme="snow"
                value={quote}
                onChange={setQuote}
                placeholder={"Write your quote..."}
                modules={{ toolbar: [] }}
                formats={[]}
              />
            </div>
          </div>
        </div>
        <hr className="opacity-10 w-full -my-2" />
        <div className="w-full px-4">
          <PostView
            hideIcons
            blogId={repostModalData._id}
            commentId={repostModalData.commentId}
            username={repostModalData.username}
            profilename={repostModalData.username}
            useravatar="/img/avatar/default.png"
            content={repostModalData.content}
            commentsCount={repostModalData.commentsCount}
            likes={repostModalData.likes}
            dislikes={repostModalData.dislikes}
            circles={repostModalData.circles}
            reposts={repostModalData.reposts}
            createdAt={repostModalData.createdAt}
          />
        </div>
        <div className="w-full p-2 flex"><PrimaryButton classNames="ml-auto" onClick={handleRepost}>Repost</PrimaryButton></div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default RepostModal;
