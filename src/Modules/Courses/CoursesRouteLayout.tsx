import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../../layOut/DashboardLayout";
import PublicHeader from "../../common/PublicHeader";
import Footer from "../../common/Footer";
import { hasRole, isAuthenticated } from "../../utils/auth";
import { Roles } from "../../redux/auth/authTypes";

const courseRoles = [Roles.USERS, Roles.ADMIN, Roles.STUDENT];

const CoursesRouteLayout = () => {
  if (!isAuthenticated()) {
    return (
      <>
        <PublicHeader />
        <Outlet />
        <Footer />
      </>
    );
  }

  if (!hasRole(courseRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <DashboardLayout />;
};

export default CoursesRouteLayout;
