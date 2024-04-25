import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatDateForBackend = (date) => {
  return date ? dayjs.utc(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : dayjs.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
};

export const formatDateForUI = (date) => {
  return date ? dayjs.utc(date).format("YYYY-MM-DD") : "";
};
