import dayjs from "dayjs";

export default (timestamp: number) => {
  const requestTime = dayjs.unix(timestamp);
  const validTime = dayjs().subtract(10, "minutes");

  console.log(validTime.unix());
  return requestTime.isAfter(validTime);
};
