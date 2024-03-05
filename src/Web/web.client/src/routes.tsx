import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/landing-page/LandingPage";
import SignInSide from "./pages/signin/SignInSide";
import SignUp from "./pages/signup/SignUp";
import AuthLayout from "./components/AuthLayout";
import { getUserInfo } from "./authentication/useAuthState";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing-page/LandingPage";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        loader: async () => {
            return getUserInfo();
        },
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/signin",
                element: <SignInSide />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
]);
