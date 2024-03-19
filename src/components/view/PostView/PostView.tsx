import { circlePost, dislikePost, likePost } from "@/apis/blog";
import Image from "next/image";
import React from "react";
import { BiRepost, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { useSelector } from "react-redux";
import CommentsView from "./Comments";

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
  innerRef,
}: PostViewProps) => {
  const [isComment, setIsComment] = React.useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);
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

  const handleComment = () => {
    setIsComment(true);
  };

  const handleLike = async () => {
    likePost(blogId, commentId, !isLike, userInfo.token);
    if (isLike) {
      setLikeCounts(likeCounts - 1);
    } else {
      setLikeCounts(likeCounts + 1);
    }
    setIsLike(!isLike);
  };

  const handleDislike = async () => {
    dislikePost(blogId, commentId, !isDislike, userInfo.token);
    if (isDislike) {
      setDislikeCounts(dislikeCounts - 1);
    } else {
      setDislikeCounts(dislikeCounts + 1);
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

  return (
    <div>
      <div className="flex gap-4 my-2" ref={innerRef}>
        <Image
          className="rounded-full border-[1px] border-front w-[50px] h-[50px]"
          src={useravatar}
          alt="pfp"
          width={50}
          height={50}
        />
        <div className="flex-grow flex flex-col gap-2">
          <div className="mb-2">
            {profilename} <span className="opacity-50">{username}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <div id="item-list" className="flex gap-2">
            <div
              className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500"
              onClick={handleComment}
            >
              <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                <MdMessage size={20} />
              </div>
              <div className="text-front2">{commentsCount}</div>
            </div>
            <div
              className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500"
              onClick={handleLike}
            >
              <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                <BiSolidLike
                  size={20}
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
                  size={20}
                  className={isDislike ? "text-primary" : ""}
                />
              </div>
              <div className="text-front2">{dislikeCounts}</div>
            </div>
            {reposts && (
              <div className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500">
                <div className="bg-front bg-opacity-10 p-2 rounded-xl">
                  <BiRepost size={20} />
                </div>
                <div className="text-front2">{reposts.length}</div>
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
                  width={20}
                  height={20}
                  alt="default"
                />
              </div>
              <div className="text-front2">{circleCounts}</div>
            </div>
          </div>
          {isComment && <CommentsView blogId={blogId} commentId={commentId} token={userInfo.token}/>}
        </div>
      </div>
    </div>
  );
};

export default PostView;
