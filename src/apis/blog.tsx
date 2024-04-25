import axios from "axios";

export const newPost = async (content: string, token: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/new",
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const getPost = async (skip: number, limit: number, searchValue: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/getPosts",
    { skip, limit, searchValue }
  );
  return data.data;
};

export const deletePost = async (token: string, blogId: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/delete",
    { blogId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const getPostByUserId = async (skip: number, limit: number, searchValue: string, userId: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/getPostsByUserId",
    { skip, limit, searchValue, userId }
  );
  return data.data;
};

export const getPostByReplies = async (skip: number, limit: number, searchValue: string, userId: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/getPostsByReplies",
    { skip, limit, searchValue, userId }
  );
  return data.data;
};

export const getPostByLikes = async (skip: number, limit: number, searchValue: string, userId: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/getPostsByLikes",
    { skip, limit, searchValue, userId }
  );
  return data.data;
};

export const likePost = async (
  blogId: string,
  commentId: string,
  like: boolean,
  token: string
) => {
  if (commentId) {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/comment/like",
      { commentId, like },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } else {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/like",
      { blogId, like },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  }
};

export const dislikePost = async (
  blogId: string,
  commentId: string,
  dislike: boolean,
  token: string
) => {
  if (commentId) {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/comment/dislike",
      { commentId, dislike },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } else {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/dislike",
      { blogId, dislike },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  }
};

export const circlePost = async (
  blogId: string,
  commentId: string,
  circle: boolean,
  token: string
) => {
  if (commentId) {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/comment/circle",
      { commentId, circle },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } else {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/circle",
      { blogId, circle },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  }
};

export const repost = async (
  blogId: string,
  token: string,
  quote: string
) => {
  console.log(blogId, quote);
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/repost",
    { blogId, quote },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const newComment = async (
  blogId: string,
  token: string,
  comment: string,
  commentId: string
) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/comment/new",
    { blogId, comment, commentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const getComments = async (blogId: string, commentId: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/blog/comment/get",
    { blogId, commentId }
  );
  return data.data;
};
