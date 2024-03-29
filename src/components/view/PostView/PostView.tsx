/* eslint-disable react-hooks/exhaustive-deps */
import { circlePost, dislikePost, likePost, repost } from "@/apis/blog";
import Image from "next/image";
import React, { MutableRefObject } from "react";
import { BiRepost, BiSolidDislike, BiSolidLike, BiSolidPencil } from "react-icons/bi";
import { MdMessage, MdOutlineReport } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CommentsView from "./Comments";
import { toast } from "react-toastify";
import {
  setBlogModalData,
  setBlogModalState,
  setImageModalData,
  setImageModalState,
  setReportModalData,
  setReportModalState,
  setRepostModalData,
  setRepostModalState,
} from "@/store/modalSlice";
import { useRouter } from "next/navigation";
import { SlUserFollow } from "react-icons/sl";
import { getTimeAgo } from "@/utils/date";

interface PostViewProps {
  blogId: string;
  commentId: string;
  username: string;
  profilename: string;
  useravatar: string;
  content: string;
  commentsCount: number;
  likes: [string];
  dislikes: [string];
  reposts: [string];
  circles: [string];
  createdAt: string;
  hideIcons?: boolean;
  isReposted?: boolean;
  openComment?: boolean;
  isCommented?: boolean;
  innerRef?: (node?: Element | null | undefined) => void;
}

const PostView = ({
  blogId,
  commentId,
  username,
  profilename,
  useravatar,
  content,
  commentsCount,
  likes,
  dislikes,
  reposts,
  circles,
  createdAt,
  hideIcons,
  innerRef,
  isReposted,
  openComment,
  isCommented,
}: PostViewProps) => {
  const router = useRouter();
  const [isComment, setIsComment] = React.useState(openComment && commentsCount > 0);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { blogModalState, repostModalState } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const blogRef = React.useRef(null);

  const [isLike, setIsLike] = React.useState(
    likes.findIndex((value) => value == userInfo._id) != -1 ? true : false
  );
  const [likeCounts, setLikeCounts] = React.useState(0 + likes.length);

  const [isDislike, setIsDislike] = React.useState(
    dislikes.findIndex((value) => value == userInfo._id) != -1 ? true : false
  );
  const [dislikeCounts, setDislikeCounts] = React.useState(0 + dislikes.length);

  const [isCircle, setIsCircle] = React.useState(
    circles.findIndex((value) => value == userInfo._id) != -1 ? true : false
  );
  const [circleCounts, setCircleCounts] = React.useState(0 + circles.length);

  const [isRepost, setIsRepost] = React.useState(
    reposts
      ? reposts.findIndex((value) => value == userInfo._id) != -1
        ? true
        : false
      : false
  );
  const [repostCounts, setRepostCounts] = React.useState(
    0 + (reposts ? reposts.length : 0)
  );
  const [contextMenuVisible, setContextMenuVisible] = React.useState(false);
  const [isSettingMenu, setIsSettingMenu] = React.useState(false);

  const [showCommentInput, setShowCommentInput] = React.useState(false);

  const handleComment = () => {
    if(isComment){
      setShowCommentInput(false);
    }
    setIsComment(!isComment);
  };

  const handleShowCommentInput = () => {
    if(!isComment && showCommentInput){
      setIsComment(true);
    }
    setShowCommentInput(!showCommentInput);
  }

  const handleLike = async () => {
    likePost(blogId, commentId, !isLike, userInfo.token);
    if (isLike) {
      setLikeCounts(likeCounts - 1);
    } else {
      setLikeCounts(likeCounts + 1);
      if (isDislike) {
        setDislikeCounts(dislikeCounts - 1);
        setIsDislike(false);
      }
    }
    setIsLike(!isLike);
  };

  const handleDislike = async () => {
    dislikePost(blogId, commentId, !isDislike, userInfo.token);
    if (isDislike) {
      setDislikeCounts(dislikeCounts - 1);
    } else {
      setDislikeCounts(dislikeCounts + 1);
      if (isLike) {
        setLikeCounts(likeCounts - 1);
        setIsLike(false);
      }
    }
    setIsDislike(!isDislike);
  };

  const handleCircle = async () => {
    circlePost(blogId, commentId, !isCircle, userInfo.token);
    if (isCircle) {
      setCircleCounts(circleCounts - 1);
    } else {
      setCircleCounts(circleCounts + 1);
    }
    setIsCircle(!isCircle);
  };

  const handleRepost = async () => {
    if (isRepost) {
      toast.error("You've already reposted this.");
      return;
    }
    const result = await repost(blogId, userInfo.token, "");
    if (result.success) {
      toast.success("Reposted Successfully!");
      router.refresh();
    } else {
      toast.error("Repost Failed!");
    }
  };

  const handleRepostMenuSelected = async (e: any) => {
    if (isRepost) {
      toast.error("You've already reposted this.");
      return;
    }
    dispatch(setRepostModalState(true));
    dispatch(
      setRepostModalData({
        blogId,
        commentId,
        username,
        profilename,
        useravatar,
        content,
        commentsCount,
        likes,
        dislikes,
        reposts,
        circles,
        createdAt,
      })
    );
  };

  const handleFollow = async () => {

  }

  const handleReport = async () => {
    dispatch(setReportModalState(true));
    dispatch(setReportModalData({blogId, commentId}));
  }

  const handleClickPost = async (e: any) => {
   
    if(!blogModalState && !repostModalState){
      dispatch(setBlogModalState(true));
      dispatch(
        setBlogModalData({
          blogId,
          commentId,
          username,
          profilename,
          useravatar,
          content,
          commentsCount,
          likes,
          dislikes,
          reposts,
          circles,
          createdAt,
        })
      );
    }
  }

  React.useEffect(() => {
    const handleClick = (event: any) => {
      event.preventDefault();
      setContextMenuVisible(false);
      setIsSettingMenu(false);
      // Your click event handling logic here
    };

    const handleClickImage = (event: any) => {
      event.stopPropagation();
      const imageUrl = event.target.currentSrc;
      dispatch(setImageModalData(imageUrl));
      dispatch(setImageModalState(true));
    };

    // Add event listener to body
    document.body.addEventListener("mouseup", handleClick);
    let blog: any = blogRef.current;
    if (blog) {
      blog.innerHTML = content;
      const blogImages = blog.getElementsByTagName("img");
      for (let i = 0; i < blogImages.length; i++) {
        blogImages[i].addEventListener("click", handleClickImage);
      }
    }

    // Clean up function to remove event listener when component unmounts
    return () => {
      document.body.removeEventListener("click", handleClick);
      if (blog) {
        const blogImages = blog.getElementsByTagName("img");
        for (let i = 0; i < blogImages.length; i++) {
          blogImages[i].removeEventListener("click", handleClickImage);
        }
      }
    };
  }, []);

  return (
    <div className="w-full relative">
      <div className="flex gap-4" ref={innerRef}>
        <Image
          className="rounded-full border-[1px] border-front w-[50px] h-[50px]"
          src={useravatar}
          alt="pfp"
          width={50}
          height={50}
        />
        <div className="flex-grow flex flex-col gap-2">
          <div className="mb-2">
            {profilename} <span className="opacity-50">{username} • {getTimeAgo(createdAt)}</span>
          </div>
          <div
            // dangerouslySetInnerHTML={{ __html: content }}
            id="blog-view"
            ref={blogRef}
            onClick={handleComment}
            className=" cursor-pointer"
          />
          {!hideIcons && (
            <div id="item-list" className="flex gap-2">
              { !isCommented && <div
                className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500"
                onClick={handleShowCommentInput}
              >
                <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                  <MdMessage size={16} className={showCommentInput ? "text-primary" : ""}/>
                </div>
                <div className="text-front2">{commentsCount}</div>
              </div>}
              <div
                className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500"
                onClick={handleLike}
              >
                <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                  <BiSolidLike
                    size={16}
                    className={isLike ? "text-primary" : ""}
                  />
                </div>
                <div className="text-front2">{likeCounts}</div>
              </div>
              <div
                className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500"
                onClick={handleDislike}
              >
                <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                  <BiSolidDislike
                    size={16}
                    className={isDislike ? "text-primary" : ""}
                  />
                </div>
                <div className="text-front2">{dislikeCounts}</div>
              </div>
              {reposts && (
                <div
                  className="flex flex-col items-center opacity cursor-pointer duration-500 relative"
                  onClick={(e) => {
                    setContextMenuVisible(true);
                    e.preventDefault();
                  }}
                >
                  <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                    <BiRepost
                      size={16}
                      className={isRepost ? "text-primary" : ""}
                    />
                  </div>
                  <div className="text-front2">{repostCounts}</div>
                  {contextMenuVisible && (
                    <div className="absolute top-8 left-0 bg-back z-50">
                      <div
                        className="hover:bg-primary p-2 flex items-center gap-2"
                        onMouseDown={handleRepost}
                      >
                        <BiRepost size={16} />
                        Repost
                      </div>
                      <div
                        className="hover:bg-primary p-2 flex items-center gap-2"
                        onMouseDown={handleRepostMenuSelected}
                      >
                        <BiSolidPencil size={16} />
                        Quote
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div
                className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500"
                onClick={handleCircle}
              >
                <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                  <Image
                    src={
                      isCircle
                        ? `/img/icon/circle_active.svg`
                        : `/img/menu/default.svg`
                    }
                    width={16}
                    height={16}
                    alt="default"
                    className="w-[16px] h-[16px]"
                  />
                </div>
                <div className="text-front2">{circleCounts}</div>
              </div>
            </div>
          )}
          {(isComment || showCommentInput) && !isCommented  ?  (
            <CommentsView
              blogId={blogId}
              commentId={commentId}
              token={userInfo.token}
              showCommentInput={showCommentInput}
            />
          ) : <div></div>}
        </div>
      </div>
      <div
        className={`absolute ${
          isReposted ? "-top-14" : "top-0"
        } right-0 cursor-pointer`}
        onClick={() => {
          setIsSettingMenu(true);
        }}
      >
        {" "}
        . . .{" "}
      </div>
      {isSettingMenu && <div className={`absolute ${isReposted ? "-top-8" : "top-6"} right-0 bg-back z-50`}>
        <div
          className="hover:bg-primary p-2 flex items-center gap-2 cursor-pointer"
          onMouseDown={handleFollow}
        >
          <SlUserFollow size={16} />
          Follow this user
        </div>
        <div
          className="hover:bg-primary p-2 flex items-center gap-2 cursor-pointer"
          onMouseDown={handleReport}
        >
          <MdOutlineReport size={16} color="red"/>
          Report
        </div>
      </div>}
    </div>
  );
};

export default PostView;
