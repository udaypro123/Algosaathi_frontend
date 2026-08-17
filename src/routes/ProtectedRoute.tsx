import { Navigate, Outlet } from "react-router-dom";
import { hasRole, isAuthenticated } from "../utils/auth";
import { type Role } from "../redux/auth/authTypes";

interface ProtectedRouteProps {
  allowedRoles?: Role | Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {


  if (!isAuthenticated()) {
    return <Navigate to="/algosaathi" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;