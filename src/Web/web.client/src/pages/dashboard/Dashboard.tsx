import { useAuth } from "../../authentication/authContext";

const Dashboard = () => {
    const { user } = useAuth();

    return <div>Welcome to the Dashboard {user?.userName}</div>;
};
export default Dashboard;
