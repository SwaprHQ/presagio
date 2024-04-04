import { formatDistance, isPast } from "date-fns";

export const remainingTime = (date: Date): string => {
  const now: Date = new Date();

  if (isPast(date)) {
    return `Happened ${formatDistance(date, now)}`;
  } else {
    return `${formatDistance(date, now)} remaining`;
  }
};
