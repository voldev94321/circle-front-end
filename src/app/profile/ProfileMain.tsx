'use client';
import React from "react";
import PostLayout from "@/components/view/PostView/PostLayout";
import { useSelector } from "react-redux";
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
    <div className="mt-8">
      <div className="ml-4 flex justify-between items-center">
        <div>
          Bio: {userInfo.bio}
        </div>
        <div className="flex gap-4">
          {tabItems.map((item, index) => (
            <div
              key={index}
              className={`w-32 ${
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
        <PostLayout forwardedRef={postLayoutRef}/>
      </div>
    </div>
  );
};

export default ProfileMain;
