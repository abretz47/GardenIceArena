import { useAuth } from "../authentication/authContext";
import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

export default function Home() {
    const { user, isLoggedIn, isLoading } = useAuth();
    console.log(user);
    if (isLoading && !isLoggedIn) {
        return <CircularProgress />;
    } else if (!isLoading && !isLoggedIn) {
        return <Navigate to="/signin" replace={true} />;
    } else {
        return <div>Welcome {user?.userName}</div>;
    }
}
