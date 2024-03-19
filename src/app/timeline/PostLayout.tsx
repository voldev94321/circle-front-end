import { getPost } from "@/apis/community";
import CardView from "@/components/view/CardView";
import PostView from "@/components/view/PostView";
import { useInfiniteQuery } from "@tanstack/react-query";
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
            page.map((item: any, index: number) => (
              <div key={index}>
                { (index != 0 || index == 0 && pageIndex != 0) && <div className="border-t-2 border-front2 border-dotted my-8 -mx-8"></div>}
                <PostView
                  innerRef={ref}
                  blogId={item._id}
                  username={item.username}
                  profilename={item.username}
                  useravatar="/img/avatar/default.png"
                  content={item.content}
                  commentsCount={1}
                  likes={item.likes}
                  dislikes={item.dislikes}
                  circles={item.circles}
                  reposts={item.reposts}
                />
              </div>
            ))
        )}
      </CardView>
    </div>
  );
};

export default PostLayout;
