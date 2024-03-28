import { getComments, newComment } from "@/apis/blog";
import TransparentInput from "@/components/input/TransparentInput";
import React, { useRef } from "react";
import { IoSendSharp } from "react-icons/io5";
import PostView from "./PostView";
import ReactQuillEditor from "@/components/input/ReactQuill";

interface CommentsViewProps {
  blogId: string;
  commentId: string;
  token: string;
}

const CommentsView = ({ blogId, commentId, token }: CommentsViewProps) => {
  const [comment, setComment] = React.useState("");
  const [showCommentInput, setShowCommentInput] = React.useState(false);
  const [list, setList] = React.useState([]);
  const ref = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setList([]);
    const { data } = await getComments(blogId, commentId);
    setList(data);
  };

  const handleSend = async () => {
    const result = await newComment(blogId, token, comment, commentId);
    fetchData();
    setComment("");
    try {
      const current = ref.current;
      if (current) {
        const itemList = current.previousElementSibling;
        const itemComment = itemList?.firstElementChild;
        let itemCount = itemComment?.lastElementChild;
        if (itemCount) {
          itemCount.innerHTML = "" + (parseFloat(itemCount.innerHTML) + 1);
        }
      }
    } catch (e) {
      console.log("parsing error", e);
    }
  };

  const handleKeyDown = async () => {
    setComment("");
    handleSend();
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref}>
      {/* {showCommentInput ?  */}
      <div className="bg-front bg-opacity-10 p-2 rounded-2xl flex px-4 items-center mb-4">
        <ReactQuillEditor
          content={comment}
          setContent={setComment}
          onPasteImage={() => {}}
          showToolbar={false}
          onEnterPressed={handleKeyDown}
        />
        <div
          className="hover:scale-95  duration-500 h-fit cursor-pointer"
          onClick={handleSend}
        >
          <IoSendSharp size={16} />
        </div>
      </div>
      {/* // : <div className="hover:text-primary cursor-pointer text-front2" onClick={()=>{setShowCommentInput(true);}}>Add Comment</div>} */}
      {list.map((item: any, index) => (
        <PostView
          key={index}
          blogId={blogId}
          commentId={item._id}
          username={item.username}
          profilename={item.username}
          useravatar="/img/avatar/default.png"
          content={item.content}
          commentsCount={item.commentsCount}
          likes={item.likes}
          dislikes={item.dislikes}
          circles={item.circles}
          reposts={item.reposts}
          createdAt={item.createdAt}
          openComment
          isCommented
        />
      ))}
    </div>
  );
};

export default CommentsView;
