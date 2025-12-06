import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function RequireAdmin() {
  const { isAuthenticated, isAdmin } = useContext(UserContext);
  const location = useLocation();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/design" replace state={{ from: location }} />;
  }

  return <Outlet />;
}