"use client";
import MainLayout from "@/components/navigation/MainLayout";
import NewPost from "./NewPost";
import PostLayout from "./PostLayout";

const Timeline = () => {
  return <MainLayout>
    <div>
      <NewPost/>
      <PostLayout/>
    </div>
  </MainLayout>;
};

export default Timeline;
