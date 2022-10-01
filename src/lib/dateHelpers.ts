import dayjs from "dayjs";

export function today() {
  return dayjs().format("YYYY-MM-DD");
}
