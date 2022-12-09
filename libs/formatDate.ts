import moment from "moment";

export const formatDate = (date: string) => {
  const d = moment(date);
  const format = d.format("YYYY-MM-DD");
  return format;
};
