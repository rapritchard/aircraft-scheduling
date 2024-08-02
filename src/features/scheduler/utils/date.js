export const getTomorrow = (currentDate = new Date()) => {
  const tomororw = new Date(currentDate);
  tomororw.setDate(currentDate.getDate() + 1);
  tomororw.setHours(0, 0, 0, 0);
  return tomororw;
};
