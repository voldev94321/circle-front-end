export function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const timeDifference = Date.now() - date.getTime();
  const timeDifferenceSeconds = timeDifference / 1000;

  if (timeDifferenceSeconds < 60) {
    return `${Math.floor(timeDifferenceSeconds)} secs ago`;
  } else if (timeDifferenceSeconds < 3600) {
    return `${Math.floor(timeDifferenceSeconds / 60)} mins ago`;
  } else if (timeDifferenceSeconds < 86400) {
    return `${Math.floor(timeDifferenceSeconds / 3600)} hrs ago`;
  } else if (timeDifferenceSeconds < 2592000) {
    return `${Math.floor(timeDifferenceSeconds / 86400)} days ago`;
  } else if (timeDifferenceSeconds < 31536000) {
    return `${Math.floor(timeDifferenceSeconds / 2592000)} months ago`;
  } else {
    return `${Math.floor(timeDifferenceSeconds / 31536000)} years ago`;
  }
}

export const formatDate = (dateString: string) => {
  // Create a new Date object from the dateString
  const date = new Date(dateString);

  // Use toLocaleDateString() with options to format the date
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit", // 'MM' for 2-digit month
    day: "2-digit", // 'DD' for 2-digit day
    year: "numeric", // 'YYYY' for 4-digit year
  });

  return formattedDate;
};
