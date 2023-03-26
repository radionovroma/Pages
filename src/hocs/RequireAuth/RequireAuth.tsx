import { FC } from "react";
import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router-dom";
import { getUserAuthFlag } from "@store/user";

interface RequireAuthProps {
  isDirectOrder: boolean;
  children: JSX.Element;
}

export const RequireAuth: FC<RequireAuthProps> = ({ isDirectOrder, children }) => {
  const location = useLocation();
  const isAuth = useSelector(getUserAuthFlag);

  if (isDirectOrder) {
    if (!isAuth) {
      return <Navigate to="../login" state={{ from: location }}/>
    }
  } else {
    if (isAuth) {
      return <Navigate to="../"/>
    }
  }

  return children;
}
