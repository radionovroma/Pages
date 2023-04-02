import { FC } from "react";
import { useSelector } from "react-redux"
import { useLocation, Navigate } from "react-router-dom";
import { ROUTES } from "@router";
import { getUserAuthFlag } from "@store/user";

interface RequireAuthProps {
  isDirectOrder: boolean;
  children: JSX.Element;
}

export const RequireAuth: FC<RequireAuthProps> = ({ isDirectOrder, children }) => {
  const location = useLocation();
  const isAuth = useSelector(getUserAuthFlag);

  if (isDirectOrder && !isAuth)  return <Navigate to={ROUTES.LOGIN} state={{ from: location }}/>
  if (!isDirectOrder && isAuth) return <Navigate to={ROUTES.MAIN}/>;

  return children;
}
