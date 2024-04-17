'use client';
import React from "react";
import PostLayout from "@/components/view/PostView/PostLayout";
import { useSelector } from "react-redux";
const tabItems = ["Posts", "Replies", "Likes"];

interface ProfileMainProps {
  selectedUser: any;
}

const ProfileMain = ( { selectedUser }: ProfileMainProps) => {
  const [selectedTab, setSelectedTab] = React.useState(tabItems[0]);
  const postLayoutRef = React.useRef<any>(null);

  const handleRefresh = () => {
    if(postLayoutRef && postLayoutRef.current){
      postLayoutRef.current.refresh();
    }
  }

  return (
    <div className="mt-4">
      <div className="ml-4 flex justify-between items-end">
        <div className="flex-grow leading-6" style={{overflowWrap: "anywhere"}}>
          <b>{selectedUser.circlename}</b>&nbsp;&nbsp;<span className="opacity-50">@{selectedUser.username}</span><br/><b>Bio: </b>{selectedUser.bio}
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
        <PostLayout forwardedRef={postLayoutRef} filter={selectedTab} selectedUser={selectedUser}/>
      </div>
    </div>
  );
};

export default ProfileMain;
