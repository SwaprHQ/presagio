import { formatDistance, isPast, fromUnixTime, format } from "date-fns";

export const remainingTime = (date: Date): string => {
  const now: Date = new Date();

  if (isPast(date)) {
    return `Happened ${formatDistance(date, now)} ago`;
  } else {
    return `${formatDistance(date, now)} remaining`;
  }
};

export const formatDateTime = (timestamp: number) => {
  const date = fromUnixTime(timestamp);
  const formattedDate = format(date, "d MMM- HH:mm");
  return formattedDate;
};
