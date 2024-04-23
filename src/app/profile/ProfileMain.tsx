"use client";
import React from "react";
import PostLayout from "@/components/view/PostView/PostLayout";
import { formatDate } from "@/utils/date";
const tabItems = ["Posts", "Replies", "Likes"];

interface ProfileMainProps {
  selectedUser: any;
}

const ProfileMain = ({ selectedUser }: ProfileMainProps) => {
  const [selectedTab, setSelectedTab] = React.useState(tabItems[0]);
  const postLayoutRef = React.useRef<any>(null);

  const handleRefresh = () => {
    if (postLayoutRef && postLayoutRef.current) {
      postLayoutRef.current.refresh();
    }
  };

  return (
    <div className="mt-4">
      <div className="-mt-14 mr-4">
        <div className="flex gap-4 justify-end">
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
      <div className="mt-4 ml-4">
        <div
          className="flex-grow leading-6"
          style={{ overflowWrap: "anywhere" }}
        >
          <b>{selectedUser.circlename}</b>&nbsp;&nbsp;
          <span className="opacity-50">
            @{selectedUser.username} &nbsp;&nbsp;&nbsp;
          </span>
          <b>Joined</b>: {formatDate(selectedUser.createdAt)}
        </div>
        {selectedUser.bio && (
          <div>
            <b>Bio: </b>
            {selectedUser.bio}
          </div>
        )}
        {selectedUser.extra && selectedUser.extra.length > 0 && <div className="flex justify-start gap-4 items-center flex-grow">
          {selectedUser.extra.map((item: any, index: number) => (
            <div key={index}>
              <b>{item.label}</b>: {item.content}
            </div>
          ))}
        </div>}
      </div>
      <div className="-mt-2">
        <PostLayout
          forwardedRef={postLayoutRef}
          filter={selectedTab}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default ProfileMain;
