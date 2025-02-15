import { Outlet, useLoaderData } from "react-router-dom";
import { AuthContextProvider } from "../authentication/authContext";
import CustomToastContainer from "./CustomToastContainer";

export default function AuthLayout() {
    const userInfo: any = useLoaderData();

    return (
        <AuthContextProvider initialUserInfo={userInfo}>
            <Outlet />
            <CustomToastContainer />
        </AuthContextProvider>
    );
}
