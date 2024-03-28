export function numberWithCommas(x: string) {
  // Separate the integer part from the decimal part
  const parts = x.toString().split(".");
  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Join the integer and decimal parts back together
  return parts.join(".");
}
