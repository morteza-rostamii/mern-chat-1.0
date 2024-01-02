
export function formatDateToTime(dateString: string) {
  const date = new Date(dateString); // Create a Date object from the date string

  const hours = date.getUTCHours(); // Get the hours (in UTC)
  const minutes = date.getUTCMinutes(); // Get the minutes (in UTC)

  // Format the hour and minute values to have leading zeroes if needed
  const formattedHours = String(hours).padStart(2, '0'); // Ensure two digits for hours
  const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure two digits for minutes

  const time = `${formattedHours}:${formattedMinutes}`; // Combine hours and minutes

  return time;
  //console.log(time); // Output: "18:31" for the provided date string
}