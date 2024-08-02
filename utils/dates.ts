import {
  formatDistance,
  isPast,
  fromUnixTime,
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export const remainingTime = (date: Date): string => {
  const now: Date = new Date();

  if (isPast(date)) {
    return `Happened ${formatDistance(date, now)} ago`;
  } else {
    return `${formatDistance(date, now)} remaining`;
  }
};

export const formatDateTime = (timestamp: number, formatStr = 'HH:mm - d MMM') => {
  const date = fromUnixTime(timestamp);
  const formattedDate = format(date, formatStr);
  return formattedDate;
};

export const formatDateTimeWithYear = (timestamp: number) => {
  return formatDateTime(timestamp, 'HH:mm - d MMM - yyyy');
};

export const timeAgo = (timeStamp: number): string => {
  const now = new Date();
  const date = fromUnixTime(timeStamp);

  const diffInMinutes = differenceInMinutes(now, date);
  const diffInHours = differenceInHours(now, date);
  const diffInDays = differenceInDays(now, date);
  const diffInMonths = differenceInMonths(now, date);
  const diffInYears = differenceInYears(now, date);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else if (diffInDays < 30) {
    return `${diffInDays}d`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}mo`;
  } else {
    return `${diffInYears}y`;
  }
};
