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