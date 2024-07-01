export const timeIntervalToDate = (start: number, end: number = Date.now()) => {
  const diff = end - start;
  const time = new Date(0, 0, 0, 0, 0, 0, diff);
  return time;
};

export const formatMinutes = (start: number, end: number = Date.now()) => {
  const time = timeIntervalToDate(start, end);
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};
