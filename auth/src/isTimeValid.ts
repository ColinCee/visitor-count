import dayjs from "dayjs";

export default (timestamp: string) => {
  const requestTime = dayjs.unix(parseInt(timestamp, 10));
  const validTime = dayjs().subtract(10, "minutes");

  console.log(
    `Request time: ${requestTime.unix()} validTime: ${validTime.unix()}`
  );
  return requestTime.isAfter(validTime);
};
