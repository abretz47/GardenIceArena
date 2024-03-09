import { Outlet, useLoaderData } from "react-router-dom";
import { AuthContextProvider } from "../authentication/authContext";
import CustomToastContainer from "./CustomToastContainer";

export default function AuthLayout() {
    const user: any = useLoaderData();

    return (
        <AuthContextProvider initialUser={user}>
            <Outlet />
            <CustomToastContainer />
        </AuthContextProvider>
    );
}
