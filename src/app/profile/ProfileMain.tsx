'use client';
import React from "react";
import PostLayout from "@/components/view/PostView/PostLayout";
import { useSelector } from "react-redux";
import NewPost from "../timeline/NewPost";
const tabItems = ["Posts", "Replies", "Likes"];

const ProfileMain = () => {
  const [selectedTab, setSelectedTab] = React.useState(tabItems[0]);
  const postLayoutRef = React.useRef<any>(null);
  const { userInfo } = useSelector((state: any) => state.auth);

  const handleRefresh = () => {
    if(postLayoutRef && postLayoutRef.current){
      postLayoutRef.current.refresh();
    }
  }

  return (
    <div className="mt-4">
      <div className="ml-4 flex justify-between items-end">
        <div className="flex-grow leading-6" style={{overflowWrap: "anywhere"}}>
          <b>{userInfo.circlename}</b>&nbsp;&nbsp;<span className="opacity-50">@{userInfo.username}</span><br/><b>Bio: </b>{userInfo.bio}
        </div>
        <div className="flex gap-4">
          {tabItems.map((item, index) => (
            <div
              key={index}
              className={`w-48 ${
                selectedTab == item ? "bg-primary" : "bg-tertiary"
              } text-center p-2 rounded-lg cursor-pointer`}
              onClick={() => {
                setSelectedTab(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="-mt-2">
        <PostLayout forwardedRef={postLayoutRef} filter={selectedTab}/>
      </div>
    </div>
  );
};

export default ProfileMain;
