export const secondsPerDay = 86400;
export const turnaroundInSeconds = 1200;

const getNumberWithOrdinal = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const getTomorrow = (currentDate = new Date()) => {
  const tomororw = new Date(currentDate);
  tomororw.setDate(currentDate.getDate() + 1);
  tomororw.setHours(0, 0, 0, 0);
  return tomororw.toISOString();
};

export const formatDate = (dateToFormat: string) => {
  const date = new Date(dateToFormat);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}${getNumberWithOrdinal(day)} ${month} ${year}`;
};
