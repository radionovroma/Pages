import { useContext } from "react";
import { NotificationContext } from "@hocs";

export const useNotification = () => {
  return useContext(NotificationContext);
}
