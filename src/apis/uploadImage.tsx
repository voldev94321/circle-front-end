import axios from "axios";

export const uploadImage = async (dataURI: any) => {
  // Convert Data URL to Blob
  const response = await fetch(dataURI);
  const blob = await response.blob();

  // Create FormData object
  const formData = new FormData();
  formData.append("image", blob, "image.png"); // 'image' is the name of the field in the FormData

  const data = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
  );

  return data;
};
