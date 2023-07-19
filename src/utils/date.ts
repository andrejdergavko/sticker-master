// Returns the date before a specified number of days
export const getDateBeforeDays = (days: number) => {
  const currentDate = new Date();
  return new Date(currentDate.setDate(currentDate.getDate() - days));
};
