import React, { FC, createContext, ReactNode } from "react";
import { notification } from "antd";

interface NotificationProviderProps {
  children: ReactNode,
}

export const NotificationContext = createContext<any | null>(null);

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  type Notification = 'success' | 'info' | 'warning' | 'error';
  const [notificationApi, contextHolder] = notification.useNotification();
  const openNotification = (type: Notification, message: string) => {
    notificationApi[type]({
      message,
      placement: "bottomRight",
      duration: 5,
      style: {
        width: 400,
        borderRadius: 0,
      }
    });
  };

  const value = { contextHolder, openNotification }

  return <NotificationContext.Provider value={value}>
    {children}
  </NotificationContext.Provider>
}
