import { Navigate, Outlet } from "react-router-dom";
import { hasRole, isAuthenticated } from "../utils/auth";
import { Role } from "../redux/auth/authTypes";

interface ProtectedRouteProps {
  allowedRoles?: Role | Role[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {


  if (!isAuthenticated()) {
    return <Navigate to="/algosaathi" replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;