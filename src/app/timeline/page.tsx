"use client";
import MainLayout from "@/components/navigation/MainLayout";
import NewPost from "./NewPost";
import PostLayout from "@/components/view/PostView/PostLayout";
import React from "react";

const Timeline = () => {
  const postLayoutRef = React.useRef<any>(null);

  const handleRefresh = () => {
    if(postLayoutRef && postLayoutRef.current){
      postLayoutRef.current.refresh();
    }
  }

  return <MainLayout menu="Timeline">
    <div>
      <NewPost refresh={handleRefresh}/>
      <PostLayout forwardedRef={postLayoutRef}/>
    </div>
  </MainLayout>;
};

export default Timeline;
