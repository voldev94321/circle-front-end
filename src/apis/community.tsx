import axios from "axios";

export const newPost = async (content: string, token: string) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/community/new",
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const getPost = async ( skip: number, limit: number ) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/community/getPosts",
    { skip, limit },
  );
  return data.data;
}

export const likePost = async ( blogId: string, like: boolean, token: string ) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/community/like",
    { blogId, like },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
}

export const dislikePost = async ( blogId: string, dislike: boolean, token: string ) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/community/dislike",
    { blogId, dislike },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
}