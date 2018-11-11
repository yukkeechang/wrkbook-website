export function formatSingleDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
export function formatSingleTime(date) {
  return `${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}
export function getDurationDayHour(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;

  return {
    days: Math.round(Math.abs((date2.getTime() - date1.getTime()) / oneDay)),
    hours: date2.getHours() - date1.getHours()
  };
}
