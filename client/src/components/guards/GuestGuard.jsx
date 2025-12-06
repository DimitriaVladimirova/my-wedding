import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function RequireGuest() {
  const { isAuthenticated } = useContext(UserContext);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}