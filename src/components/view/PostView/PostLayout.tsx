/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getPost, getPostByLikes, getPostByReplies, getPostByUserId } from "@/apis/blog";
import CardView from "@/components/view/CardView";
import PostView from "@/components/view/PostView/PostView";
import { getTimeAgo } from "@/utils/date";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";

interface PostLayoutProps {
  forwardedRef: any;
  filter?: string;
  selectedUser?: any;
}

const pageLimit = 5;
const PostLayout = ({ forwardedRef, filter, selectedUser }: PostLayoutProps) => {
  const { ref, inView } = useInView();
  const { searchValue } = useSelector((state: any) => state.app);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state: any) => state.auth);

  const fetchData = async ({ pageParam }: { pageParam: number }) => {
    let data = { data: []};
    switch (filter) {
      case "Posts":
        data = await getPostByUserId(
          pageParam,
          pageLimit,
          searchValue,
          selectedUser._id
        );
        break;
      case "Replies":
        data = await getPostByReplies(
          pageParam,
          pageLimit,
          searchValue,
          selectedUser._id
        );
        break;
      case "Likes":
        data = await getPostByLikes(
          pageParam,
          pageLimit,
          searchValue,
          selectedUser._id
        );
        break;
      default:
        data = await getPost(pageParam, pageLimit, searchValue);
        break;
    }
    return data.data;
  };

  const {
    data: data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    fetchStatus,
  } = useInfiniteQuery({
    queryKey: ["data"],
    queryFn: fetchData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage && lastPage.length === pageLimit
          ? allPages.length * pageLimit
          : undefined;
      return nextPage;
    },
  });

  const refresh = async () => {
    setIsLoading(true);
    await refetch();
    setIsLoading(false);
  };

  React.useImperativeHandle(forwardedRef, () => ({
    refresh,
  }));

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  React.useEffect(() => {
    refresh();
  }, [searchValue, filter, selectedUser]);

  return (
    <div className="pt-12">
      {!isLoading ? (
        <CardView>
          {data?.pages?.map(
            (page, pageIndex) =>
              page &&
              page.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    {(index != 0 || (index == 0 && pageIndex != 0)) && (
                      <div className="border-t-2 border-front2 border-dotted my-8 -mx-8"></div>
                    )}
                    {item.status == "REPOSTED" &&
                      item.repostedUserInfo &&
                      item.repostedUserInfo.length > 0 && (
                        <div>
                          <div className="flex gap-4 -mx-4 -mt-4">
                            <Link href={`/profile?id=${item.repostedUserInfo[0].username}`}> <img
                              className="rounded-full border-[1px] border-front w-[30px] h-[30px] object-cover min-w-[30px]"
                              src={
                                item.repostedUserInfo[0].avatarUrl
                                  ? item.repostedUserInfo[0].avatarUrl
                                  : "/img/avatar/default.png"
                              }
                              alt="pfp"
                            /></Link>
                            <Link className="mt-1 overflow-hidden mr-12" href={`/profile?id=${item.repostedUserInfo[0].username}`}>
                              {" "}
                              {item.repostedUserInfo &&
                                item.repostedUserInfo.length > 0 &&
                                item.repostedUserInfo[0].username}
                              <span className="text-front opacity-50">
                                {" "}
                                reposted this. • {getTimeAgo(item.repostedDate)}
                              </span>{" "}
                              {item.quote != "" && (
                                <div
                                  style={{ overflowWrap: "anywhere" }}
                                  dangerouslySetInnerHTML={{
                                    __html: item.quote,
                                  }}
                                ></div>
                              )}
                            </Link>
                          </div>
                          <hr className="mt-4 opacity-10 -mx-8 mb-2" />
                        </div>
                      )}

                    {item && <PostView
                      innerRef={ref}
                      blogId={item._id}
                      commentId={item.commentId}
                      username={item.circlename}
                      profilename={item.username}
                      useravatar={
                        item.avatarUrl
                          ? item.avatarUrl
                          : "/img/avatar/default.png"
                      }
                      content={item.content}
                      commentsCount={item.commentsCount}
                      likes={item.likes}
                      dislikes={item.dislikes}
                      circles={item.circles}
                      reposts={item.reposts}
                      createdAt={item.createdAt}
                      isReposted={item.status == "REPOSTED"}
                    />}
                  </div>
                );
              })
          )}
          {(!data || !data.pages || data.pages[0].length == 0) && (
            <div>No Contents</div>
          )}
        </CardView>
      ) : (
        <div className="mt-6">
          <CircleLoader color="#8043FA" className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default PostLayout;
