export function getDateDetails(_date = new Date()) {
  let date: Date;
  if (typeof _date === "string") date = new Date(_date);
  else date = _date;

  return {
    date: date.getDate() || 0,
    month: date.getMonth() || 0,
    year: date.getFullYear() || 0,
  };
}
