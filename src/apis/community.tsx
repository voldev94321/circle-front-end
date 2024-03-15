import axios from "axios";

export const newPost = async (content: string, token: string) => {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/community/new",
      { content },
      {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      }
    );
    return data.data;
  };