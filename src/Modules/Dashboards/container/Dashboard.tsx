import { getUserRole } from "../../../utils/auth";
import AdminDashboard from "./AdminDashboard";
import StudentDashboard from "./StudentDashboard";
import UserDashboard from "./UserDashboard";


const Dashboard = () => {

    const userRole = getUserRole();

    console.log("User Role:", userRole);

    if (userRole === "admin") {
        return <AdminDashboard />;
    }
    if (userRole === "users") {
        return <UserDashboard />;
    }

    return <StudentDashboard />;
};


export default Dashboard;