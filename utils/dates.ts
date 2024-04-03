export const remainingTime = (date: string): string => {
  const now: Date = new Date();
  const diff: number = new Date(date).getTime() - now.getTime();
  const past: boolean = diff <= 0;

  const units = [
    { label: "year", duration: 365 * 24 * 60 * 60 * 1000 },
    { label: "month", duration: 30.44 * 24 * 60 * 60 * 1000 },
    { label: "day", duration: 24 * 60 * 60 * 1000 },
    { label: "hour", duration: 60 * 60 * 1000 },
    { label: "minute", duration: 60 * 1000 },
    { label: "second", duration: 1000 },
  ];

  for (const unit of units) {
    const count = Math.abs(Math.floor(diff / unit.duration));
    if (count >= 1) {
      if (past) {
        return `Happened ${count} ${unit.label}${count !== 1 ? "s" : ""} ago`;
      } else {
        return `${count} ${unit.label}${count !== 1 ? "s" : ""} remaining`;
      }
    }
  }

  return "Less than a second remaining";
};
