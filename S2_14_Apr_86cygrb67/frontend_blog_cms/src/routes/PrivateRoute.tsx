import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user?.role || ""))
    return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default PrivateRoute;
