import moment from "moment";

export const formatDate = (date: string) => {
  const d = moment(date);
  const format = d.format("YYYY年MM月DD日");
  return format;
};
