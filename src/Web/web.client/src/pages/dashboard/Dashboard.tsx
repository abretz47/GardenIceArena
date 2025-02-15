import { Navigate } from "react-router-dom";
import { useAuth } from "../../authentication/authContext";

const Dashboard = () => {
    const { isLoggedIn, user } = useAuth();

    if (isLoggedIn) {
        return <div>Welcome to the Dashboard {user?.userName}</div>;
    } else {
        return <Navigate to="/signin" />;
    }
};
export default Dashboard;
