import dayjs from "dayjs";

export default (timestamp: number) => {
  const requestTime = dayjs.unix(timestamp);
  const validTime = dayjs().subtract(5, "minutes");

  return requestTime.isAfter(validTime);
};
