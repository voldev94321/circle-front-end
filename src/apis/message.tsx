import axios from "axios";

export const newMessage = async (
  to: string,
  content: string,
  token: string
) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/message/new",
    { to, content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const getMessages = async (
  from: string,
  to: string,
  skip: number,
  limit: number,
  searchValue: string
) => {
  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/message/getMessages",
    { from, to, skip, limit, searchValue }
  );
  return data.data;
};
