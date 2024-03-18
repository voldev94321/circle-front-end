import Image from "next/image";
import { BiRepost, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { MdMessage } from "react-icons/md";

interface PostViewProps {
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
  return (
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
        <div className="flex gap-2">
          <div className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500">
            <div className="bg-front bg-opacity-10 p-2 rounded-xl">
              <MdMessage size={20} />
            </div>
            <div className="text-front2">{commentsCount}</div>
          </div>
          <div className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500">
            <div className="bg-front bg-opacity-10 p-2 rounded-xl">
              <BiSolidLike size={20} />
            </div>
            <div className="text-front2">{likes.length}</div>
          </div>
          <div className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500">
            <div className="bg-front bg-opacity-10 p-2 rounded-xl">
              <BiSolidDislike size={20} />
            </div>
            <div className="text-front2">{dislikes.length}</div>
          </div>
          <div className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500">
            <div className="bg-front bg-opacity-10 p-2 rounded-xl">
              <BiRepost size={20} />
            </div>
            <div className="text-front2">{reposts.length}</div>
          </div>
          <div className="flex flex-col items-center opacity cursor-pointer hover:scale-95  duration-500">
            <div className="bg-front bg-opacity-10 p-2 rounded-xl">
              <Image
                src={`/img/menu/default.svg`}
                width={20}
                height={20}
                alt="default"
              />
            </div>
            <div className="text-front2">{circles.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
