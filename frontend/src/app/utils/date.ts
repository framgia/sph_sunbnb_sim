import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays
} from "date-fns";

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();

  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  if (minutesDiff < 60) {
    return `${minutesDiff} minutes ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  } else if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else {
    return format(date, "MMMM dd, yyyy hh:mm a");
  }
}

export { formatTimestamp };
