export const getDateBeforeDays = (days: number) => {
  const currentDate = new Date();
  return new Date(currentDate.setDate(currentDate.getDate() - days));
};
