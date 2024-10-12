type timeFormat = (duration: number) => string;
type numberFormat = (num: number) => string;
type viewsFormat = (num: number) => string;

type divisionType = { amount: number; name: Intl.RelativeTimeFormatUnit };

const formatTwoDigits: numberFormat = (num: number) => {
  const twoDigitNum = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 2,
  }).format(num);

  return twoDigitNum;
};

export const formatDuration: timeFormat = (duration: number) => {
  const hours = Math.floor(duration / 60 / 60);
  const minutes = Math.floor((duration - hours * 60 * 60) / 60);
  const seconds = duration % 60;

  if (hours > 0) return `${hours}:${minutes}: ${formatTwoDigits(seconds)}`;
  return `${minutes}: ${formatTwoDigits(seconds)}`;
};

export const formatViews: viewsFormat = (views: number) => {
  const formattedViews = new Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(views);
  return formattedViews;
};

const formatter = new Intl.RelativeTimeFormat("en-US", { numeric: "always" });

const DIVISIONS: divisionType[] = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

export const formatAgoTime = (date: Date) => {
  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};
