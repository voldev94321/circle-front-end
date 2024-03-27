import PostView from "@/components/view/PostView/PostView";
import { setBlogModalState, setRepostModalState } from "@/store/modalSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BlogModal = () => {
  const { blogModalState } = useSelector((state: any) => state.modal);
  const { blogModalData } = useSelector((state: any) => state.modal);
  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setBlogModalState(false));
  };

  return blogModalState ? (
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
        <div className="w-full px-4">
          <PostView
            hideIcons
            blogId={blogModalData._id}
            commentId={blogModalData.commentId}
            username={blogModalData.username}
            profilename={blogModalData.username}
            useravatar="/img/avatar/default.png"
            content={blogModalData.content}
            commentsCount={blogModalData.commentsCount}
            likes={blogModalData.likes}
            dislikes={blogModalData.dislikes}
            circles={blogModalData.circles}
            reposts={blogModalData.reposts}
            createdAt={blogModalData.createdAt}
          />
        </div>
      </div>
      <div className="fixed top-2 right-2 md:hidden">⨉</div>
    </div>
  ) : (
    <></>
  );
};

export default BlogModal;
