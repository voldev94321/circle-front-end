import axios from 'axios';

export const extractImgInfo = (htmlContent: string) => {
  const imgTags = htmlContent.match(/<img[^>]*>/g); // Find all <img> tags
  if (imgTags) {
    return imgTags.map((tag) => {
      const srcMatch = tag.match(/src="([^"]*)"/); // Extract the src attribute value
      const altMatch = tag.match(/alt="([^"]*)"/); // Extract the alt attribute value
      const styleMatch = tag.match(/style="([^"]*)"/); // Extract the alt attribute value
      return {
        src: srcMatch ? srcMatch[1] : "", // Extracted src value or empty string if not found
        alt: altMatch ? altMatch[1] : "", // Extracted alt value or empty string if not found
        style: styleMatch ? styleMatch[1] : "", // Extracted alt value or empty string if not found
      };
    });
  } else {
    return []; // Return an empty array if no <img> tags found
  }
};

export const uploadImageToPinata = async (dataURI: string) => {
  try {
    // Decode the data URI to obtain the binary image data
    const imageData = Buffer.from(dataURI.split(',')[1], 'base64');

    // Upload the image data to Pinata
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', imageData, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'pinata_api_key': 'YOUR_PINATA_API_KEY',
        'pinata_secret_api_key': 'YOUR_PINATA_SECRET_API_KEY',
      }
    });

    console.log('Image uploaded to Pinata:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading image to Pinata:', error);
    throw error;
  }
}