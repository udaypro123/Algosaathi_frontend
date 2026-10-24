import { Navigate, Outlet, useLocation } from "react-router-dom";
import { hasRole, isAuthenticated } from "../utils/auth";
import { type Role } from "../redux/auth/authTypes";

interface ProtectedRouteProps {
  allowedRoles?: Role | Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;