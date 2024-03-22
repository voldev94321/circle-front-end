import { getPost } from "@/apis/blog";
import CardView from "@/components/view/CardView";
import PostView from "@/components/view/PostView/PostView";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

const pageLimit = 5;
const PostLayout = () => {
  const fetchData = async ({ pageParam }: { pageParam: number }) => {
    const data = await getPost(pageParam, pageLimit);
    return data.data;
  };

  const { ref, inView } = useInView();

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

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div>
      <CardView>
        {data?.pages?.map(
          (page, pageIndex) =>
            page &&
            page.map((item: any, index: number) => {
              console.log(item);
              return (
                <div key={index}>
                  {(index != 0 || (index == 0 && pageIndex != 0)) && (
                    <div className="border-t-2 border-front2 border-dotted my-8 -mx-8"></div>
                  )}
                  {item.status == "REPOSTED" && (
                    <div>
                      <div className="flex gap-4 -mx-4 -mt-4 items-center">
                        <Image
                          className="rounded-full border-[1px] border-front w-[30px] h-[30px]"
                          src={"/img/avatar/default.png"}
                          alt="pfp"
                          width={30}
                          height={30}
                        />
                        <div>
                          {" "}
                          {item.repostedUserInfo && item.repostedUserInfo.length > 0 && item.repostedUserInfo[0].username}
                          <span className="text-front opacity-50">
                            {" "}
                            reposted this.
                          </span>{" "}
                        </div>
                      </div>
                      <hr className="mt-4 opacity-10 -mx-8 mb-2" />
                    </div>
                  )}

                  <PostView
                    innerRef={ref}
                    blogId={item._id}
                    commentId={item.commentId}
                    username={item.username}
                    profilename={item.username}
                    useravatar="/img/avatar/default.png"
                    content={item.content}
                    commentsCount={item.commentsCount}
                    likes={item.likes}
                    dislikes={item.dislikes}
                    circles={item.circles}
                    reposts={item.reposts}
                  />
                </div>
              );
            })
        )}
      </CardView>
    </div>
  );
};

export default PostLayout;
