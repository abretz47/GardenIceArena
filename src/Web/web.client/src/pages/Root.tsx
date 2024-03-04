import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../authentication/authContext";

export default function Root() {
    return (
        <AuthContextProvider>
            <Outlet />
        </AuthContextProvider>
    );
}
