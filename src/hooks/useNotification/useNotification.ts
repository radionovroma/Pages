import { useContext } from "react";
import { NotificationContext } from "@components";

export const useNotification = () => {
  return useContext(NotificationContext);
}
