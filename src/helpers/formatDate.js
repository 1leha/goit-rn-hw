import { format } from "date-fns";
import { enUS, uk, ru } from "date-fns/locale";

export const formatDate = (data) => {
  return format(data, "dd LLLL, yyyy | HH:mm", { locale: ru });
};
